// Backend (Node.js) - server.js
import cors from "cors";
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());

const PORT = 5000;

// Replace the connection string with your MongoDB Atlas connection string
const uri = process.env.DB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
});

const Student = mongoose.model('Student', studentSchema);

app.use(bodyParser.json());

app.post('/students', async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const student = new Student({ name, email, password, address });
    await student.save();
    res.status(200).json(student);
    console.log('data saved in student db:', student);
  
  } catch (error) {
    console.error('Error saving student:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const student = await Student.findOne({ email, password });
      if (student) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
