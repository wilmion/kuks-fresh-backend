import { sign, verify } from 'jsonwebtoken';

export function generate(
  payload: any,
  passKey: string,
  durationInHours: number,
) {
  const token: string = sign(payload, passKey, {
    expiresIn: `${durationInHours}h`,
  });

  return token;
}

export async function comprobate(token: string, passKey: string) {
  const data = await verify(token, passKey, { ignoreExpiration: false });
  return data;
}
