import { MongoClient } from "mongodb";

async function main(){
   
 
    const uri = "mongodb+srv://demo_user:passwordtest1234@democluster.bji9w.mongodb.net/?retryWrites=true&w=majority&appName=demoCluster";


    const client = new MongoClient(uri);

    try {

        await client.connect();

        await  listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    let databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};