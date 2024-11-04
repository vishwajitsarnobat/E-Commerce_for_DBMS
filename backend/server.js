const express=require('express');
const mysql=require('mysql');
const cors=require('cors');

const app=express();
app.use(cors());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    port:"3306",
    password:"@Bcd1234!",
    database:"aayush"
})

app.get('/',(req,res)=>{
    return res.json("From  Backend Side");
})

app.get("/users",(req,res)=>{
    const sql="SELECT * FROM users";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(3000,()=>{
    console.log("Port running on 3000");
})