const test = require('ava');
const Bull = require('..');

test('returns itself', t => {
  const bull = new Bull();
  t.true(bull instanceof Bull);
});

test('init queue property', t => {
  const bull = new Bull();
  t.true(bull.queues instanceof Map);
});

test('configure', t => {
  const bull = new Bull();
  t.true(typeof bull.configure === 'function');
  bull.configure();
  t.true(typeof bull.config === 'object');
  t.true(bull.config.logger === console);
  t.true(Array.isArray(bull.config.bullJobDefinitions));
  t.true(Array.isArray(bull.config.bullBootJobs));
  t.true(Array.isArray(bull.config.bullRecurringJobs));
});
