"use server";

import { User } from "@/models/user-model";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { validatePassword } from "@/quires/users";

/**
 *
 * @param {*} email
 * @param {*} updateData
 */
export async function updateUserInfo(email, updateData) {
  try {
    await User.findOneAndUpdate({ email: email }, updateData);
    revalidatePath("/account");
  } catch (error) {
    throw new Error(error);
  }
}

/**
 *
 * @param {*} email
 * @param {*} oldPassword
 * @param {*} newPassword
 */
export async function changePasswordByLoggedinUser(
  email,
  oldPassword,
  newPassword
) {
  try {
    const isMatch = await validatePassword(email, oldPassword);

    if (!isMatch) {
      throw new Error("Please  enter a valid Password");
    }

    // hash password
    const hassPassword = await bcrypt.hash(newPassword, 5);

    const updatePassword = {
      password: hassPassword,
    };

    await User.findOneAndUpdate({ email: email }, updatePassword);
    revalidatePath("/account");
  } catch (error) {
    throw new Error(error);
  }
}
