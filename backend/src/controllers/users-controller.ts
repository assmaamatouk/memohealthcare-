import { Request, Response } from "express";
import { getConnection } from "../utils/db";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";


export const getUserProfile = async (req: Request, res: Response) => {
  const user = (req as any).user;// qui 'user' viene aggiunto dal middleware di auth

  try {
    const connection = await getConnection();
    const [results] = await connection.execute<RowDataPacket[]>(
      "SELECT id, nome, cognome, DATE_FORMAT(data_nascita, '%Y-%m-%d') as data_nascita, codice_fiscale FROM users WHERE id = ?",
      [user.id]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: "Utente non trovato" });
    }

    res.json(results[0]);
  } catch (error) {
    console.error("GET USER ERROR:", error);
    res.status(500).json({ error: "Errore nel caricamento profilo" });
  }
};

/**
 * Aggiorna il profilo dell'utente autenticato
 */
export const updateUserProfile = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { nome, cognome, data_nascita, codice_fiscale, pin } = req.body;

  try {
    const connection = await getConnection();

    let query = `
      UPDATE users
      SET nome = ?, cognome = ?, data_nascita = DATE(?), codice_fiscale = ?
    `;
    const params: any[] = [nome, cognome, data_nascita, codice_fiscale];

    if (pin && pin.length >= 4) {
      const pinHash = await bcrypt.hash(pin, 10);
      query += `, pin = ?`;
      params.push(pinHash);
    }

    query += ` WHERE id = ?`;
    params.push(user.id);

    await connection.execute(query, params);

    res.json({ success: true, message: "Profilo aggiornato" });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);
    res.status(500).json({ error: "Errore nel salvataggio del profilo" });
  }
};
