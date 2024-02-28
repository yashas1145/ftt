import express from "express";
import pg from "pg";

const db = new pg.Client({user: "postgres", host: "localhost", database: "world", password: "kjm40329", port: 5432});
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

db.connect();

app.get("/", async (req, res) => {
    const users = await db.query("SELECT * FROM users");
    const data = {"users": users.rows};
    res.render("index.ejs", data);
});

app.get("/state/user/:userId", async (req, res) => {
    const users = await db.query("SELECT * FROM users");
    const states = await db.query("SELECT * FROM userstates where userId = $1", [req.params.userId]);
    const user = await db.query("SELECT * FROM users WHERE userId = $1", [req.params.userId]);
    const data = {"states": states.rows, "userName": user.rows[0].username, "users": users.rows};
    console.log(data);
    res.render("index.ejs", data);
});

app.get("/addUser", (req, res) => {
    res.render("addUser.ejs");
});

app.get("/user/:userId/state", (req, res) => {
    const data = {"userId": req.params.userId};
    res.render("addState.ejs", data);
});

app.post("/user", async (req, res) => {
    let user = [req.body.userName, req.body.userColor];
    await db.query("INSERT INTO users (userName, userColor) VALUES ($1, $2)", user);
    res.redirect("/");
});

app.post("/state", async (req, res) => {
    let state = [req.body.stateCode, req.body.stateName, req.body.userId];
    await db.query("INSERT INTO userstates (stateCode, stateName, userId) VALUES ($1, $2, $3)", state);
    res.redirect("/state/user/" + state[2]);
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server listening on port ${port}`);
});