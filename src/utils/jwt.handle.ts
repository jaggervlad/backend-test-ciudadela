import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tokenalv';

export function generateToken({ id, name }: { id: string; name: string }) {
  const jwt = sign({ id, name }, JWT_SECRET, {
    expiresIn: '5d',
  });

  return jwt;
}

export function verifyToken(jwt: string) {
  return verify(jwt, JWT_SECRET);
}
