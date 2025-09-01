"use server";

import { signIn } from "@/auth";

// import { signIn } from "next-auth";

// export async function login(formData) {
//   try {
//     const res = await signIn("credentials", {
//       email: formData.get("email"),
//       password: formData.get("password"),
//       redirectTo: "/courses", // ✅ redirect handled on success
//     });

//     return { success: true, res };
//   } catch (error) {
//     return {
//       success: false,
//       error: error.message || "Invalid email or password",
//     };
//   }
// }

export async function doSocialLogin(formData) {
  const action = formData.get("action");

  await signIn(action, { redirectTo: "/courses" });
}
