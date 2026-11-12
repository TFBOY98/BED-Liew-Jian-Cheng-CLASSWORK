require('dotenv').config();

const express = require('express');
const sql = require('mssql');
const app = express();

// 1. Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Book Category API');
});

// 2. Categories route
app.get('/categories', async (req, res) => {
    try {
        const pool = await sql.connect({
            server: 'localhost',
            port: 1433,
            database: 'NPBookstore',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            options: { trustServerCertificate: true },
        });

        const result = await pool.request()
            .query('SELECT BookCat, Description FROM BookCategory ORDER BY BookCat');

        await pool.close();

        res.json(result.recordset);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. About route
app.get('/about', (req, res) => {
    res.json({
        name: 'Book Category API',
        description: 'An API for retrieving book category information',
        version: '1.0'
    });
});

// 4. Start server
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
