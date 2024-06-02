const Queue = require('bull');
const sendEmail = require('../helpers/sendEmail');
const chapterEmailQueue = new Queue('chapterEmailQueue', 
{ redis: { port: 6379, 
  host: '127.0.0.1'}
 }); 
 chapterEmailQueue.process(async(job) =>{
      await sendEmail(job.data);
  });

  module.exports = chapterEmailQueue