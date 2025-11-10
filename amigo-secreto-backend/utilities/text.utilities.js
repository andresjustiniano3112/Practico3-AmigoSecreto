const sha1 = require('sha1');

exports.generateAuthToken = (salt) => sha1(salt + new Date().getTime());

exports.generateHash = () => {
  const crypto = require('crypto');
  return crypto.randomBytes(16).toString('hex');
};
