const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Import user routes

const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(bodyParser.json());
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes); // Add user routes


// MongoDB connection
const uri = "mongodb://localhost:27017/project3100";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error(err));


module.exports = app;
