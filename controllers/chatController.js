const amqplib = require('amqplib');
const Message = require('../models/Message');
const User = require('../models/User');

const sendToQueue = async (queue, message) => {
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  setTimeout(() => {
    connection.close();
  }, 500);
};

exports.sendMessage = async (req, res) => {
  try {
    const { to, message } = req.body;
    const from = req.user.id;
    const recipient = await User.findById(to);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }
    const newMessage = new Message({ from, to, message });
    await newMessage.save();
    await sendToQueue('messages', newMessage);
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.viewMessages = async (req, res) => {
  try {
    const messages = await Message.find({ $or: [{ from: req.user.id }, { to: req.user.id }] })
      .populate('from', 'username')
      .populate('to', 'username');
    if (messages.length === 0) {
      return res.status(404).json({ message: 'No messages found' });
    }
    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
