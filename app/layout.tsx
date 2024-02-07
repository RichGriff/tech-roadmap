import { Navbar } from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import SessionProvider from "@/providers/session-provider";
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Technology Roadmap',
  description: 'Upcoming projects from technology at Pobl',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>
          <Navbar />
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  )
}
