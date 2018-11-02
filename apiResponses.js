const ok = res => result => {
  res.status(200).json(result);
};

const notFound = res => err => {
  res.status(404).json(err);
};

const badRequest = res => err => {
  res.status(400).json(err);
};

module.exports = { ok, notFound, badRequest };
