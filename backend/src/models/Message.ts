import { model, Schema } from "mongoose";
import { MessageTypes } from "utils/types";

const MessageSchema = new Schema<MessageTypes>({
  text: {
    type: String,
    required: true,
  },
  sender: {
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