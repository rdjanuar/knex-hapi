const cookie_options = {
  ttl: 1000, // expires a year from today
  encoding: "none", // we already used JWT to encode
  isSecure: false, // warm & fuzzy feelings
  isHttpOnly: true, // prevent client alteration
  clearInvalid: false, // remove invalid cookies
  strictHeader: true, // don't allow violations of RFC 6265
  path: "/", // set the cookie for all routes
};
