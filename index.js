const Queue = require('bull');

class Bull {
  constructor() {
    // Map<key, Queue>
    // key: queue name
    // value: bull Queue
    this.queues = new Map();
  }

  configure(config = {}) {
    const {
      logger = console,
      bullJobDefinitions = [],
      bullBootJobs = [],
      bullRecurringJobs = [],
      ...conf
    } = config;

    this.config = {
      logger,
      bullJobDefinitions,
      bullBootJobs,
      bullRecurringJobs,
      ...conf
    };
  }

  start() {
    this.config.logger.info('starting job queue');

    // trigger boot jobs
    this.config.bullBootJobs.forEach(job => {
      const { name, data } = job;
      this._checkJob(job);
      const queue = this.queues.get(name);
      queue.add(data, { priority: 1 });
    });

    // start repeatable jobs
    this.config.bullRecurringJobs.forEach(job => {
      const { name, data, options } = job;
      if (!options.cron) {
        throw new Error('`options.cron` must be set for recurring jobs');
      }

      this._checkJob(job);
      const queue = this.queues.get(name);
      queue.add(data, {
        repeat: {
          cron: options.cron
        }
      });
    });
  }

  // graceful shutdown
  async stop(name) {
    this.config.logger.info(`shutting down ${name} job queue`);
    try {
      const queue = this.queues.get(name);
      if (!queue) return;
      await queue.close();
      this.queues.delete(name);
    } catch (err) {
      this.config.logger.error(err);
    }
  }

  async stopAll() {
    this.config.logger.info('shutting down all job queues');
    try {
      const promises = [];
      for (const key of this.queues.keys()) {
        promises.push(
          new Promise((resolve, reject) => {
            this.stop(key)
              .then(resolve)
              .catch(reject);
          })
        );
      }

      await Promise.all(promises);
    } catch (err) {
      this.config.logger.error(err);
    }
  }

  _checkJob(job) {
    const { name, data } = job;

    if (typeof name !== 'string') {
      throw new TypeError(`job name ${job} is not a string`);
    }

    if (typeof data !== 'object') {
      throw new TypeError(`job data is not an object`);
    }

    if (!this.queues.has(name)) {
      const queue = new Queue(name);
      this._registerEvents(queue);
      this.queues.set(name, queue);
    }
  }

  _registerEvents(queue) {
    queue.on('active', job => {
      this.config.logger.info(`${job.id} has started`);
    });

    queue.on('completed', job => {
      this.config.logger.info(`${job.id} has completed successfully`);
    });

    queue.on('failed', (job, err) => {
      this.config.logger.error(`${job.id} has failed: ${err}`);
    });

    queue.on('error', err => {
      this.config.logger.error(`queue error: ${err}`);
    });
  }
}

module.exports = Bull;
