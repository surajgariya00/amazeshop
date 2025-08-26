import express from 'express';
import { getDb } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', (req,res)=>{
  const {name, email, password} = req.body;
  if (!name || !email || !password) return res.status(400).json({error:'Missing fields'});
  const db = getDb();
  const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (exists) return res.status(400).json({error:'Email already registered'});
  const hash = bcrypt.hashSync(password, 10);
  const info = db.prepare('INSERT INTO users (name,email,password_hash) VALUES (?,?,?)').run(name,email,hash);
  const user = {id: info.lastInsertRowid, name, email, role: 'user'};
  const token = jwt.sign(user, process.env.JWT_SECRET || 'devsecret', {expiresIn:'7d'});
  res.json({token, user});
});

router.post('/login', (req,res)=>{
  const {email, password} = req.body;
  if (!email || !password) return res.status(400).json({error:'Missing fields'});
  const db = getDb();
  const u = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!u) return res.status(400).json({error:'Invalid email or password'});
  const ok = bcrypt.compareSync(password, u.password_hash);
  if (!ok) return res.status(400).json({error:'Invalid email or password'});
  const user = {id: u.id, name: u.name, email: u.email, role: u.role};
  const token = jwt.sign(user, process.env.JWT_SECRET || 'devsecret', {expiresIn:'7d'});
  res.json({token, user});
});

router.get('/me', requireAuth, (req,res)=>{
  res.json({user: req.user});
});

export default router;
