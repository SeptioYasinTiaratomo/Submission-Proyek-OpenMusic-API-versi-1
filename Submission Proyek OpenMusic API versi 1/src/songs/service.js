const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const NotFoundError = require('../exceptions/NotFoundError');
const InvariantError = require('../exceptions/InvariantError');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({
    title, year, performer, genre, duration, albumId,
  }) {
    const id = `song-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO songs (id, title, year, performer, genre, duration, album_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, performer, genre, duration, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getSongs({ title, performer }) {
    // Kueri dasar
    let text = 'SELECT id, title, performer FROM songs';
    const values = [];

    // Jika ada query param title atau performer
    if (title || performer) {
      const conditions = [];
      
      if (title) {
        // Menggunakan ILIKE untuk case-insensitive search (opsional, tergantung postgres)
        // atau tetap pakai LOWER(...) LIKE ...
        conditions.push(`LOWER(title) LIKE $${values.length + 1}`);
        values.push(`%${title.toLowerCase()}%`);
      }

      if (performer) {
        conditions.push(`LOWER(performer) LIKE $${values.length + 1}`);
        values.push(`%${performer.toLowerCase()}%`);
      }

      // Gabungkan dengan WHERE
      if (conditions.length > 0) {
        text += ` WHERE ${conditions.join(' AND ')}`;
      }
    }

    const query = {
      text,
      values,
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT id, title, year, performer, genre, duration, album_id FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    // Mapping agar sesuai kriteria (album_id di database menjadi albumId di response JSON)
    // Atau bisa langsung dilakukan di query SQL menggunakan alias: album_id AS "albumId"
    // Di sini saya pakai map manual agar aman:
    const song = result.rows[0];
    return {
      ...song,
      albumId: song.album_id, // Map database column to desired output property
    };
  }

  // --- BAGIAN YANG DIPERBAIKI (EDIT) ---
  async editSongById(id, {
    title, year, performer, genre, duration, albumId,
  }) {
    const query = {
      // HAPUS "RETURNING id" di sini
      text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, album_id = $6 WHERE id = $7',
      values: [title, year, performer, genre, duration, albumId, id],
    };

    // Destructuring rowCount
    const { rowCount } = await this._pool.query(query);

    // Cek rowCount, bukan rows.length
    if (!rowCount) {
      throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
    }
  }

  // --- BAGIAN YANG DIPERBAIKI (DELETE) ---
  async deleteSongById(id) {
    const query = {
      // HAPUS "RETURNING id" di sini
      text: 'DELETE FROM songs WHERE id = $1',
      values: [id],
    };

    // Destructuring rowCount
    const { rowCount } = await this._pool.query(query);

    // Cek rowCount, bukan rows.length
    if (!rowCount) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = SongsService;