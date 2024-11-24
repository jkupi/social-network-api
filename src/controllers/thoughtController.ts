import { Request, Response } from "express";
import { User } from "../models/User";
import { Thought } from "../models/Thought";

// Get all thoughts
export const getThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single thought by ID
export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
        res.status(404).json({ message: 'thought not found' });
    }
    res.status(200).json(thought);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, {
        $push: { thoughts: thought.id },
    });
    res.status(201).json(thought);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a thought by ID
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!thought) {
        res.status(404).json({ message: 'thought not found' });
    }
    res.status(200).json(thought);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a thought
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id);
    if (!thought) {
        res.status(400).json({ message: 'thought not found' });
    }
    res.status(200).json({ message: 'thought deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Add a reaction to a thought
export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
    );
    if (!thought) {
        res.status(404).json({ message: 'thought not found' });
    }
    res.status(200).json(thought);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a reaction from a thought
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
    );
    if (!thought) {
        res.status(404).json({ message: 'thought not found' });
    }
    res.status(200).json(thought);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
