const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { ref, string } = require("joi");
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    // image: {
    //     filename: { type: String},
    //     url: { type: String,
    //         default:
    //         "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // set: (v) =>
        //     v === ""
        // ?"https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        // : v,
    //      },
        
    // },
    image:{
       url: String,
       filename: String,
            },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
}
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

// further implementation -> each listing has specific category and can be associated with top icons
// category: {
//     type: String,
//     enum: ["mountains", "arctic", "farms", "deserts"]
// }