const { sendMessage } = require('../../controllers/VenomController');

module.exports = async (job) => {

  await sendMessage(job.data.user, job.data.phones, job.data.message);

}
