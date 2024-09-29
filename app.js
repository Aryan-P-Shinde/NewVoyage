const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/NewVoyage";
const listing = require("./models/listing.js");
const path = require("path");
const methodOveride = require("method-override");

main().
then(()=> {
    console.log("connected to DB");
}) 
.catch((err) => {
    console.log(err);
});


async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOveride("_method"));

app.get("/", (req,res) => {
    res.send("this is root");
});

//index
app.get("/listings", async (req, res) => {
    const allListings = await listing.find({});
    res.render("listings/index.ejs", {allListings});
});

//newRoute
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
})

// showRoute 
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const Listing = await listing.findById(id);
    res.render("listings/show.ejs", {Listing});
  });

  //createRout
  app.post("/listings", async (req, res) => {
    const newListing = new listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  });

  //editRoute 
  app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const Listing = await listing.findById(id);
    res.render("listings/edit.ejs", {Listing});
  });

  //updateRoute
  app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
  });

  //Delete Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  });


  // app.get("/testListing", async (req, res) => {
//     let sampListing = new listing({
//         title: "my home",
//         description: "by the beach",
//         price: 1200,
//         location: "goa",
//         country: "india",
//     })

//     await sampListing.save();
//     console.log("sample was saved");
//     res.send("successful test");
// })

app.listen(3000, () => {
    console.log("server is listening to port 3000");
});
