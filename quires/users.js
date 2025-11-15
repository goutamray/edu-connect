import { User } from "@/models/user-model";
import { replaceMongoIdInObject } from "@/lib/convertData";
import bcrypt from "bcryptjs";

/**
 *
 * @param {*} email
 * @returns
 */
export async function getUserByEmail(email) {
  const user = await User.findOne({ email: email }).select("-password").lean();
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

/**
 *
 * @param {*} userId
 * @returns
 */
export async function getUserDetails(userId) {
  const user = await User.findById(userId).select("-password").lean();
  return replaceMongoIdInObject(user);
}
