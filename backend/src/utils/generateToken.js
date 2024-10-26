// Options for token cookies
export const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};
