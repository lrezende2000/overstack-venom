const User = require('../models/User');
const MessageController = require('../controllers/MessageController');

exports.index = async (req, res) => {
  await User.find(req.query, (err, users) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err.message
      });
    }

    this.getActiveUser();

    return res.status(200).json({
      error: false,
      users
    });
  });
}

exports.store = async (req, res) => {
  await User.create(req.body, (err) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err.message
      });
    }

    return res.status(201).json({
      error: false,
      message: 'Usuário criado com sucesso!'
    });
  });
}

exports.desactiveUser = async (req, res) => {
  const { user_id } = req.params;
  await User.findOneAndUpdate({ _id: user_id }, { status: 'D' }, (err) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err.message
      });
    }

    return res.status(200).json({
      error: false,
      message: 'Usuário desativado com sucesso!'
    });
  });
}

exports.activeUser = async (req, res) => {
  const { user_id } = req.params;
  await User.findOneAndUpdate({ _id: user_id }, { status: 'A' }, (err) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err.message
      });
    }

    return res.status(200).json({
      error: false,
      message: 'Usuário ativado com sucesso!'
    });
  });
}

exports.getActiveUser = async () => {
  const users = await User.find({ status: 'A' });

  for(let user of users) {
    const messageCount = await MessageController.countUserDailyMessages(user._id);

    if (messageCount < 300) {
      return user;
    }
  }

  return false;
}
