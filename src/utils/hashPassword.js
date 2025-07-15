import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export { hashPassword, comparePassword };
