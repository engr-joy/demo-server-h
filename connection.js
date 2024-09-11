import {connect} from 'mongoose';
let uri = "mongodb+srv://hazel:12345@cluster0.ga54s.mongodb.net/demoDB?retryWrites=true&w=majority&appName=Cluster0"


const connection = async () => {
    try{
        await connect(uri)
        console.log("Connection Successful")
    }catch(error){
        console.log(error)
    }
}

connection()