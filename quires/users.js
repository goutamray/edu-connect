import { User } from "@/models/user-model";
import { replaceMongoIdInObject } from "@/lib/convertData";
import bcrypt from "bcryptjs";

/**
 *
 * @param {*} email
 * @returns
 */
export async function getUserByEmail(email) {
  const user = await User.findOne({ email: email }).lean();

  return replaceMongoIdInObject(user);
}

/**
 *
 * @param {*} email
 * @param {*} oldPassword
 */
export async function validatePassword(email, password) {
  const user = await getUserByEmail(email);

  const isMatch = await bcrypt.compare(password, user?.password);

  return isMatch;
}
