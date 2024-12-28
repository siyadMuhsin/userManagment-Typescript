import {Request,Response} from 'express'
import User from '../modals/User'
import '../Types/express-session'

class userAuth{

    public getLoginPage(req:Request,res:Response):void {
        if(req.session.userId){
            res.redirect('/dashboard')
        }else{
            res.render('user/login') 
        }
    }


    public getSignUp (req:Request,res:Response){
        if(req.session.userId){
            res.redirect('/welcomePage')
        }else{
            res.render('user/signup')

        }
    }
    public async postSignup(req:Request,res:Response):Promise<any>{
        const {name ,email,password}= req.body
        try {
            const checkUser= await User.findOne({email})
        if(checkUser){  
           return res.status(201).json({success:false,message:'Email already exists. Please use a different email.'})
        }else{
            let newUser=new User({
                name:name,
                email:email,
                password:password
            })
           await newUser.save()
           return res.status(201).json({success:true,href:'/'})
        }
        } catch (error) {
            console.error('Error during signup:', error);
            res.status(500).json({   
                message: 'Internal server error. Please try again later.',
            });  
        } 
    } 
    public async postLogin(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        try {
            const existingUser = await User.findOne({ email });
    
            if (!existingUser) {
                console.log("User not found");
                res.status(404).json({ success: false, message: 'Email not found!' });
                return;
            }
    
            const isMatch = existingUser.password === password;
            if (isMatch) {
                req.session.userId = String(existingUser._id);
                console.log("User logged in:", req.session.userId);
                res.status(200).json({ success: true, href: '/dashboard' });
                return;
            } else {
                res.status(401).json({ success: false, message: 'Password does not match' });
                return;
            }
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
    }
    
    public getDashboard(req:Request,res:Response){
        if(req.session.userId){
            res.render('user/welcomePage')

        }else{
            res.redirect('/')
        }
        

    }
    public logoutUser(req: Request, res: Response): void {
        try {
            // Clear the userId from the session
            req.session.userId = null;
            
           
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error during logout:', error);
            res.status(500).send('Internal server error.');
        }
    }
}

export default userAuth