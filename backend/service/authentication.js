import JWT from "jsonwebtoken";

const secret = process.env.secret;

export function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };

  const token = JWT.sign(payload, secret);
  return token;
}

export function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}
