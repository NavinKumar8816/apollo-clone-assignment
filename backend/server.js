const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const doctorRoutes = require('./routes/doctorRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', doctorRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(' MongoDB Atlas Connected');
    app.listen(PORT, () =>
      console.log(` Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error('❌ MongoDB Error:', err));
