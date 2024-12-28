import mongoose,{Schema,Document} from "mongoose";

export interface IUser extends Document {
    name :string;
    email:string;
    password:string;
    createdAt:Date;
}

// Create the User schema
const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  
  });

  const User =mongoose.model<IUser>('User',UserSchema);
  export default User