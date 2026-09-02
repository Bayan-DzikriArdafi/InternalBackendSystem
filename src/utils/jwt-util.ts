import jwt, { type JwtHeader, type SigningKeyCallback } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const setClient = () => {
  return jwksClient({
    // jwksUri: `${IAS_TOKEN_URL}/token_keys`,
    jwksUri: process.env.IAS_TOKEN_JKU_URL!,
    cache: true,
    cacheMaxEntries: 5,
    cacheMaxAge: 10 * 60 * 1000, // 10 menit
  });
};

const getKey = (header: JwtHeader, callback: SigningKeyCallback) => {
  const client = setClient() as jwksClient.JwksClient;
  if (!header.kid) {
    return callback(new Error("No KID found in token header"));
  }

  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);

    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
};

export const verifyJwt = (token: string): Promise<any> => {
  const IAS_TOKEN_ISSUER_URL = process.env.IAS_TOKEN_ISSUER_URL;
  const IAS_CLIENT_ID = process.env.IAS_CLIENT_ID;

  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      {
        audience: IAS_CLIENT_ID,
        issuer: IAS_TOKEN_ISSUER_URL,
        algorithms: ["RS256"],
      },
      (err, decoded) => {
        if (err) {
          return reject(err);
        }

        resolve(decoded);
      },
    );
  });
};
