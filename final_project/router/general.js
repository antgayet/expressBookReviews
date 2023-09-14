const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  let myPromise = new Promise((resolve,reject) => {    
      resolve(books)
    });

    myPromise.then ((successMessage) => {
      return res.send(JSON.stringify(successMessage,null,4));
    })
});

public_users.get('/isbn/:isbn',function (req, res) {
    const bisbn = req.params.isbn;
    
    let myPromise = new Promise((resolve,reject) => {      
        resolve(books[bisbn])
      });
  
      myPromise.then ((successMessage) => {
        return res.send(JSON.stringify(successMessage,null,4));
      })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {  
  const autor = req.params.author;
  let myPromise = new Promise((resolve,reject) => {    
      resolve(Object.values(books).filter((book) => book.author === autor))
    });

    myPromise.then ((successMessage) => {
      return res.send(JSON.stringify(successMessage,null,4));
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const titulo = req.params.title;

    let myPromise = new Promise((resolve,reject) => {      
        resolve(Object.values(books).filter((book) => book.title === titulo))
      });
  
      myPromise.then ((successMessage) => {
        return res.send(JSON.stringify(successMessage,null,4));
      })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const bisbn = req.params.isbn;
  return res.send(books[bisbn].reviews);
});

module.exports.general = public_users;
