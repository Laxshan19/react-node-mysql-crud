const express=require('express');
const mysql=require("mysql2");
const cors=require('cors');
const path=require('path');

const app=express();

//Serve static files from the 'public' folder
//app.use(express.static(path.join(__dirname),"public"));
// Enable Cross-Origin Resource Sharing (CORS) to allow requests from other origins
app.use(cors());
// Parse incoming JSON data in the request body
app.use(express.json());


const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"employees",
    port:3307
})

db.connect((err)=>{
    if(err){
    console.log("Database connection failed: " + err.stack);
    return;}
    console.log("Connected ");
})

app.listen(5000,()=>{
 console.log("server running at http://localhost:5000")
})