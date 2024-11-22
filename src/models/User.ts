import mongoose, { Schema, Document, Types} from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Types.ObjectId[];
    friends: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
    {
        username: { 
            type: String, 
            required: true, 
            unique: true, 
            trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must be a valid email address'],
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        toJSON: { virtuals: true },
        id: false,
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

export const User = mongoose.model<IUser>('User', UserSchema);