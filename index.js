import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// Creating posts for API
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content: "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry...",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content: "Artificial Intelligence (AI) is no longer a concept of the future...",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content: "Sustainability is more than just a buzzword; it's a way of life...",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastid = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Get specific post
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// Create a new post
app.post("/posts", (req, res) => {
  const newid = ++lastid;
  const post = {
    id: newid,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date().toISOString(),
  };
  posts.push(post);
  res.status(201).json(post);
});

// Update a post (PATCH)
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// Delete a post
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
