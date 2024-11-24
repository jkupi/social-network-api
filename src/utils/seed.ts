import mongoose from "mongoose";
import { User } from "../models/User";
import { Thought } from "../models/Thought";

const seedData = async () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/socialNetworkDB");

    console.log("Connected to database");

    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log("Cleared any existing data");

    const users = [
      {
        username: "Michael Scott",
        email: "michael.scott@dundermifflin.com",
        thoughts: [],
        friends: [],
      },
      {
        username: "Jim Halpert",
        email: "jim.halpert@dundermifflin.com",
        thoughts: [],
        friends: [],
      },
      {
        username: "Pam Beesly",
        email: "pam.beesly@dundermifflin.com",
        thoughts: [],
        friends: [],
      },
      {
        username: "Dwight Schrute",
        email: "dwight.schrute@dundermifflin.com",
        thoughts: [],
        friends: [],
      },
      {
        username: "Angela Martin",
        email: "angela.martin@dundermifflin.com",
        thoughts: [],
        friends: [],
      },
    ];

    const thoughts = [
      {
        thoughtText: "That's what she said!",
        username: "Michael Scott",
        reactions: [
          { reactionBody: "Classic Michael!", username: "Jim Halpert" },
          { reactionBody: "Inappropriate.", username: "Angela Martin" },
        ],
      },
      {
        thoughtText: "Bears. Beets. Battlestar Galactica.",
        username: "Jim Halpert",
        reactions: [
          {
            reactionBody: "Identity theft is not a joke, Jim!",
            username: "Dwight Schrute",
          },
        ],
      },
      {
        thoughtText: "I am Beyoncé, always.",
        username: "Michael Scott",
        reactions: [
          { reactionBody: "No, you're not.", username: "Pam Beesly" },
        ],
      },
      {
        thoughtText: "I declare bankruptcy!",
        username: "Michael Scott",
        reactions: [
          {
            reactionBody: "That's not how it works.",
            username: "Oscar Martinez",
          },
        ],
      },
      {
        thoughtText: "I feel God in this Chili's tonight.",
        username: "Pam Beesly",
        reactions: [
          { reactionBody: "I miss Chili's too.", username: "Jim Halpert" },
        ],
      },
    ];

    const createdUsers = await User.insertMany(users);
    console.log("Users added.");

    const userMap = new Map(
      createdUsers.map((user) => [user.username, user._id])
    );

    for (const thought of thoughts) {
      const newThought = await Thought.create(thought);

      await User.findByIdAndUpdate(userMap.get(thought.username), {
        $push: { thoughts: newThought._id },
      });
    }
    console.log("Thoughts added and linked to users.");

    await User.findByIdAndUpdate(userMap.get("Michael Scott"), {
      $push: {
        friends: [userMap.get("Jim Halpert"), userMap.get("Pam Beesly")],
      },
    });

    await User.findByIdAndUpdate(userMap.get("Jim Halpert"), {
      $push: {
        friends: [userMap.get("Pam Beesly"), userMap.get("Michael Scott")],
      },
    });

    await User.findByIdAndUpdate(userMap.get("Pam Beesly"), {
      $push: {
        friends: [userMap.get("Michael Scott"), userMap.get("Jim Halpert")],
      },
    });

    await User.findByIdAndUpdate(userMap.get("Dwight Schrute"), {
      $push: { friends: [userMap.get("Angela Martin")] },
    });

    await User.findByIdAndUpdate(userMap.get("Angela Martin"), {
      $push: { friends: [userMap.get("Dwight Schrute")] },
    });

    console.log("Friends added between users.");

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
