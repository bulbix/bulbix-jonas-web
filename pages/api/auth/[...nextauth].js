import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    redirect: async (url, _baseUrl) => {
      return Promise.resolve("/books");
    },
  },
});
