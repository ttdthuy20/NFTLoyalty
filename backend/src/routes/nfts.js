const express = require('express');
const router = express.Router();
const db = require('../../db');

// Lấy NFT của owner
router.get('/', async (req, res) => {
  const owner = req.query.owner;
  const q = owner ? 'SELECT * FROM nfts_offchain WHERE owner_address = $1' : 'SELECT * FROM nfts_offchain ORDER BY minted_at DESC LIMIT 50';
  const params = owner ? [owner] : [];
  const r = await db.query(q, params);
  res.json(r.rows);
});

// Lưu record khi có mint (backend nhận txHash + meta)
router.post('/mint', async (req, res) => {
  const { token_id, contract_address, owner_address, uri, level } = req.body;
  const r = await db.query(
    `INSERT INTO nfts_offchain (token_id, contract_address, owner_address, uri, level) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [token_id, contract_address, owner_address, uri, level || 1]
  );
  res.json(r.rows[0]);
});

module.exports = router;
