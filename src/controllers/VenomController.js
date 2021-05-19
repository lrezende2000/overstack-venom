const fs = require('fs');
const venom = require('venom-bot');
const MessageController = require('./MessageController');

exports.sendMessage = async (req, res) => {
  try {
    const { message, phones } = req.body;
    const sessionName = 'lucasPhone';
    const filePath = `${__dirname}/../data/tokens/${sessionName}.data.json`;
    var BrowserSessionToken = {};

    fs.access(filePath, (err) => {
      if (!err) {
        fs.readFile(filePath, (err, data) => {
          if (!err) {
            BrowserSessionToken = JSON.parse(data.toString());
          }
        });
      }
    });

    venom.create(
      sessionName,
      undefined,
      undefined,
      {
        disableWelcome: true,
        mkdirFolderToken: '/src/data'
      },
      BrowserSessionToken
    ).then((client) => {

      if (Array.isArray(phones)) {

        phones.forEach((phone) => {
          client.sendText(`55${phone}@c.us`, message);
          MessageController.store(message, '60a46c2107e1e61480654629', phone);
        });

      } else if (typeof phones === 'string') {

        client.sendText(`55${phones}@c.us`, message);
        MessageController.store(message, '60a46c2107e1e61480654629', phones);

      } else {

        return res.status(400).json({
          error: true,
          message: 'Parâmetros inválidos'
        });

      }

      return res.status(200).json({
        error: false,
        message: 'Mensagem enviada com sucesso!'
      });

    })
      .catch((err) => {
        return res.status(400).json({
          error: true,
          message: err.message
        });
      });


  } catch (err) {
    return res.status(400).json({
      error: true,
      message: err.message
    });
  }
}
