import { Request, Response } from "express";
import { getConnection } from "../utils/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// Recupera tutti gli appuntamenti dell'utente autenticato
 
export const getAppointmentsByUser = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const userId = user.id;

  try {
    const connection = await getConnection();
    // per ottenere gli appuntamenti dell'utente
    const [results] = await connection.execute<RowDataPacket[]>(
      "SELECT id, titolo, DATE_FORMAT(data, '%Y-%m-%d') as data, ora, note, user_id FROM appointments WHERE user_id = ? ORDER BY data, ora",
      [userId]
    );
   // Restituisci gli appuntamenti come JSON
    res.json(results);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "Errore lettura appuntamenti" });
  }
};
//nuovo appuntamento
export const addAppointment = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { titolo, data, ora, note } = req.body;
// Controllo campi obbligatori
  if (!titolo || !data || !ora) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await getConnection();
    // Inserimento appuntamento nel database
    await connection.execute<ResultSetHeader>(
      "INSERT INTO appointments (user_id, titolo, data, ora, note) VALUES (?, ?, DATE(?), ?, ?)",
      [user.id, titolo, data, ora, note || null]
    );

    res.status(201).json({ success: true, message: "Appuntamento aggiunto" });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "Errore creazione appuntamento" });
  }
};
//aggiorna 
export const updateAppointment = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const id = Number(req.params.id);
  const { titolo, data, ora, note } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Invalid appointment id" });
  }

  if (!titolo || !data || !ora) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await getConnection();
    // Aggiorna l'appuntamento solo se appartiene all'utente
    const [result] = await connection.execute<ResultSetHeader>(
      `
      UPDATE appointments
      SET titolo = ?, data = DATE(?), ora = ?, note = ?
      WHERE id = ? AND user_id = ?
      `,
      [titolo, data, ora, note || null, id, user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Appuntamento non trovato o non autorizzato",
      });
    }

    res.json({ success: true, message: "Appuntamento aggiornato" });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "Errore aggiornamento appuntamento" });
  }
};

// Elimina un appuntamento dell'utente autenticato
 
export const deleteAppointment = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Invalid appointment id" });
  }

  try {
    const connection = await getConnection();
    // Elimina l'appuntamento solo se appartiene all'utente
    const [result] = await connection.execute<ResultSetHeader>(
      "DELETE FROM appointments WHERE id = ? AND user_id = ?",
      [id, user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Appuntamento non trovato o non autorizzato" });
    }

    res.json({ success: true, message: "Appuntamento eliminato" });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "Errore eliminazione appuntamento" });
  }
};


