const mongoose=require("mongoose");

const initdata=require("./data.js");
const  Listing=require("../models/listing.js")


main().then(res => {
    console.log("the connection was successful")
})
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initdb=async () =>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({
        ...obj,
        owner:"6931ac9f1403698bda9f23c1",
    }))
    await Listing.insertMany(initdata.data);
    console.log("database initialized");

}

initdb();