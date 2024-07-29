import { model, Schema } from "mongoose";

const MessageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
})

const MessgaeModel = model('Message', MessageSchema)

export default MessgaeModel