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
      return res.status(404).json({ message: 'No reviews found' });
    }
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server is borked' });
  }
});

// Create new data (Insert new review entry)
app.post('/reviews', async (req, res) => {
  const { name, review_description, image_url, rating } = req.body; // Get review details from the request body
  console.log(req.body);
  // console.log( name);
  // console.log(review_description);
  // console.log(image_url);
  // console.log(rating);
  // Insert the new review entry into the database
  try {
    const { rows } = await db.query(
      `INSERT INTO reviews (name, review_description, image_url, rating) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, review_description, image_url, rating]
    );

    res.status(201).json(rows[0]); // Return the inserted row
  } catch (error) {
    console.error('Error while submiiting review:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while submitting the review.' });
  }
});

app.delete('/reviews', async (req, res) => {
  const { id } = req.body;
  try {
    const result = await db.query('DELETE FROM reviews WHERE id = $1', [id]);
    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Delete request processed' });
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Error while deleting review' });
  }
});
