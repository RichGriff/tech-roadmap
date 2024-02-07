'use client'

import SignInBtn from '@/components/SignInBtn'
import { ChevronRight, MoveRight } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("No JWT");
      console.log(status);
      void signIn('azure-ad', { callbackUrl: '/' });
    } else if (status === "authenticated") {
      void router.push("/");
    }
  }, [status]);

  return (
    <></>
    // <div className="relative isolate overflow-hidden bg-white">
    //   <svg
    //     className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
    //     aria-hidden="true"
    //   >
    //     <defs>
    //       <pattern
    //         id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
    //         width={200}
    //         height={200}
    //         x="50%"
    //         y={-1}
    //         patternUnits="userSpaceOnUse"
    //       >
    //         <path d="M.5 200V.5H200" fill="none" />
    //       </pattern>
    //     </defs>
    //     <rect width="100%" height="100%" strokeWidth={0} fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
    //   </svg>
    //   <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
    //     <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
    //       <div className="mt-24 sm:mt-32 lg:mt-16">
    //         <a href="#" className="inline-flex space-x-6">
    //           <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
    //             Whats new
    //           </span>
    //           <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
    //             <span>Just shipped v1.0</span>
    //             <ChevronRight className='w-4 h-4' />
    //           </span>
    //         </a>
    //       </div>
    //       <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
    //         Pobl Technology Roadmap
    //       </h1>
    //       <p className="mt-6 text-lg leading-8 text-gray-600">
    //         The go to place to check out what the team is working on across the organisation here at Pobl. Please contact us if you would like to know more.
    //       </p>
    //       <div className="mt-10 flex items-center gap-x-6">
    //         <SignInBtn label='Get Started' />
    //         <div className='group'>
    //           <a href="https://support.poblgroup.co.uk" className="flex justify-start items-center gap-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-100">
    //             <p>Get in touch</p>
    //             <MoveRight className='w-4 h-4 group-hover:translate-x-1 transition-all' />
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
    //       <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
    //         <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
    //           <img
    //             src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
    //             alt="App screenshot"
    //             width={2432}
    //             height={1442}
    //             className="w-[60rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}
