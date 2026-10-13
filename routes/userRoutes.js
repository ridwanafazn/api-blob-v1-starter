const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * // TO DO: Tulis Dokumentasi Swagger untuk GET /api/users
 * Petunjuk:
 * - Method: GET
 * - Summary: Ambil semua data user dari database.
 * - Responses: 200 (Berhasil mengambil data), 500 (Server Error).
 */
router.get('/users', userController.getAllUsers);

/**
 * // TO DO: Tulis Dokumentasi Swagger untuk POST /api/users
 * Petunjuk:
 * - Method: POST
 * - Summary: Tambah user baru.
 * - Request Body: Membutuhkan JSON dengan field "username".
 * - Responses: 201 (User berhasil dibuat), 400 (Username kosong).
 */
router.post('/users', userController.createUser);

/**
 * // TO DO: Tulis Dokumentasi Swagger untuk GET /api/users/{id}/pfp-signature
 * Petunjuk:
 * - Method: GET
 * - Summary: Minta tiket VIP (signature) untuk upload ke Cloudinary.
 * - Parameters: id (di dalam path URL).
 * - Responses: 200 (Signature berhasil digenerate).
 */
router.get('/users/:id/pfp-signature', userController.generateSignature);

/**
 * // TO DO: Tulis Dokumentasi Swagger untuk GET /api/users/{id}/pfp
 * Petunjuk:
 * - Method: GET
 * - Summary: Ambil data dan foto profil satu user berdasarkan ID.
 * - Parameters: id (di dalam path URL).
 * - Responses: 200 (Data ditemukan), 404 (User tidak ditemukan).
 */
router.get('/users/:id/pfp', userController.getPfp);

/**
 * // TO DO: Tulis Dokumentasi Swagger untuk PATCH /api/users/{id}/pfp
 * Petunjuk:
 * - Method: PATCH
 * - Summary: Update URL foto profil di database setelah berhasil upload ke Cloudinary.
 * - Parameters: id (di dalam path URL).
 * - Request Body: JSON berisi "imageUrl" dari balasan Cloudinary.
 * - Responses: 200 (Berhasil update), 400 (URL kosong), 404 (User tidak ditemukan).
 */
router.patch('/users/:id/pfp', userController.updatePfp);

/**
 * // TO DO: Tulis Dokumentasi Swagger untuk DELETE /api/users/{id}
 * Petunjuk:
 * - Method: DELETE
 * - Summary: Hapus data user berdasarkan ID.
 * - Parameters: id (di dalam path URL).
 * - Responses: 200 (Berhasil dihapus), 404 (User tidak ditemukan).
 */
router.delete('/users/:id', userController.deleteUser);

module.exports = router;