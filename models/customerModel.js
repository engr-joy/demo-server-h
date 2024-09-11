import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },

    last_name:{
        type: String,
        required: true
    },

    gender:{
        type: String,
        required: true
    },

    age:{
        type:Number,
        required:true
    },

    country:{
        type:String,
        default: "Philippines"
    }
})

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
