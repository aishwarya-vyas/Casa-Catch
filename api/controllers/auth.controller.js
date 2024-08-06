import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req?.body;

  try {
    const hashPass = await bcrypt.hash(password, 10);
    console.log(hashPass);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPass,
      },
    });

    console.log(newUser);
    res.status(201).json({ message: 'User Created Successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to Create User' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req?.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      console.log('Invalid Username');
      return res.status(400).json({ message: 'Invalid Username' });
    }

    const passValid = await bcrypt.compare(password, user.password);

    if (!passValid) {
      console.log('Invalid Password');
      return res.status(400).json({ message: 'Invalid Password' });
    }

    // res.setHeader("Set-Cookie", "test=" + "myValue");
    // res.status(200).json({ message: 'Login Successful' });

    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user

    res.cookie("token", token, {
      httpOnly: true,
      // secure:true
      maxAge: age,
    }).status(200).json(userInfo);;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to Login' });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" })
};
