import {Request,Response} from 'express'
import User from '../modals/User'
class adminAuth{
    public getlogin(req: Request, res: Response): void {
        try {
            if(req.session.adminId && req.session){
                res.redirect('admin/dashboard')
            }
            res.render('admin/login');  // Render the admin login page
        } catch (error) {
            console.error("Error rendering admin login page:", error);
            res.status(500).send("An error occurred while loading the login page.");
        }
    }
    public postLogin(req: Request, res: Response):void {
        try {
            console.log(req.body);
    
            const { email, password } = req.body;
            const adEmail = process.env.ADMIN_EMAIL;
            const adPass = process.env.ADMIN_PASS;
    
            console.log("env",adEmail);
            
            // Check if the provided email and password match the admin credentials
            if (email === adEmail && password === adPass) {
                req.session.adminId = adEmail; // Store admin ID in session
    
                // Send a success response with a redirect URL
                 res.status(200).json({
                    success: true,
                    href: '/admin/dashboard',
                    message: 'Login successful!',
                });
            }else{
                   // Send an error response for invalid credentials
           res.status(401).json({
            success: false,
            message: 'Invalid email or password. Please try again.',
        });

            }
    
         
        } catch (error) {
            console.error('Error during login:', error);
    
            // Send an internal server error response
             res.status(500).json({
                success: false,
                message: 'Internal Server Error. Please try again later.',
            });
        }
    }
    
    public async getDashboard(req:Request,res:Response){
        const users= await User.find()
        // console.log(users);
        
       if(req.session.adminId){
        res.render('admin/dashboard',{users})

       }else{
        res.redirect('/admin')
       }
    }
    public async logout (req:Request,res:Response):Promise<void>{
        try {
            req.session.adminId = null; 
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }
}
export default adminAuth