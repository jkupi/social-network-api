import mongoose, { Schema, Document } from "mongoose";
import ReactionSchema, { IReaction } from "./Reaction.js";

export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date | string;
  username: string;
  reactions: IReaction[];
}

const ThoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 420,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
      get: (timestamp: Date | number) => {
        const date =
          typeof timestamp === "number" ? new Date(timestamp) : timestamp;
        return date.toISOString();
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: { virtuals: true, getters: true },
  }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

export const Thought = mongoose.model<IThought>('Thought', ThoughtSchema);