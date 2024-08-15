import { model, Schema } from "mongoose";

const MessageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
    ref: "User"
  },
  sender: {
    type: String,
    required: true,
    ref: "User"
  },
  receiverId: {
    type: String,
    required: true,
    ref: "User"
  },
  receiver: {
    type: String,
    required: true,
    ref: "User"
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
})

const MessageModel = model('Message', MessageSchema)

export default MessageModel