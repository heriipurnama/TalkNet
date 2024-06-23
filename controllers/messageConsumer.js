const amqplib = require('amqplib');
const Message = require('../models/Message');

const consumeQueue = async (queue) => {
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const messageData = JSON.parse(msg.content.toString());
      // Notify users logic here (e.g., via websocket or email)
      console.log('New message received:', messageData);
      channel.ack(msg);
    }
  });
};

consumeQueue('messages');
