const express = require('express');
const sqlite3 = require('sqlite3').verbose();
var cors = require('cors');
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  }



const app = express();
const port = 3000;
app.use(cors(corsOptions));
app.use(express.json())

// Créer une connexion à la base de données SQLite
const db = new sqlite3.Database(':memory:');

// Créer une table "products" avec des données de test
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, description TEXT, price REAL)");

  const stmt = db.prepare("INSERT INTO products (id, name, description, price) VALUES (?, ?, ?, ?)");
  stmt.run(1, "Germinal 1", "Description germinal 1", 10);
  stmt.run(2, "Germinal 2", "Description germinal 2", 20);
  stmt.run(3, "Germinal 3", "Description germinal 3", 30);
  stmt.run(4, "Germinal 4", "Description germinal 4", 40);
  stmt.run(5, "Germinal 5", "Description germinal 5", 50);
  stmt.run(6, "Germinal 6", "Description germinal 6", 60);
  stmt.run(7, "Germinal 7", "Description germinal 7", 70);
  stmt.run(8, "Germinal 8", "Description germinal 8", 80);
  stmt.run(9, "Germinal 9", "Description germinal 9", 90);
  stmt.run(10, "Germinal 10", "Description germinal 10", 100);
  stmt.run(11, "Germinal 11", "Description germinal 11", 110);
  stmt.finalize();
});

// Endpoint pour récupérer tous les produits
app.get('/products', (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
