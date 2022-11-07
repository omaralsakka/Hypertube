import jwt, { JwtPayload } from 'jsonwebtoken';
const secret = process.env.NEXTAUTH_SECRET || ''

export const signEmailToken = async (email: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		const expirationTime = 3600;
		jwt.sign(
			{
				email: email,
			},
			secret,
			{
				issuer: '42 Dates',
				algorithm: 'HS256',
				expiresIn: expirationTime,
			},
			(err, token) => {
				if (token) resolve(token);
				if (err) reject(err);
			}
		);
	});
};

export const verifyJWT = async (
	userToken: string,
	serverToken: string
): Promise<string | JwtPayload | undefined> => {
	return new Promise((resolve, reject) => {
		jwt.verify(userToken, serverToken, (err, decoded) => {
			if (err) {
				reject(err);
			} else resolve(decoded);
		});
	});
};
