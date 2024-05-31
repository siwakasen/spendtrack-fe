import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
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
        signIn: '/dashboard',
        signOut: '/',
        error: '/auth/error',
    },
    callbacks: {
        async signIn({ account, profile, email, credentials }) {
            if (account.provider === "google" && profile.email_verified) {
                try {
                    const data = {
                        name: profile.name,
                        email: profile.email,
                        image: profile.picture,
                    };
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });
                } catch (error) {
                    console.error("Error during sign-in:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ account, token, user }) {
            if (account?.user) {
                token.user = account.user;
            } else if (user) {
                token.user = user;
            }
            console.log(token.user);
            token.loggedUser = await SignToken(token.user?.email);
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
