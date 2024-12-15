import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

export const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe sont requis' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO User (email, password_hash) VALUES (?, ?)', [email, hashedPassword]);
    res.status(201).json({ message: 'Utilisateur enregistré' });
  } catch (error) {
    res.status(500).json({ error: "Échec de l'enregistrement de l'utilisateur" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe sont requis' });
  }

  try {
    const [users] = await db.query('SELECT * FROM User WHERE email = ?', [email]);
    if (!users.length || !(await bcrypt.compare(password, users[0].password_hash))) {
      return res.status(401).json({ error: 'Email ou mot de passe invalide' });
    }
    const token = jwt.sign({ userId: users[0].user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Échec de la connexion' });
  }
};