import { Request, Response } from "express";
import { getConnection } from "../utils/db";
import bcrypt from "bcrypt";
import { setAccessToken, deleteAccessToken, decodeAccessToken } from "../utils/auth";
import { RowDataPacket, ResultSetHeader } from "mysql2";
/**
 * Funzione  per validare il codice fiscale italiano.
 * Continene formato standard: 6 lettere, 2 numeri, 1 lettera, 2 numeri, 1 lettera, 3 numeri, 1 lettera
 */
const validateCodiceFiscale = (cf: string): boolean => {
  return /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i.test(cf);
};
/**
 * Funzione  per validare il PIN.
 * Deve essere  almeno 4 cifre numeriche
 */
const validatePin = (pin: string): boolean => {
  return pin.length >= 4 && /^\d+$/.test(pin);
};
// Registrazione nuovo utente

export const register = async (req: Request, res: Response) => {
  const { nome, cognome, data_nascita, codice_fiscale, pin } = req.body;
// Controllo che tutti i campi siano presenti
  if (!nome || !cognome || !data_nascita || !codice_fiscale || !pin) {
    return res.status(400).json({ 
      success: false, 
      error: "Tutti i campi sono obbligatori" 
    });
  }
 // Validazione codice fiscale
  if (!validateCodiceFiscale(codice_fiscale)) {
    return res.status(400).json({ 
      success: false, 
      error: "Codice fiscale non valido" 
    });
  }
 // Validazione PIN
  if (!validatePin(pin)) {
    return res.status(400).json({ 
      success: false, 
      error: "Il PIN deve essere di almeno 4 cifre numeriche" 
    });
  }

  try {
    const connection = await getConnection();
   // Controllo che il codice fiscale non sia già registrato
    const [existing] = await connection.execute<RowDataPacket[]>(
      "SELECT codice_fiscale FROM users WHERE codice_fiscale = ?",
      [codice_fiscale.toUpperCase()]
    );

    if (existing.length > 0) {
      return res.status(400).json({ 
        success: false, 
        error: "Codice fiscale già registrato" 
      });
    }
    // Hash del PIN per sicurezza
    const pinHash = await bcrypt.hash(pin, 10);
     // Inserimento utente nel database
    const [result] = await connection.execute<ResultSetHeader>(
      "INSERT INTO users (nome, cognome, data_nascita, codice_fiscale, pin) VALUES (?, ?, ?, ?, ?)",
      [nome, cognome, data_nascita, codice_fiscale.toUpperCase(), pinHash]
    );

    const newUser = {
      id: result.insertId,
      nome,
      cognome,
      codice_fiscale: codice_fiscale.toUpperCase(),
    };

    setAccessToken(req, res, newUser);

    res.json({
      success: true,
      user: newUser,
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ 
      success: false, 
      error: "Errore durante la registrazione" 
    });
  }
};
//login utente 
export const login = async (req: Request, res: Response) => {
  const { codice_fiscale, pin } = req.body;
// Controllo campi obbligatori
  if (!codice_fiscale || !pin) {
    return res.status(400).json({ 
      success: false, 
      error: "Codice fiscale e PIN obbligatori" 
    });
  }

  try {
    const connection = await getConnection();
  // Recupera utente dal database
    const [results] = await connection.execute<RowDataPacket[]>(
      "SELECT id, nome, cognome, codice_fiscale, pin FROM users WHERE codice_fiscale = ?",
      [codice_fiscale.toUpperCase()]
    );
// Se utente non trovato , credenziali non valide
    if (results.length === 0) {
      return res.status(401).json({ 
        success: false, 
        error: "Credenziali non valide" 
      });
    }

    const dbUser = results[0] as {
  id: number;
  nome: string;
  cognome: string;
  codice_fiscale: string;
  pin: string;
};
// Controllo PIN
const pinValid = await bcrypt.compare(pin, dbUser.pin);
if (!pinValid) {
  return res.status(401).json({
    success: false,
    error: "Credenziali non valide"
  });
}

// payload sicuro per JWT
const userPayload = {
  id: dbUser.id,
  nome: dbUser.nome,
  cognome: dbUser.cognome,
  codice_fiscale: dbUser.codice_fiscale
};

setAccessToken(req, res, userPayload);

res.json({
  success: true,
  user: userPayload
});


  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ 
      success: false, 
      error: "Errore durante il login" 
    });
  }
};
//logout , cancella cookie
export const logout = (req: Request, res: Response) => {
  deleteAccessToken(req, res);
  res.json({ success: true, message: "Logout effettuato" });
};
//Recupera il profilo dell’utente autenticato
export const getProfile = (req: Request, res: Response) => {
  const user = decodeAccessToken(req, res);
  
  if (!user) {
    return res.status(401).json({ error: "Non autenticato" });
  }
  
  res.json(user);
};