const CACHE_DURATION_IN_SECS = 300;

const ok = res => result => {
  res.status(200).json(result);
};

const notFound = res => _ => {
  res.status(404).end();
};

const badRequest = res => _ => {
  res.status(400).end();
};

module.exports = { ok, notFound, badRequest };
