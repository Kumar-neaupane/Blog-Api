import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
port = 3000;
const api_url = "http://localhost:4000";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//This is the Route to render the main page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${api_url}/posts`);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

//// Route to render the edit page

app.get("/new", (req, res) => {
  res.render("sindex.ejs", { heading: "new post", submit: "create post" });
});

app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${api_url}/posts/${req.params.id}`);
    res.render("sindex.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    res.sendStatus(500).json({ message: "Error " });
  }
});
//To create new post
app.post("/api/posts", async (res, req) => {
  try {
    const response = await axios.post(`${api_url}/posts`, req.body);
    res.redirect("/");
  } catch (error) {
    res.sendStatus(500).json({ message: "Error " });
  }
});

//To partially update a post
app.post("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.patch(
      `${api_url}/posts/${req.params.id}`,
      req.body
    );
    res.redirect("/");
  } catch (error) {
    res.sendStatus(500).json({ message: "Error " });
  }
  // Delete a post
  app.get("/api/posts/delete/:id", async (req, res) => {
    try {
      await axios.delete(`${API_URL}/posts/${req.params.id}`);
      res.redirect("/");
    } catch (error) {
      res.status(500).json({ message: "Error deleting post" });
    }
  });
});

app.listen(port, () => {
  console.log(`running in port no ${port}`);
});
