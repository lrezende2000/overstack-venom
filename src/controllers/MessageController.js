const Message = require('../models/Message');

exports.countUserDailyMessages = async (user_id) => {
  const inicialTime = new Date().setHours(0, 0, 0, 0);
  const finalTime = new Date().setHours(23, 59, 59);

  const messages = await Message.find({
    user_id,
    date: {
      $gte: inicialTime,
      $lte: finalTime
    }
  });

  if (messages) {
    return messages.length;
  }
  return 0;
}

exports.store = async (text, user_id, to) => {
  Message.create({ text, user_id, to }, (err) => {
    if (err) {
      return false;
    }
    return true;
  });
}

exports.newMessage = async (req, res) => {
  await Message.create(req.body, (err) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err.message
      });
    }

    return res.status(201).json({
      error: false,
      message: 'Message stored!'
    });
  });
}
