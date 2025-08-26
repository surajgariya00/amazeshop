import express from 'express';
import { getDb } from '../db.js';

const router = express.Router();

router.get('/categories', (req,res)=>{
  const db = getDb();
  const cats = db.prepare('SELECT id, name, slug FROM categories ORDER BY name').all();
  res.json(cats);
});

router.get('/', (req,res)=>{
  const db = getDb();
  let { page=1, pageSize=20, q='', category='', sort='relevance' } = req.query;
  page = parseInt(page); pageSize = Math.min(50, parseInt(pageSize));

  const where = []; const params = {};
  if (q) { where.push("(title LIKE @q OR description LIKE @q)"); params.q = `%${q}%`; }
  if (category) {
    where.push("id IN (SELECT product_id FROM product_categories WHERE category_id = @cid)");
    params.cid = parseInt(category);
  }

  let order = "created_at DESC";
  if (sort === 'price_asc') order = "price ASC";
  if (sort === 'price_desc') order = "price DESC";
  if (sort === 'rating') order = "rating DESC, rating_count DESC";

  const whereSql = where.length ? ('WHERE ' + where.join(' AND ')) : '';
  const total = db.prepare(`SELECT COUNT(*) as c FROM products ${whereSql}`).get(params).c;
  const items = db.prepare(`SELECT * FROM products ${whereSql} ORDER BY ${order} LIMIT @limit OFFSET @offset`)
    .all({...params, limit: pageSize, offset: (page-1)*pageSize});
  res.json({items, page, pageSize, total});
});

router.get('/:id', (req,res)=>{
  const db = getDb();
  const p = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!p) return res.status(404).json({error:'Not found'});
  // categories
  const cats = db.prepare(`SELECT c.id, c.name, c.slug
                           FROM categories c
                           JOIN product_categories pc ON pc.category_id = c.id
                           WHERE pc.product_id = ?`).all(p.id);
  // related (same category)
  const related = db.prepare(`SELECT p.* FROM products p
    WHERE p.id IN (SELECT product_id FROM product_categories WHERE category_id IN
      (SELECT category_id FROM product_categories WHERE product_id = ?))
    AND p.id <> ? ORDER BY rating DESC LIMIT 8`).all(p.id, p.id);
  res.json({...p, categories: cats, related});
});

export default router;
