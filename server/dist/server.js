import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { createTables } from './config/database.js';
import { authRouter } from './routes/auth.js';
import { usersRouter } from './routes/users.js';
import { otpsRouter } from './routes/otp.js';
import { companiesRouter } from './routes/companies.js';
import { productsRouter } from './routes/products.js';
import { categoriesRouter } from './routes/categories.js';
import { productCategoriesRouter } from './routes/productCategories.js';
import { productPricesRouter } from './routes/productPrices.js';
import { searchRouter } from './routes/search.js';
import { facturesRouter } from './routes/factures.js';
import { factureProductsRouter } from './routes/factureProducts.js';
dotenv.config();
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: [`https://price-wise-client.vercel.app`, `price-wise-server.vercel.app`, `http://localhost:${process.env.PORT}`, `http://localhost:3000`],
    credentials: true,
}));
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/otps', otpsRouter);
app.use('/companies', companiesRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/productcategories', productCategoriesRouter);
app.use('/productprices', productPricesRouter);
app.use('/search', searchRouter);
app.use('/factures', facturesRouter);
app.use('/factureProducts', factureProductsRouter);
// deleteTables()
createTables();
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server listening on PORT: http://localhost:${port}`);
});
