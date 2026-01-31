import { Request, Response } from "express";
import { getConnection } from "../utils/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// Recupera tutti gli esami dell'utente autenticato

export const getEsamiByUser = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const userId = user.id;

  try {
    const connection = await getConnection();
    // Seleziona tutti gli esami dell'utente ordinati per data e ora
    const [results] = await connection.execute<RowDataPacket[]>(
      "SELECT id, nome_esame, DATE_FORMAT(data, '%Y-%m-%d') as data, ora, user_id FROM esami WHERE user_id = ? ORDER BY data, ora",
      [userId]
    );

    res.json(results);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "Errore lettura esami" });
  }
};
//create nuovo esame
export const createEsame = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { nome_esame, data, ora } = req.body;
// Controllo campi obbligatori
  if (!nome_esame || !data || !ora) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const connection = await getConnection();
    await connection.execute<ResultSetHeader>(
      "INSERT INTO esami (user_id, nome_esame, data, ora) VALUES (?, ?, DATE(?), ?)",
      [user.id, nome_esame, data, ora]
    );

    res.status(201).json({ success: true, message: "Esame creato" });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "Errore creazione esame" });
  }
};
//aggiorna
export const updateEsame = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const id = Number(req.params.id);
  const { nome_esame, data, ora } = req.body;
// Controllo id e campi obbligatori
  if (!id || !nome_esame || !data || !ora) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const connection = await getConnection();
    const [result] = await connection.execute<ResultSetHeader>(
      "UPDATE esami SET nome_esame = ?, data = DATE(?), ora = ? WHERE id = ? AND user_id = ?",
      [nome_esame, data, ora, id, user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Esame non trovato o non autorizzato" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "Errore aggiornamento esame" });
  }
};

//Elimina un esame 
 
export const deleteEsame = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const connection = await getConnection();
    const [result] = await connection.execute<ResultSetHeader>(
      "DELETE FROM esami WHERE id = ? AND user_id = ?",
      [id, user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Esame non trovato o non autorizzato" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "Errore eliminazione esame" });
  }
};
