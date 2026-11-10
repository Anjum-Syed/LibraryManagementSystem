const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

let books = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
    { id: 2, title: "Wings of Fire", author: "APJ Abdul Kalam" }
];

// Display books
app.get("/books", (req, res) => {
    res.json(books);
});

// Add book
app.post("/books", (req, res) => {
    const book = {
        id: Date.now(),
        title: req.body.title,
        author: req.body.author
    };

    books.push(book);
    res.json(book);
});

// Update book
app.put("/books/:id", (req, res) => {
    const id = Number(req.params.id);
    const book = books.find(b => b.id === id);

    if (book) {
        book.title = req.body.title;
        book.author = req.body.author;
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
});

// Delete book
app.delete("/books/:id", (req, res) => {
    const id = Number(req.params.id);
    books = books.filter(b => b.id !== id);
    res.send("Book deleted successfully");
});

// Frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.listen(5000, () => {
    console.log("Server running on port 5000");
});