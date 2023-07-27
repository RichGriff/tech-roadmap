'use client'

import { cn } from '@/lib/utils';
import { GitBranchIcon } from 'lucide-react';
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'

export function MainNav({ className, ...props} : React.HtmlHTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
          href: `/`,
          label: 'Overview',
          active: pathname === `/`,
        },
        {
            href: `/projects`,
            label: 'Projects',
            active: pathname === `/projects`,
          },
        {
            href: `/tasks`,
            label: 'Tasks',
            active: pathname === `/tasks`,
          }
      ]

    return (
        <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        {...props}
    >
        <div className='flex justify-start items-center gap-2'>
            <GitBranchIcon className='w-5 h-5 font-medium text-indigo-700' />
            <h2 className='font-semibold text-md text-indigo-600'>Technology Roadmap</h2>
        </div>
        {/* {routes.map((route) => (
        <Link
            key={route.href}
            href={route.href}
            className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
            )}
        >
            {route.label}
        </Link>
        ))} */}
    </nav>
    )
}