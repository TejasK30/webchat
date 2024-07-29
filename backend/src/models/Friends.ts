import { Schema, model } from "mongoose"

const friendsSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  friends: [{ 
    type: Schema.Types.ObjectId, 
    ref: "User" }
  ],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now
  },
})

const Friends = model("Friends", friendsSchema)

export default Friends
