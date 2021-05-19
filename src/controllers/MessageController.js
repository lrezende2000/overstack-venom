const Message = require('../models/Message');

exports.countUserDailyMessages = async (user_id) => {
  const inicialTime = new Date().setHours(0, 0, 0, 0);
  const finalTime = new Date().setHours(23, 59, 59);

  const messages = await Message.find({ user_id: user_id, date: { $gte: inicialTime, $lte: finalTime } });

  return messages.length;
}

exports.store = async (text, user_id, to) => {
  await Message.create({ text, user_id, to }, (err) => {
    return err ? false : true;
  });
}
