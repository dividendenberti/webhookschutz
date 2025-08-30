import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// statische Dateien bereitstellen
app.use(express.static("public"));

const N8N_WEBHOOK = process.env.N8N_WEBHOOK_URL;
const N8N_USER = process.env.N8N_USER;
const N8N_PASS = process.env.N8N_PASS;

app.post("/api/login", async (req, res) => {
  try {
    const userData = req.body;

    const response = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":
          "Basic " +
          Buffer.from(`${N8N_USER}:${N8N_PASS}`).toString("base64"),
      },
      body: JSON.stringify(userData),
    });

    const result = await response.text();
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
});

app.listen(3000, () =>
  console.log("Proxy + Login-HTML läuft auf Port 3000")
);
