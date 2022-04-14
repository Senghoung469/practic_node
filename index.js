const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const port = 3000

// create application/x-www-form-urlencoded parser create application/json parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config cors origin
const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Middleware 
const auth = require("./src/middleware/auth.middleware");

// get config
const dotenv = require('dotenv');
dotenv.config();

// Import routes 
const userRoutes = require("./src/routes/user.route");
const productRoutes = require("./src/routes/product.route");
const authRoutes = require("./src/routes/auth.route");
const serviceRoutes = require("./src/routes/service.route");

app.get('/', (req, res) => {
  res.send('Express');
})
// Auth route
app.post('/api/v1/sign', cors(corsOptions), authRoutes);
app.post('/api/v1/login', cors(corsOptions), authRoutes);

// User route
app.get('/api/v1/user', cors(corsOptions), auth, userRoutes);
app.get('/api/v1/user/:id', cors(corsOptions), auth, userRoutes);
app.post('/api/v1/user', cors(corsOptions), auth, userRoutes);
app.put('/api/v1/user/:id', cors(corsOptions), auth, userRoutes);
app.delete('/api/v1/user/:id', cors(corsOptions), auth, userRoutes);

// Product route
app.get('/api/v1/product', cors(corsOptions), auth, productRoutes);
app.get('/api/v1/product/:id', cors(corsOptions), auth, productRoutes);
app.post('/api/v1/product', cors(corsOptions), auth, productRoutes);
app.put('/api/v1/product/:id', cors(corsOptions), auth, productRoutes);
app.delete('/api/v1/product/:id', cors(corsOptions), auth, productRoutes);

// Upload file route
app.post('/api/v1/upload', multipartMiddleware, cors(corsOptions), serviceRoutes);
app.get('/api/v1/send/:file(*)', cors(corsOptions), auth, serviceRoutes);
app.delete('/api/v1/delete/file/:file', cors(corsOptions), auth, serviceRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})