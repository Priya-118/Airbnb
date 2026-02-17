class ExpressError extends Error {
  constructor(statusCode , message) {
    super();
    this.statusCode= statusCode;
    this.message = message;
  }
}

module.exports = ExpressError;


// // res.send("Ooops ! something went wrong ");instead of writing this our own error we can use expresserror to throw error