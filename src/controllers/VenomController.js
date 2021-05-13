const venom = require('venom-bot');

exports.sendMessage = async (req, res) => {
  const { message, phones } = req.body;

  try {
    const client = await venom.create();

    if (Array.isArray(phones)) {
      phones.forEach(async (phone) => {
        await client.sendText(`55${phone}@c.us`, message);
      });
    } else if (typeof phones === 'string') {
      await client.sendText(`55${phones}@c.us`, message);
    } else {
      return res.status(400).json({
        error: true,
        message: 'Message must be a string and phones must be an array or string'
      });
    }

    return res.status(200).json({
      error: false,
      message: 'Mensagem enviada com sucesso!'
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: err.message
    });
  }
}
