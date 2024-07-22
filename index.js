import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

const BASE_URL = 'https://json-server-c67opnddza-el.a.run.app';

app.use(cors());

app.get('/api/categories', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching categories');
    }
});

app.get('/api/companies', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/companies`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching companies');
    }
});

app.get('/api/products', async (req, res) => {
    const { selectedCompany, selectedCategory, topN, minPrice, maxPrice } = req.query;

    let url = `${BASE_URL}/products`;

    if (selectedCompany === 'All' && selectedCategory !== 'All') {
        url = `${BASE_URL}/categories/${selectedCategory}/products?top=${topN}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    } else if (selectedCompany !== 'All' && selectedCategory === 'All') {
        url =` ${BASE_URL}/companies/${selectedCompany}/products?top=${topN}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    } else if (selectedCompany !== 'All' && selectedCategory !== 'All') {
        url = `${BASE_URL}/companies/${selectedCompany}/categories/${selectedCategory}/products?top=${topN}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    } else {
        url = `${BASE_URL}/products`;
    }

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});