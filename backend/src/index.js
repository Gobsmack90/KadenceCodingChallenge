import express from "express";
import cors from "cors";
import "dotenv/config";
import sql from "./database.js";

const app = express();

//this allows us to receive any json file from a client
app.use(express.json());
app.use(cors());

app.use(express.static("build"));

app.get("/items", async (req, res) => {
  try {
    const items = await sql`
      SELECT * FROM items
    `;
    return res.json(items);
  } catch (err) {
    return res.json(err);
  }
});

app.post("/items", async (req, res) => {
  try {
    const items = await sql`
      INSERT INTO items
        (title, description, is_complete)
      VALUES
        (${req.body.title}, ${req.body.description}, ${req.body.isComplete})
      returning *
    `;
    return res.json(items[0]);
  } catch (err) {
    return res.json(err);
  }
});

app.delete("/items/:id", async (req, res) => {
  try {
    await sql`
      DELETE FROM items WHERE id = ${req.params.id}
    `;
    return res.json("Item has been deleted.");
  } catch (err) {
    return res.json(err);
  }
});

app.put("/items/:id", async (req, res) => {
  try {
    const items = await sql`
      UPDATE items SET 
        title = ${req.body.title},
        description = ${req.body.description},
        is_complete = ${req.body.isComplete}
      WHERE
        id = ${req.params.id}
      returning *
    `;
    return res.json(items[0]);
  } catch (err) {
    return res.json(err);
  }
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
