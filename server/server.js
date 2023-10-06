const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

app.use(cors());
app.use(express.json());


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("server has started on port 8000")
});

// create food log entry
app.post("/diet", async (req, res) => {
    try {
        const {date, calories, carbs, protein, fat} = req.body
        const entry = await pool.query("INSERT INTO food_log (date, calories, carbs, protein, fat) VALUES ($1, $2, $3, $4, $5) RETURNING *", [date, calories, carbs, protein, fat]);
        res.json(entry.rows)
    } catch (error) {
        console.log(error.message)
    }
})

// get food log entry
app.get("/diet/:id", async (req, res) => {
    try {
        const id = req.params;
        const entry = await pool.query("SELECT * from food_log WHERE food_id = $1", [id]);
        res.json(entry.rows[0]);
    } catch (error) {
        console.log(error.message)
    }
})

// get food log entries
app.get("/diet", async (req, res) => {
    try {
        const entries = await pool.query("SELECT * from food_log");
        res.json(entries.rows);
    } catch (error) {
        console.log(error.message)
    }
})

// delete food log entry
app.delete("diet/:id", async (req, res) => {
    try {
        const { id } = req.params
        const entry = await pool.query("DELETE FROM food_log WHERE food_id = $1", [id]);
        res.json("Food was deleted!");
    } catch (error) {
        console.log(error.message)
    }
})

// edit food log entry
app.put("diet/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { date, calories, carbs, protein, fat } = req.body
        const entry = await pool.query("UPDATE food_log SET (date, calories, carbs, protein, fat) VALUES ($1, $2, $3, $4, $5) WHERE food_id = $6", [date, calories, carbs, protein, fat, id])
    } catch (error) {
        console.log(error.message)
    }
})

// create exercise log entry
app.post("/exercise", async (req, res) => {
    try {
        const {date, calories, focus} = req.body
        const entry = await pool.query("INSERT INTO exercise_log (date, calories, focus) VALUES ($1, $2, $3) RETURNING *", [date, calories, focus]);
        res.json(entry.rows)
    } catch (error) {
        console.log(error.message)
    }
})

// get exercise log entry
app.get("/exercise/:id", async (req, res) => {
    try {
        const id = req.params;
        const entry = await pool.query("SELECT * from exercise_log WHERE exercise_id = $1", [id]);
        res.json(entry.rows[0]);
    } catch (error) {
        console.log(error.message)
    }
})

// get exercise log entries
app.get("/exercise", async (req, res) => {
    try {
        const entries = await pool.query("SELECT * from exercise_log");
        res.json(entries.rows);
    } catch (error) {
        console.log(error.message)
    }
})

// delete exercise log entry
app.delete("/exercise/:id", async (req, res) => {
    try {
        const { id } = req.params
        const entry = await pool.query("DELETE FROM exercise_log WHERE exercise_id = $1", [id]);
        res.json("Exercise was deleted!");
    } catch (error) {
        console.log(error.message)
    }
})

// edit exercise log entry
app.put("/exercise/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { date, calories, focus } = req.body
        const entry = await pool.query("UPDATE food_log SET (date, calories, focus) VALUES ($1, $2, $3) WHERE food_id = $4", [date, calories, focus, id])
    } catch (error) {
        console.log(error.message)
    }
})

//Extended functionalities: save exercises and foods, graph metrics


