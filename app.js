const express = require("express");

const mongoose = require("mongoose");

var bodyParser = require("body-parser");

mongoose
  .connect(
    "mongodb+srv://malrabai4:12345@cluster0.tolfy7e.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// template engine
app.set("view engine", "ejs");

const product = require("./models/product.js");
app.use(express.json());

// database create , find , find by id , delete

//create product

app.get("/", (req, res) => {
  res.render("addproduct");
});
app.post("/create", (req, res) => {
  const u = new product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
  });
  u.save()
    .then(() => {
      res.redirect("/products");
    })
    .catch((err) => console.log(err));
});

// find all products
app.get("/products", (req, res) => {
  product
    .find()
    .then((data) => {
      res.render("allproduct.ejs", { products: data });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/product/:id", (req, res) => {
  const id = req.params.id;
  product
    .find()
    .then((data) => {
      res.render("infoproduct.ejs", { product: data, id });
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(id);
});

//find by id
app.get("/getproduct/:id", (req, res) => {
  id = req.params.id;
  product
    .findById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/test", (req, res) => {
  res.render("product");
});
//delete

app.get("/delete/:id", (req, res) => {
  id = req.params.id;
  product
    .deleteOne({ _id: id })
    .then((data) => {
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
    });
});

//update
app.post("/update/:id", (req, res) => {
  const id = req.params.id;
  product
    .findByIdAndUpdate(id)
    .then((update) => {
      update.name = req.body.name;
      update.price = req.body.price;
      update.category = req.body.category;
      update.description = req.body.description;
      update
        .save()
        .then(() => {
          res.redirect("/products");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
//update
app.get("/update/:id", (req, res) => {
  id = req.params.id;
  product
    .findById(id)
    .then((data) => {
      res.render("addproduct.ejs", { product: data, id });
    })
    .catch((err) => {
      res.send(err.message);
    });
});
app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
