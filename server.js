const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect cloud database 
connectDB();

app.get('/', (req, res) => {res.send('API Running...')});

//Define routes here
app.use('/api/test', require('./routes/api/test'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));