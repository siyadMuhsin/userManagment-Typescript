import { Response,Request } from "express";
import User from "../modals/User";
class ManageUsers{
    public async updateUser(req:Request,res:Response):Promise<void>{
        try {
            const id:string=req.params.id
            const {name}=req.body
            const findUser= await User.findById(id)
           
            if (!findUser) {
                res.status(404).json({ success: false, message: 'User not found' });
                return;
            }
    
            // Update the user's name
            findUser.name = name;
            await findUser.save();
    
            res.status(200).json({ success: true, message: 'Name changed successfully' });
        } catch (error) {
            console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
            
        }

    }
    public async deleteUser(req:Request,res:Response){
        try {
            const id:string= req.params.id
            const findUser= await User.findById(id)
            if (!findUser) {
                res.status(404).json({ success: false, message: 'User not found' });
                return;
            }
            await User.deleteOne({_id:id})

            res.status(200).json({ success: true, message: 'User deleted successfully' });
        } catch (error) {
            
        }

    }
}

export default ManageUsers