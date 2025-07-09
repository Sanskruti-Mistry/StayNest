const mongoose = require('mongoose');
const reviews = require('./review');
const Schema = mongoose.Schema; //store the schema inside the Schema variable so that we dont have to write the mongoose.Schema again and again
const Review = require("./review.js");

const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type:Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
    }

});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing){
        await Review.deleteMany({_id: { $in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;




// filename: {
//             type: String,
//             default: "default"
//         },
//         url: {
//         type: String,
//         default: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         },



// image:{
//         filename: String,
//         url: String,
//         // type: String,
//         // default:
//         //     "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         // set: (v) => v === "" 
//         //         ? "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         //         : v,
//     },