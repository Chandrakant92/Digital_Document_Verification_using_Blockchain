import { MongoClient } from 'mongodb';
const uri = '';
const client = new MongoClient(uri, { useNewUrlParser: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}


  export { connectToDatabase };
