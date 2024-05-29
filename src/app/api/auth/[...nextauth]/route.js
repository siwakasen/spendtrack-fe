import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import SignToken from "./SignToken";

const authOptions = {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET_KEY,
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
            scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email ',
        }),
    ],
    pages: {
        signIn: '/',
        signOut: '/auth',
        error: '/auth/error',
    },
    callbacks: {
        async signIn({ account, profile, email, credentials }) {
            if (account.provider === "google") {
                try {
                    const data = {
                        name: profile.name,
                        email: profile.email,
                        image: profile.picture,
                    };
                    // const response = await axios.post(
                    //     "http://localhost:3001/api/auth/login",
                    //     data
                    // );

                } catch (error) {
                    console.error("Error during sign-in:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.loggedUser = SignToken(user?.email);
            }
            return token;
        },
        async session({ session, token }) {
            session.loggedUser = token.loggedUser;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
