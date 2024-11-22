import { Schema, Types } from "mongoose";

export interface IReaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date | string;
}

const ReactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 420,
    },
    username: { 
      type: String, 
      required: true 
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
      get: (timestamp: Date | number) => {
        const date = typeof timestamp === "number" ? new Date(timestamp): timestamp;
        return date.toISOString();
      },
    },
  },
  {
    toJSON: { getters: true },
    _id: false,
  }
);

export default ReactionSchema;
