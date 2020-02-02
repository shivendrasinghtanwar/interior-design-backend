const basicQuery = require('../models/basicQueries');
const SingletonRunnerResponse = require('../utils/singletonRunnerResponse');

class SingletonRunner {
  constructor() {
    this.isRunning = false;
    this.processName = null;
    this.startTime = null;
    this.startedBy = null;
  }

  async getLock(process) {
    if (this.isRunning) {
      const msg = `Please try after a while! A critical task '${this.processName}' is under process. It was started by ${this.startedBy} at ${this.startTime.toLocaleString()}.`;
      console.log(msg);
      return new SingletonRunnerResponse({
        success: false,
        message: msg
      });
    }
    this.isRunning = true;
    this.processName = process.processName;
    this.startTime = new Date();
    const user = await basicQuery.getUserById(process.adminId);
    this.startedBy = `${user.first_name} ${user.last_name}`;
    console.log(`${this.processName} is started at ${this.startTime.toLocaleString()} and started by ${this.startedBy}`);
    return new SingletonRunnerResponse({ success: true });
  }

  releaseLock() {
    this.isRunning = false;
    console.log(`${this.processName} is completed and took ${((new Date()) - this.startTime) / 60000} minutes`);
    this.processName = null;
    this.startTime = null;
    this.startedBy = null;
  }

  async runUnderLock(func, processName, adminId, ...args) {
    try {
      const lock = await this.getLock({
        processName,
        adminId
      });
      if (!lock.success) return lock;
      const response = await func(...args);
      console.log(response);
      this.releaseLock();
      return response;
    } catch (err) {
      console.log(err);
      this.releaseLock();
      return err;
    }
  }
}

module.exports = new SingletonRunner();
