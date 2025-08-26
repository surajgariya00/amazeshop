import express from 'express';
import { getDb } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/checkout', requireAuth, (req,res)=>{
  const { items, address } = req.body;
  if (!Array.isArray(items) || items.length===0) return res.status(400).json({error:'Empty cart'});
  const db = getDb();

  // verify prices & stock
  let total = 0;
  const enriched = items.map(it=>{
    const p = db.prepare('SELECT id, price, stock FROM products WHERE id = ?').get(it.id);
    if (!p) throw new Error('Invalid product');
    const qty = Math.max(1, Math.min(it.quantity||1, p.stock));
    total += p.price * qty;
    return { product_id: p.id, quantity: qty, price_cents: p.price };
  });

  const info = db.prepare('INSERT INTO orders (user_id, total_cents, address, status) VALUES (?,?,?,?)')
    .run(req.user.id, total, address||'', 'processing');
  const orderId = info.lastInsertRowid;

  const ins = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price_cents) VALUES (?,?,?,?)');
  enriched.forEach(x=>ins.run(orderId, x.product_id, x.quantity, x.price_cents));

  res.json({order_id: orderId, total_cents: total, status:'processing'});
});

router.get('/', requireAuth, (req,res)=>{
  const db = getDb();
  const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);
  const itemsStmt = db.prepare('SELECT * FROM order_items WHERE order_id = ?');
  const withItems = orders.map(o=>({...o, items: itemsStmt.all(o.id)}));
  res.json(withItems);
});

export default router;
