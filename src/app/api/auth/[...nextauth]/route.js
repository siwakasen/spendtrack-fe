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
        }),
    ],

    pages: {
        signIn: '/',
        signOut: '/auth',
        error: '/auth/error',
    },
    callbacks: {
        async signIn({ profile, account }) {
            if (account.provider === "google") {
                const data = {
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                };
                const response = await axios.post(
                    "http://localhost:3001/api/auth/login",
                    data
                );
            }
            return true;
        },
        async jwt({ token }) {
            const userLoggedIn = SignToken(token?.email);
            token.loggedUser = userLoggedIn;
            return token;
        },
        async session({ session, token }) {
            session.loggedUser = token.loggedUser;
            return session;
        },
    },
    debug: true,
    session: {
        jwt: true,
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
