import React, { FC } from 'react'
import { MainNav } from './MainNav'
import { Inbox } from 'lucide-react'
import Link from 'next/link'

interface NavbarProps {
  
}

export const Navbar: FC<NavbarProps> = ({  }) => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className='ml-auto'>
        <Link href={'https://support.poblgroup.co.uk'}>
          <div className="flex items-center gap-3 hover:bg-slate-100 rounded-md py-3 px-6">
            <Inbox className='w-4 h-4' />
            <span className='text-sm'>Contact Support</span>
          </div>
        </Link>
        </div>
      </div>
    </div>
  )
}