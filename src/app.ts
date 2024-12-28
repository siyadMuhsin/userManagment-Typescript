import express, { Application } from "express";
import  userRout  from "./routes/userRoutes";
import adminRout from './routes/adminRoutes'
import path from'path';
import session from "express-session";
import mongoConnect from "./confic/mongodb";
import dotenv from 'dotenv'

const app:Application = express()
dotenv.config();

app.use(session({
    secret:'siyadsm123',
    resave:false,
    saveUninitialized:true
}))


 
mongoConnect();
app.set('view engine','ejs')
app.set("views", path.join(__dirname, "..", "views"));
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

app.use('/',userRout)
app.use('/admin',adminRout)

app.use(express.static('public'))
app.listen(3000,()=>{
    console.log('http://localhost:3000/');
    
})