import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Paradox of Fear",
    content:
      "The only thing we have to fear is fear itself",
    author: "Franklin D. Roosevelt",
    date: "2025-09-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Rise of Remote Work and Its Effects on Productivity",
    content:
      "Remote work has shifted from being a temporary solution to a long-term reality for many organizations. With digital communication tools and cloud-based platforms, employees can collaborate effectively from anywhere in the world. This flexibility is transforming workplace culture, improving work-life balance, and challenging traditional notions of productivity. Companies that embrace remote work are finding new ways to maintain engagement, foster creativity, and attract top talent.",
    author: "Liam Carter",
    date: "2025-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Leadership and Change",
    content:
      "As Steve Jobs once said, 'Innovation distinguishes between a leader and a follower.' In today’s fast-paced world, the ability to embrace change and think creatively is what separates successful leaders from the rest. Organizations that encourage innovation, take calculated risks, and adapt to evolving markets are the ones that thrive in the long run.",
    author: "Robin Jackson",
    date: "2025-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
