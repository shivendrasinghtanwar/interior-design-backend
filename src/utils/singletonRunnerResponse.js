class SingletonRunnerResponse {
  constructor(resp) {
    this.success = resp.success || false;
    this.msg = resp.message || null;
  }
}

module.exports = SingletonRunnerResponse;
