const Queue = require('bull');

const queue = new Queue('email');

queue.process(job => {
  setTimeout(() => {
    console.log('JOB', JSON.stringify(job));
  }, 1000);
});

queue.on('completed', (job, result) => {
  console.log(`${job.id} completed with result ${result}`);
});
