import AzureADProvider from "next-auth/providers/azure-ad";
import { AuthOptions } from 'next-auth';
// import { PrismaAdapter } from '@auth/prisma-adapter';
// import prisma from './db';

export const authOptions: AuthOptions = {
    // adapter: PrismaAdapter(prisma),
    // session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      AzureADProvider({
        clientId: process.env.AZURE_AD_CLIENT_ID ?? '',
        clientSecret: process.env.AZURE_AD_CLIENT_SECRET ?? '',
        tenantId: process.env.AZURE_AD_TENANT_ID ?? '',
      }),
    ],
    callbacks: {
      async jwt({ token, user, account, profile}) {
        // console.log('JWT Token', token)
        if(account) {
          token.accessToken = account.access_token
        }
        return token
      }
      // async session({ session, token, user }) {
      //   if(token) {
      //     session.user.roles = token.roles
      //   }

      //   return session
      // }
    }
};
