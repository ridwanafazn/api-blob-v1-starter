const cloudinary = require('../config/cloudinary');
const pool = require('../config/db');

// A. Create signature for Cloudinary upload
const generateSignature = (req, res) => {
  try {
    const timestamp = Math.round((new Date).getTime() / 1000);
    
    // Syarat tiket: File harus dimasukkan ke folder 'asyifa_pfps'
    const paramsToSign = {
      timestamp: timestamp,
      folder: 'asyifa_pfps'
    };

    // Proses hashing tanda tangan kriptografi
    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);

    res.status(200).json({
      signature: signature,
      timestamp: timestamp,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: 'asyifa_pfps'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal membuat signature Cloudinary" });
  }
};

// B. Update
const updatePfp = async (req, res) => {
  const userId = req.params.id;
  const imageUrl = req.body.imageUrl;

  if (!imageUrl) {
    return res.status(400).json({ message: "imageUrl tidak boleh kosong!" });
  }

  try {
    const query = 'UPDATE users SET pfp_url = $1 WHERE id = $2 RETURNING id, username, pfp_url';
    const values = [imageUrl, userId];
    
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.status(200).json({
      message: "Sukses memperbarui Foto Profil!",
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error saat update PFP" });
  }
};

// C. Read
const getPfp = async (req, res) => {
  const userId = req.params.id;

  try {
    const query = 'SELECT id, username, pfp_url FROM users WHERE id = $1';
    const values = [userId];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.status(200).json({
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error saat mengambil gambar" });
  }
};

// Create
const createUser = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username tidak boleh kosong!" });
  }

  try {
    const query = 'INSERT INTO users (username) VALUES ($1) RETURNING id, username, pfp_url';
    const values = [username];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Sukses menambahkan user baru!",
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error saat menambahkan user" });
  }
};

// Read All Users
const getAllUsers = async (req, res) => {
  try {
    const query = 'SELECT id, username, pfp_url FROM users ORDER BY id ASC';
    const result = await pool.query(query);

    res.status(200).json({
      data: result.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error saat mengambil semua data user" });
  }
};

// Delete
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id, username';
    const values = [userId];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.status(200).json({
      message: "Sukses menghapus user!",
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error saat menghapus user" });
  }
};

module.exports = {
  generateSignature,
  updatePfp,
  getPfp,
  createUser,
  getAllUsers,
  deleteUser
};