import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
dotenv.config();
const db = createClient({
    url: 'libsql://helping-red-wolf-raulrangelxd.turso.io',
    authToken: process.env.DB_TOKEN,
});
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
    `);
    }
    catch (e) {
        console.log('error creating users table:', e);
    }
    try {
        await db.execute(`
      CREATE TABLE IF NOT EXISTS otps (
      id INTEGER PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      otp TEXT NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      purpose TEXT NOT NULL,
      create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    }
    catch (e) {
        console.log('Error creating otps table:', e);
    }
    try {
        await db.execute(`
      CREATE TABLE IF NOT EXISTS companies (
      id INTEGER PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      rif TEXT,
      phone TEXT,
      address TEXT,
      create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    }
    catch (e) {
        console.log('Error creating companies table:', e);
    }
    try {
        await db.execute(`
      CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      company_id TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      description TEXT,
      price INT NOT NULL,
      weight INTEGER NOT NULL,
      weight_unit TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    }
    catch (e) {
        console.log('Error creating products table:', e);
    }
    try {
        await db.execute(`
      CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name TEXT NOT NULL UNIQUE
      );
    `);
    }
    catch (e) {
        console.log('Error creating categories table:', e);
    }
    try {
        await db.execute(`
      CREATE TABLE IF NOT EXISTS product_categories (
      product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
      PRIMARY KEY (product_id, category_id)
      );
    `);
    }
    catch (e) {
        console.log('Error creating product_categories table:', e);
    }
};
export const deleteTables = async () => {
    // try {
    //   await db.execute('DROP TABLE users;')
    // } catch (e) {
    //   console.log('error deleting users table', e)
    // }
    // try {
    //   await db.execute('DROP TABLE otps;')
    // } catch (e) {
    //   console.log('error deleting otps table', e)
    // }
    // try {
    //   await db.execute('DROP TABLE companies;')
    // } catch (e) {
    //   console.log('error deleting companies table', e)
    // }
    try {
        await db.execute('DROP TABLE products;');
    }
    catch (e) {
        console.log('error deleting products table', e);
    }
    try {
        await db.execute('DROP TABLE categories;');
    }
    catch (e) {
        console.log('error deleting categories table', e);
    }
    try {
        await db.execute('DROP TABLE product_categories;');
    }
    catch (e) {
        console.log('error deleting product_categories table', e);
    }
    console.log('Deleted tables');
};
export default db;
