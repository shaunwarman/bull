const Bull = require('..');

const createEmail = () => {
  return {
    name: 'email',
    data: {
      template: 'inquiry',
      to: 'Test email',
      cc: 'test@test.com',
      locals: {
        locale: 'en-US'
      }
    },
    options: {}
  };
};

const job = createEmail();

const bull = new Bull();
bull.configure({
  bullBootJobs: [job]
});

bull.start();
setTimeout(async () => {
  await bull.stopAll();
}, 3000);
