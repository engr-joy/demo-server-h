import express, { json } from 'express';
import cors from 'cors';
import './connection.js';
import demoRoutes from './routes/demoRoutes.js';
import jwt from 'jsonwebtoken'; // for signing and verifying
import bcrypt from 'bcrypt'; //for hashing and comparing password
import dotenv from 'dotenv'; // for environment variables

dotenv.config();

const port = 5000;
const app = express();

app.use(json());
app.use(cors());

app.use('/demoDB', demoRoutes);

const hashedPassword = bcrypt.hashSync('testpassword', 10);
const user = { id: 1, username: 'testuser', password: hashedPassword };//hardcoded user and password

const tokenStorage = new Map(); //store username and password

app.post('/login', async (req, res) => {
  //checking for correct username and password 
  const { username, password } = req.body;
  if (username !== user.username || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  console.log('Authentication successful');
  // 
  const existingToken = tokenStorage.get(username);
  if (existingToken && jwt.verify(existingToken, process.env.ACCESS_TOKEN_SECRET)) {
    return res.json({ accessToken: existingToken });
  }

  const accessToken = jwt.sign(
    { id: user.id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );

  tokenStorage.set(username, accessToken);

  res.json({ accessToken });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});