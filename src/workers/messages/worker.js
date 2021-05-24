require('dotenv').config()
const { Worker } = require('bullmq')

const worker = new Worker(process.env.REDIS_MESSAGE_QUEUE_NAME, `${__dirname}/processor.js`, {
  connection: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || '6379'
  },
  concurrency: 1,
})

worker.on('completed', job => console.info(
  `Completed job ${job.id} successfully`,
));

worker.on('failed', (job, err) => console.info(
  `Failed job ${job.id} with ${err}`,
));

module.exports = {
  worker,
}
