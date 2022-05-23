export default interface JwtPayload {
  payload: {
    id: number,
    username: string,
    role: string,
    email: string,
    password: string,
  },
  iat: number,
  exp: number,
}
