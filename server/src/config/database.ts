import { createClient } from '@libsql/client'
import dotenv from 'dotenv'

dotenv.config()
const db = createClient({
  url: 'libsql://helping-red-wolf-raulrangelxd.turso.io',
  authToken: process.env.DB_TOKEN,
})

export const createTables = async () => {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users(
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      username TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      password TEXT NOT NULL,
      bio TEXT,
      status TEXT,
      create_at DATE,
      update_at DATE,
      verified BOOLEAN DEFAULT FALSE
      );
    `)
  } catch (e) {
    console.log('error creating users table:', e)
  }
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS otps (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      otp TEXT NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      purpose TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
  } catch (e) {
    console.log('Error creating otps table:', e)
  }
}

export const deleteTables = async () => {
  try {
    await db.execute('DROP TABLE users;')
  } catch (e) {
    console.log('error deleting users table', e)
  }
  try {
    await db.execute('DROP TABLE otps;')
  } catch (e) {
    console.log('error deleting otps table', e)
  }
  console.log('Deleted tables')
}

export default db
