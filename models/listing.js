const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    Image: {
        type: String,
        set: (v) => v === "" ? "https://unsplash.com/photos/sea-under-white-clouds-at-golden-hour--IMlv9Jlb24" : v,
    }, // <-- Closing bracket added here for the Image object
    price: Number,
    location: String,
    country: String,
});

const listing = mongoose.model("listing", listingSchema);
module.exports = listing; // <-- Corrected to "module.exports"
