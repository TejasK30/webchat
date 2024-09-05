import Message from "../models/Message"

export const getMessagesGroupedByDate = async (
  senderId: string,
  receiverId: string
) => {
  try {
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: senderId, receiverId: receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        },
      },
      {
        $addFields: {
          date: { $dateToString: { format: "%d-%m-%Y", date: "$timestamp" } },
        },
      },
      {
        $group: {
          _id: "$date",
          messages: {
            $push: {
              _id: "$_id",
              text: "$text",
              sender: "$sender",
              senderId: "$senderId",
              receiver: "receiver",
              receiverId: "$receiverId",
              timestamp: "$timestamp"
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ])

    return messages
  } catch (error) {
    console.error("Error retrieving messages:", error)
    throw error
  }
}