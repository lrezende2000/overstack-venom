require('dotenv').config();
const { Queue } = require('bullmq');
const UserController = require('./UserController');
const MessageController = require('./MessageController');

exports.queueMessages = async (req, res) => {

  const queue = new Queue(process.env.REDIS_MESSAGE_QUEUE_NAME, {
    connection: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || '6379'
    },
  });

  const user = await UserController.getActiveUser();

  if (!user) {
    return res.status(400).json({
      error: true,
      message: 'No users availables'
    });
  }

  const params = {
    ...req.body,
    user
  }

  await queue.add('message', params);

  if (Array.isArray(params.phones)) {
    params.phones.forEach((phone) => {
      MessageController.store(params.message, user._id, phone);
    })
  } else if (typeof params.phones === 'string') {
    MessageController.store(params.message, user._id, params.phones);
  }

  return res.status(200).json({
    error: false,
    message: 'Message queued successfully'
  });

}
