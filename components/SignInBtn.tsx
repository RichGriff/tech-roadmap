'use client'

import React from 'react'
import { Button } from './ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { cn } from '@/lib/utils'

type SignInBtnProps = {
  label: string, 
  className?: string
}

const SignInBtn = ({ label, className } : SignInBtnProps) => {
  return (
    // <Button 
    //   variant={"primary"} 
    //   onClick={() => signIn('azure-ad', { callbackUrl: '/' })}
    //   className={cn("rounded-full w-full flex justify-center items-center gap-3", className)}
    // >
    //   {label} <ArrowRightIcon className="inline-block w-4 h-4" />
    // </Button>
    <button
      onClick={() => signIn('azure-ad', { callbackUrl: '/' })}
      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {label}
    </button>
  )
}

export default SignInBtn
