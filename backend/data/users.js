import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD;

const users = [
  {
    name: "cturner",
    email: "cturner@example.com",
    password: bcrypt.hashSync(DEFAULT_PASSWORD, 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync(DEFAULT_PASSWORD, 10),
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync(DEFAULT_PASSWORD, 10),
  },
];

export default users;
