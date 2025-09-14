// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { User } from "./models/user-model";
// import bcrypt from "bcryptjs";
// import { authConfig } from "./auth.config";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import mongoClientPromise from "./quires/database/mongoClientPromise";

// /**
//  *
//  * @param {*} token
//  * @returns
//  */
// async function refreshAccessToken(token) {
//   try {
//     const url =
//       "https://oauth2.googleapis.com/token?" +
//       new URLSearchParams({
//         client_id: process.env.GOOGLE_CLIENT_ID,
//         client_secret: process.env.GOOGLE_CLIENT_SECRET,
//         grant_type: "refresh_token",
//         refresh_token: token.refreshToken,
//       });

//     const response = await fetch(url, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       method: "POST",
//     });

//     const refreshedTokens = await response.json();

//     if (!response.ok) {
//       throw refreshedTokens;
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens?.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens?.expires_in * 1000,
//       refreshToken: refreshedTokens?.refresh_token,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   ...authConfig,
//   adapter: MongoDBAdapter(mongoClientPromise, {
//     databaseName: process.env.ENVIRONMENT,
//   }),
//   providers: [
//     Credentials({
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email and password are required");
//         }

//         try {
//           const user = await User.findOne({ email: credentials.email });

//           if (user) {
//             const isMatch = await bcrypt.compare(
//               credentials.password,
//               user.password
//             );
//             if (isMatch) {
//               // return user;
//               return {
//                 id: user._id.toString(), // must be string
//                 name: user.name,
//                 email: user.email,
//               };
//             } else {
//               throw new Error("Email or password mismatch");
//             }
//           } else {
//             throw new Error("User not found");
//           }
//         } catch (error) {
//           throw new Error(error.message || "Invalid credentials");
//         }
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//         },
//       },
//       profile(profile) {
//         return {
//           id: profile.sub,
//           firstName: profile.given_name || profile.name,
//           lastName: profile.family_name || "",
//           email: profile.email,
//           profile_picture: profile.picture,
//           emailVerified: profile.email_verified,
//         };
//       },
//     }),

//     // GoogleProvider({
//     //   clientId: process.env.GOOGLE_CLIENT_ID,
//     //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     //   authorization: {
//     //     params: {
//     //       prompt: "consent",
//     //       access_type: "offline",
//     //       response_type: "code",
//     //     },
//     //     profile(profile) {
//     //       return {
//     //         id: profile.sub,
//     //         firstName: profile.name,
//     //         email: profile.email,
//     //         image: profile.picture,
//     //         emailVerified: profile.email_verified,
//     //       };
//     //     },
//     //   },
//     // }),
//   ],
//   callbacks: {
//     async jwt({ token, user, account }) {
//       // console.log(`JWT TOKEN : ${JSON.stringify(token)}`);
//       // console.log(`JWT Account : ${JSON.stringify(account)}`);

//       // When logging in with credentials
//       if (account?.provider === "credentials" && user) {
//         return {
//           ...token,
//           user, // keep user data
//           accessToken: null, // credentials has no access_token
//           accessTokenExpires: null,
//           refreshToken: null,
//         };
//       }

//       // google login a eta kaj korbe
//       if (user && account) {
//         return {
//           accessToken: account?.access_token,
//           accessTokenExpires: Date.now() + account?.expires_in * 1000,
//           refreshToken: account?.refresh_token,
//           user,
//         };
//       }

//       if (Date.now() < token?.accessTokenExpires) {
//         return token;
//       }

//       // console.log(`Token expire at : ${new Date(Date.now())}`);

//       return refreshAccessToken(token);
//     },
//     async session({ session, token }) {
//       session.user = token?.user;
//       session.accessToken = token?.access_token;
//       session.error = token?.error;

//       return session;
//     },
//   },
// });

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";

import { authConfig } from "./auth.config";
import { User } from "./models/user-model";
import mongoClientPromise from "./quires/database/mongoClientPromise";

// Function to refresh Google OAuth access token
async function refreshAccessToken(token) {
  try {
    if (!token.refreshToken) {
      throw new Error("No refresh token available");
    }

    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(mongoClientPromise, {
    databaseName: process.env.ENVIRONMENT,
  }),
  providers: [
    // Credentials login
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const user = await User.findOne({ email: credentials.email });
          if (!user) throw new Error("User not found");

          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isMatch) throw new Error("Invalid email or password");

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          throw new Error(error.message || "Login failed");
        }
      },
    }),

    // Google login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent", // Force re-consent to get refresh_token
          access_type: "offline",
          response_type: "code",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          firstName: profile.given_name || profile.name,
          lastName: profile.family_name || "",
          email: profile.email,
          profile_picture: profile.picture,
          emailVerified: profile.email_verified,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      // Handle credentials login
      if (account?.provider === "credentials" && user) {
        return {
          ...token,
          user,
          accessToken: null,
          accessTokenExpires: null,
          refreshToken: null,
        };
      }

      // First-time Google login
      if (user && account?.provider === "google") {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token ?? null,
          user,
        };
      }

      // If access token still valid, return it
      if (token?.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // If token expired, try to refresh (only for OAuth)
      if (token?.refreshToken) {
        return await refreshAccessToken(token);
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token?.user;
      session.accessToken = token?.accessToken ?? null;
      session.error = token?.error ?? null;
      return session;
    },
  },
});
