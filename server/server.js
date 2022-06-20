import express from 'express'
import cors from 'cors'
import {readdirSync} from 'fs'
import mongoose from 'mongoose';
const morgan = require("morgan");
require("dotenv").config

const app = express();
mongoose.connect("mongodb://localhost:27017/e-professorDB");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// app.use( (req,res,next)=>{
//     console.log("This is a middleware");
//     next();
// } );

readdirSync('./routes').map( (r)=>{
    app.use("/api", require(`./routes/${r}`))
});
//readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
const port =8000;

app.listen(port, ()=>{
    console.log("The server is up and runnnig");
})