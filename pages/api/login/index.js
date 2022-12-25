import NextCors from "nextjs-cors";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: `${process.env.SHORT_URL}`,
    credentials: true,
    optionsSuccessStatus: 200,
  });

  if (req.method === "POST") {
    const { username, password } = req.body;

    if (username === process.env.ADMIN && password === process.env.PASSWORD) {
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
          username: username,
        },
        process.env.SECRET
      );

      const serialized = serialize("token", token, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 60 * 60 * 1000,
        path: "/",
        secure: true,
      });

      res.setHeader("Set-Cookie", serialized);
      res.status(200).json({
        message: "success",
        token,
      });
    } else {
      res.status(400).json("Wrong credentials");
    }
  }
}

export default handler;
