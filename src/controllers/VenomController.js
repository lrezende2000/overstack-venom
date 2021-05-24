const fs = require('fs');
const venom = require('venom-bot');
const MessageController = require('./MessageController');

exports.sendMessage = async (user, phones, message) => {
  try {
    const sessionName = user._id;
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

    await venom.create(
      sessionName,
      undefined,
      undefined,
      {
        disableWelcome: true,
        mkdirFolderToken: '/src/data'
      },
      BrowserSessionToken
    )
      .then((client) => {

        if (Array.isArray(phones)) {

          phones.forEach((phone) => {
            client.sendText(`55${phone}@c.us`, message);
          });

        } else if (typeof phones === 'string') {

          client.sendText(`55${phones}@c.us`, message);

        } else {

          return false;

        }

        return true;

      })
      .catch((err) => {
        return false;
      });

  } catch (err) {
    return false;
  }
}
