const unknownURLHandler = function (req, res, next) {
  res.status(404).send({ msg: 'Path Not Found' });
};

const badRequestsHandler = function (err, req, res, next) {
  const postgresqlCodes = ['22P02', '23502'];

  if (postgresqlCodes.includes(err.code)) {
    res.status(400).send({ msg: 'Bad Request' });
  } else {
    next(err);
  }
};

const resourceNotFoundHandler = function (err, req, res, next) {
  const status = err.status;
  const msg = err.message;
  res.status(status).send({ msg });
};

const serverErrorHandler = function (err, req, res, next) {
  res.status(500).send({ msg: 'Server Error' });
};

module.exports = {
  unknownURLHandler,
  badRequestsHandler,
  resourceNotFoundHandler,
  serverErrorHandler,
};
