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

app.post('/add_user',(req,res)=>{
    const sql = "INSERT INTO employees (`name`, `email`, `age`, `gender`) VALUES (?,?,?,?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender
    ]
    db.query(sql,values,(err,result)=>{
        if(err) return res.json({message:'Something unexpexted has occured'+err})
        return res.json({success:"Employee added Successfully!"})
    })
})

app.get("/employees",(req,res)=>{
    const sql="SELECT * FROM employees";
    db.query(sql,(err,result)=>{
        if(err) res.json({message:"server Error"+err})
        return res.json(result);
    })
})

app.get("/employee/:id",(req,res)=>{
    const id = req.params.id; // Extract id from URL
    const sql="SELECT * FROM employees WHERE ID=(?)";
    db.query(sql,[id],(err,result)=>{
        if(err) res.json({message:"server Error"+err})
        return res.json(result);
    })
})

app.put("/editemployee/:id",(req,res)=>{
    const id = req.params.id; // Extract id from URL
    const sql = "UPDATE employees SET name = ?, email = ?, age = ?, gender = ? WHERE id = ?";
    const values=[
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender,
        id
    ]
    db.query(sql,values    ,(err,result)=>{
        if(err) res.json({message:"server Error"+err})
        return res.json({success:"updated successfully!"});
    })
})

app.delete("/deleteemployee/:id",(req,res)=>{
    const id = req.params.id; // Extract id from URL
    const sql='DELETE FROM employees WHERE id=?';
    db.query(sql,[id],(err,result)=>{
        if(err) res.json({message:"server Error"+err})
            return res.json({success:"deleted successfully!"})
    })
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