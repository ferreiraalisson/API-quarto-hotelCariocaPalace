import pool from '../database/db.js';

class RoomRepository {
  async getAllRooms() {
    const [rooms] = await pool.query(`
      SELECT 
        id, 
        titulo AS name, 
        descricao AS description,
        preco AS price, 
        tipo AS type, 
        capacidade AS capacity, 
        status
      FROM QUARTO
    `);
    return rooms;
  }

  async getRoomFeatures(roomId) {
    const [features] = await pool.query(`
      SELECT r.descricao AS feature
      FROM RECURSO r
      JOIN quartorecurso qr ON r.id = qr.idRecuso
      WHERE qr.idQuarto = ?
    `, [roomId]);
    return features.map(f => f.feature);
  }

  async getRoomImage(roomId) {
    const [images] = await pool.query(`
      SELECT url FROM IMAGEM
      WHERE id_quarto = ?
      LIMIT 1
    `, [roomId]);
    return images.length > 0 ? images[0].url : '';
  }

  async getRoomId(id) {
    const [rows] = await pool.query(
      `SELECT
        id, 
        titulo AS name, 
        descricao AS description,
        preco AS price, 
        tipo AS type, 
        capacidade AS capacity, 
        status
      FROM QUARTO WHERE id = ?;`,
      [id]
    );

    return rows[0] || null;
  }

  async updateRoom(id, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) throw new Error('Nada para atualizar.');

    const updates = keys.map(key => `${key} = ?`).join(', ');
    const values = Object.values(fields);

    const sql = `UPDATE QUARTO SET ${updates} WHERE id = ?`;
    const [result] = await pool.query(sql, [...values, id]);

    return result; // tem result.affectedRows
  }
  
}

export default new RoomRepository();
