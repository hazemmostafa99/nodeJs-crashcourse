const express = require("express");
const mongoose = require("mongoose");

const app = express();

const Article = require("./models/Article");

mongoose
  .connect(
    "mongodb+srv://hazemmostafa:hazemmostafa@myfirstproject.p7pawuv.mongodb.net/?retryWrites=true&w=majority&appName=myfirstproject"
  )
  .then(() => console.log("Connected Successfully"))
  .catch(() => console.log("Connection faild"));

// mongodb+srv://<username>:<password>@myfirstproject.hoylqrq.mongodb.net/?retryWrites=true&w=majority&appName=myFirstProject

// TO ACCESS BODY PRAMMS
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/zamalek", (req, res) => {
  res.send("Zamalek");
});

app.get("/ahly", (req, res) => {
  res.send("Ahly");
});

app.post("/esmaily", (req, res) => {
  res.send("Esmaily");
});

app.get("/summtion/:num1/:num2", (req, res) => {
  console.log(req.params);
  res.send("Summtion is " + (+req.params.num1 + +req.params.num2));
});

app.get("/bodyPrams", (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  res.send(`My Name is ${name}`);
});

app.get("/queryPrams", (req, res) => {
  console.log(req.query.age);
  const { age } = req.query;
  res.send(`My Age is ${age}`);
});

app.get("/json/:address", (req, res) => {
  const { name } = req.body;
  const { age } = req.query;
  const { address } = req.params;
  res.json({
    age: age,
    name: name,
    address: address,
  });
});

app.post("/article", async (req, res) => {
  const newArticle = new Article();
  newArticle.title = req.body.title;
  newArticle.body = req.body.body;
  newArticle.date = req.body.date;
  newArticle.numberOfLikes = req.body.numberOfLikes;
  await newArticle.save();
  res.json(newArticle);
});

app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

app.get("/articles/:id", async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);
  res.json(article);
});

app.delete("/articles/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const article = await Article.findByIdAndDelete(id);
    res.json(article);
  } catch (error) {
    console.log(error);
  }
});

app.patch("/articles/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const article = await Article.findByIdAndUpdate(id);
    article.title = req.body.title;
    article.body = req.body.body;
    article.date = req.body.date;
    article.numberOfLikes = req.body.numberOfLikes;
    await article.save();
    res.json(article);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.get("/showArticles", async (req, res) => {
  const articles = await Article.find();
  res.render("Article.ejs", { articles: articles });
});

app.listen(3000, () => {
  console.log("Listen in 3000");
});
