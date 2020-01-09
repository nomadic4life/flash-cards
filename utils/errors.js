class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.statusMessage = message;
  }
}

module.exports = CustomError;
