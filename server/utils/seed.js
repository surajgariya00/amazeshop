import { getDb } from '../db.js';
import bcrypt from 'bcryptjs';

const categories = [
  'Electronics', 'Fashion', 'Home & Kitchen', 'Sports', 'Books',
  'Toys', 'Beauty', 'Grocery', 'Automotive', 'Pets', 'Garden'
];

function slugify(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');}

function rand(min, max){return Math.floor(Math.random()*(max-min+1))+min;}

function randomImage(i){
  const pics = [
    'https://images.unsplash.com/photo-1512499617640-c2f99909879f?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515169067865-5387ec356754?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=1200&auto=format&fit=crop',
    'https://picsum.photos/seed/'+i+'/1200/800'
  ];
  return pics[i % pics.length];
}

export function seedIfEmpty() {
  const db = getDb();
  const prodCount = db.prepare('SELECT COUNT(*) as c FROM products').get().c;
  if (prodCount > 0) return;

  // Seed categories
  const insCat = db.prepare('INSERT OR IGNORE INTO categories (name, slug) VALUES (?, ?)');
  categories.forEach(c => insCat.run(c, slugify(c)));

  // Get category ids
  const cats = db.prepare('SELECT * FROM categories').all();

  // Seed products ~120
  const insProd = db.prepare('INSERT INTO products (title, description, price, image, rating, rating_count, stock) VALUES (?,?,?,?,?,?,?)');
  const insPC = db.prepare('INSERT INTO product_categories (product_id, category_id) VALUES (?,?)');

  let idx = 1;
  for (let i=0;i<120;i++) {
    const title = `Amaze Item ${i+1}`;
    const desc = `This is a great product #{${i+1}} with premium build and features. Perfect for your daily needs.`;
    const price = rand(799, 99999); // cents
    const image = randomImage(i);
    const rating = (Math.random()*1.5 + 3.5).toFixed(1);
    const ratingCount = rand(5, 1200);
    const stock = rand(0, 200);

    const info = insProd.run(title, desc, price, image, rating, ratingCount, stock);
    const pid = info.lastInsertRowid;

    // attach 1-2 categories
    const c1 = cats[rand(0, cats.length-1)].id;
    insPC.run(pid, c1);
    if (Math.random() < 0.35) {
      const c2 = cats[rand(0, cats.length-1)].id;
      if (c2 !== c1) { insPC.run(pid, c2);
    }
    }
  }

  // Seed users (including admin)

  const passAdmin = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT OR IGNORE INTO users (name,email,password_hash,role) VALUES (?,?,?,?)')
    .run('Admin User','admin@amazeshop.dev',passAdmin,'admin');

  const shoppers = [
    ['Alice Shopper','alice@example.com','alice123'],
    ['Bob Shopper','bob@example.com','bob12345'],
    ['Charlie Shopper','charlie@example.com','charlie123']
  ];
  shoppers.forEach(([n,e,p])=>{
    const h = bcrypt.hashSync(p,10);
    db.prepare('INSERT OR IGNORE INTO users (name,email,password_hash) VALUES (?,?,?)').run(n,e,h);
  });

  console.log('Seeded: categories, products (~120), users (1 admin + shoppers)');
}
