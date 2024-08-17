import { Schema, model } from "mongoose"
import { ObjectId } from "mongoose"

interface Friends {
  userId: ObjectId
  friends: ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const friendsSchema = new Schema<Friends>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const Friends = model("Friends", friendsSchema)

export default Friends
