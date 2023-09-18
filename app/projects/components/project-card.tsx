import { Badge } from '@/components/ui/badge'
import { cleanDescription } from '@/lib/utils'
import { Calendar, Contact2 } from 'lucide-react'
import Link from 'next/link'
import React, { FC } from 'react'

interface ProjectCardProps {
  project: Project
}

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="min-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Badge className='mb-4'>In Progress</Badge>
        <Link href={`/projects/${project.id}`}>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white hover:text-indigo-500">
                {project.name}
            </h5>
        </Link>
        <p className="mb-4 font-normal text-slate-600 dark:text-gray-400">
          {cleanDescription(project.description)} 
        </p>
        <div className='space-y-4'>
        <div className='flex justify-start items-center gap-3'>
            <Calendar className='w-4 h-4' />
            <p className='text-sm text-slate-600'>
                {project.start_date} - {project.end_date}
            </p>
        </div>
        {project.custom_fields.business_owner && (
        <div className='flex justify-start items-center gap-3'>
            <Contact2 className='w-4 h-4' />
            <p className='text-sm text-slate-600'>
                Business Owner: {project.custom_fields.business_owner}
            </p>
        </div>
        )}
        </div>
    </div>
  )
}