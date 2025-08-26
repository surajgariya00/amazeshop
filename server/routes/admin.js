import express from 'express';
import { getDb } from '../db.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get('/analytics', (req,res)=>{
  const db = getDb();
  const users = db.prepare('SELECT COUNT(*) as c FROM users').get().c;
  const products = db.prepare('SELECT COUNT(*) as c FROM products').get().c;
  const orders = db.prepare('SELECT COUNT(*) as c FROM orders').get().c;
  const revenue = db.prepare('SELECT IFNULL(SUM(total_cents),0) as s FROM orders').get().s;
  res.json({ users, products, orders, revenue_cents: revenue });
});

router.get('/products', (req,res)=>{
  const db = getDb();
  const items = db.prepare('SELECT * FROM products ORDER BY created_at DESC LIMIT 500').all();
  res.json(items);
});

router.post('/products', (req,res)=>{
  const db = getDb();
  const {title, description, price, image, stock=100} = req.body;
  if (!title || !description || !price) return res.status(400).json({error:'Missing fields'});
  const info = db.prepare('INSERT INTO products (title, description, price, image, stock) VALUES (?,?,?,?,?)')
    .run(title, description, parseInt(price), image||'', parseInt(stock));
  res.json({id: info.lastInsertRowid});
});

router.put('/products/:id', (req,res)=>{
  const db = getDb();
  const {title, description, price, image, stock} = req.body;
  const p = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!p) return res.status(404).json({error:'Not found'});
  db.prepare('UPDATE products SET title=?, description=?, price=?, image=?, stock=? WHERE id=?')
    .run(title||p.title, description||p.description, price||p.price, image||p.image, stock??p.stock, p.id);
  res.json({ok:true});
});

router.delete('/products/:id', (req,res)=>{
  const db = getDb();
  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  res.json({ok:true});
});

router.get('/orders', (req,res)=>{
  const db = getDb();
  const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC LIMIT 500').all();
  res.json(orders);
});

export default router;
