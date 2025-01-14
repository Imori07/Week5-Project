// ! SQL DATA
// DROP TABLE reviews;

// CREATE TABLE IF NOT EXISTS reviews (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   review_description TEXT NOT NULL,
//   image_url VARCHAR(255),
//   rating INTEGER CHECK (rating >= 1 AND rating <= 5),
//   created_at TIMESTAMP DEFAULT NOW()
// )

import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const dbConnectionString = process.env.DATABASE_URL;
const db = new pg.Pool({
  connectionString: dbConnectionString,
});

// ! DUMMY DATA
db.query(`INSERT INTO reviews (name, review_description, image_url, rating)
VALUES
('Tom Jones', 'This is a bad place to stay', 'https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D', 1),
('Dave Smith', 'This country is stinks', 'https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D', 3)`);
