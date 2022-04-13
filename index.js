const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

// create application/x-www-form-urlencoded parser create application/json parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware 
const auth = require("./src/middleware/auth.middleware");

// get config
const dotenv = require('dotenv');
dotenv.config();

// Import routes 
const userRoutes = require("./src/routes/user.route");
const productRoutes = require("./src/routes/product.route");
const authRoutes = require("./src/routes/auth.route");

app.get('/', (req, res) => {
  res.send('Express');
})
// Auth route
app.post('/api/v1/sign', authRoutes);
app.post('/api/v1/login', authRoutes);

// User route
app.get('/api/v1/user', auth, userRoutes);
app.get('/api/v1/user/:id', auth, userRoutes);
app.post('/api/v1/user', auth, userRoutes);
app.put('/api/v1/user/:id', auth, userRoutes);
app.delete('/api/v1/user/:id', auth, userRoutes);

// Product route
app.get('/api/v1/product', auth, productRoutes);
app.get('/api/v1/product/:id', auth, productRoutes);
app.post('/api/v1/product', auth, productRoutes);
app.put('/api/v1/product/:id', auth, productRoutes);
app.delete('/api/v1/product/:id', auth, productRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})