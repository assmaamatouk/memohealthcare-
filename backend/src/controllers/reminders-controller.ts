import { Request, Response } from "express";
import { getConnection } from "../utils/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

//Recupera tutti i promemoria dell'utente autenticato

export const getRemindersByUser = async (req: Request, res: Response) => {
  const user = (req as any).user; // ID preso dal JWT
  const userId = user.id;

  try {
    const connection = await getConnection();
    const [results] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM reminders WHERE user_id = ? ORDER BY farmaco, orario",
      [userId]
    );

    res.json(results);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "Errore lettura promemoria" });
  }
};

// Aggiunge nuovi promemoria 
 
export const addReminder = async (req: Request, res: Response) => {
  const user = (req as any).user; // ID dal JWT
  const { farmaco, frequenza, orari } = req.body;

  if (!farmaco || !frequenza || !Array.isArray(orari) || orari.length === 0) {
    return res.status(400).json({ error: "Missing or invalid fields" });
  }

  try {
    const connection = await getConnection();
    const sql = "INSERT INTO reminders (user_id, farmaco, frequenza, orario) VALUES (?, ?, ?, ?)";

    for (const orario of orari) {
      await connection.execute<ResultSetHeader>(sql, [user.id, farmaco, frequenza, orario]);
    }

    res.status(201).json({
      success: true,
      createdReminders: orari.length,
    });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "Errore inserimento promemoria" });
  }
};

// Aggiorna un promemoria 
 
export const updateReminder = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const id = Number(req.params.id);
  const { farmaco, frequenza, orario } = req.body;

  if (!id || isNaN(id) || !farmaco || !frequenza || !orario) {
    return res.status(400).json({ error: "Invalid or missing fields" });
  }

  try {
    const connection = await getConnection();
    const [result] = await connection.execute<ResultSetHeader>(
      "UPDATE reminders SET farmaco = ?, frequenza = ?, orario = ? WHERE id = ? AND user_id = ?",
      [farmaco, frequenza, orario, id, user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Promemoria non trovato o non autorizzato" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "Errore aggiornamento promemoria" });
  }
};

//Elimina un promemoria 
 
export const deleteReminder = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const id = Number(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid reminder id" });
  }

  try {
    const connection = await getConnection();
    const [result] = await connection.execute<ResultSetHeader>(
      "DELETE FROM reminders WHERE id = ? AND user_id = ?",
      [id, user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Promemoria non trovato o non autorizzato" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "Errore eliminazione promemoria" });
  }
};
