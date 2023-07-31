import React, { FC } from 'react'
import { MainNav } from './MainNav'
import { ArrowLeft, GitBranchIcon, Inbox } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'

interface NavbarProps {
  
}

export const Navbar: FC<NavbarProps> = ({  }) => {
  return (
    <div className="border-b">
      <div className="flex h-16 justify-start items-center px-4">

        <div className='w-full mx-6 flex justify-evenly'>
          <div className='flex h-10 justify-start items-center gap-6'>
            <Link href={'https://support.poblgroup.co.uk'}>
                <Button size={'icon'} variant={'outline'}><ArrowLeft className='w-4 h-4'/></Button>
            </Link>
            <Image
                src={'/Pobl-logo.svg'}
                width={70}
                height={60}
                alt='pobl logo'
            />
          </div>
          <div className='flex flex-1 h-10 justify-end items-center gap-2'>
            <GitBranchIcon className='w-5 h-5 font-medium text-indigo-700' />
            <h2 className='font-semibold text-md text-indigo-600'>Technology Roadmap</h2>
          </div>
          {/* <div className='bg-green-100 w-1/3 h-10 justify-start items-center'>
          </div> */}
        </div>


        {/* <MainNav className="mx-6" /> */}
        {/* <div className='ml-auto'>
        <Link href={'https://support.poblgroup.co.uk'}>
          <div className="flex items-center gap-3 hover:bg-slate-100 rounded-md py-3 px-6">
            <Inbox className='w-4 h-4' />
            <span className='text-sm'>Contact Support</span>
          </div>
        </Link>
        </div> */}
      </div>
    </div>
  )
}