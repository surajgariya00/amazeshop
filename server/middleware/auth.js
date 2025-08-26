import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next){
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({error:'Missing token'});
  try{
    const data = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.user = data;
    next();
  }catch(err){
    return res.status(401).json({error:'Invalid token'});
  }
}

export function requireAdmin(req, res, next){
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({error:'Admin only'});
  next();
}
