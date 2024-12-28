import   { Router,Request,Response }  from "express";
import {isAuthenticate,noCache} from '../middleware/authmiddleware'
import userAuth from "../controller/userAuth";
const userRoute:Router= Router()
const userAuthentication= new userAuth()


userRoute.get('/',noCache,userAuthentication.getLoginPage)
userRoute.get('/signup',noCache,userAuthentication.getSignUp)
userRoute.post('/signup',userAuthentication.postSignup)
userRoute.post('/login',userAuthentication.postLogin)
userRoute.get('/dashboard',noCache,isAuthenticate,userAuthentication.getDashboard)

userRoute.post('/logout',noCache,userAuthentication.logoutUser)

export default userRoute;  