import db from '../db.js';

export const createProduct = async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'Le nom et le prix sont requis' });
  }

  try {
    await db.query('INSERT INTO Product (name, price) VALUES (?, ?)', [name, price]);
    res.status(201).json({ message: 'Produit créé' });
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    res.status(500).json({ error: 'Échec de la création du produit' });
  }
};

export const getProducts = async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM Product');
    res.json(products);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({ error: 'Échec de la récupération des produits' });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  if (!id || (!name && !price)) {
    return res.status(400).json({ error: 'Données de requête invalides' });
  }

  try {
    await db.query('UPDATE Product SET name = ?, price = ? WHERE product_id = ?', [name, price, id]);
    res.json({ message: 'Produit mis à jour' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    res.status(500).json({ error: 'Échec de la mise à jour du produit' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM Product WHERE product_id = ?', [id]);
    res.json({ message: 'Produit supprimé' });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    res.status(500).json({ error: 'Échec de la suppression du produit' });
  }
};