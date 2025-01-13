// Import setup
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors());

// Set up the port for the server to listen on
const PORT = 8080; // Port explicitly set to 8080

// Start server on specified port (8080)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Root route to confirm server is running
app.get('/', (req, res) => {
  res.send('This is the root route');
});

// Connection string
const dbConnectionString = process.env.DATABASE_URL;

// Databse pool setup
export const db = new pg.Pool({
  connectionString: dbConnectionString,
});

// Read from database
app.get('/reviews', async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT * FROM reviews`);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Comment not found' });
    }
    res.json(query.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server is borked' });
  }
});

// Create new data (Insert new review entry)
app.post('/reviews', async (req, res) => {
  const { name, review_description, image_url, rating } = req.body; // Get review details from the request body

  // Insert the new review entry into the database
  const query = await db.query(
    `INSERT INTO reviews (name, review_description, image_url, rating) VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, review_description, image_url, rating]
  );
  res.status(201).json(query.rows[0]); // Return the inserted row as a response
});
