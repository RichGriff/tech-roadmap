'use client'

import React from 'react'
import { Button } from './ui/button'
import { ArrowRightIcon, LogOut } from 'lucide-react'
import { signIn, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

type SignInBtnProps = {
  label?: string, 
  className?: string
}

const SignOutBtn = ({ label, className } : SignInBtnProps) => {
  const router = useRouter()
  return (
    <button
      // onClick={() => signOut({ callbackUrl: 'https://support.poblgroup.co.uk' })}
      onClick={() => {
        signOut({ redirect: true }).then(() => {
            void router.push("https://support.poblgroup.co.uk"); // Redirect to the dashboard page after signing out
        });
      }}
      className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-500 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      <LogOut className='w-4 h-4' />
    </button>
  )
}

export default SignOutBtn
