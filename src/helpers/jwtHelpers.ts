import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifiedToken =  (token: string,secret:Secret):JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
}
export const jwtHelper = {
  createToken,
  verifiedToken
};
