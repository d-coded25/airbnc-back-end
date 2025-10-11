const unknownPathHandler = function (req, res, next) {
  res.status(404).send({ msg: 'Path not found' });
};

const serverErrorHandler = function (err, req, res, next) {
  res.status(500).send({ msg: 'Server error' });
};

module.exports = { unknownPathHandler, serverErrorHandler };
