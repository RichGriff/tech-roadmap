'use client'

import React, { FC } from 'react'
import { Heading } from '../../../components/Heading'
import { Separator } from '../../../components/ui/separator'
import { useRouter } from 'next/navigation'
import { DataTable } from '../../../components/ui/data-table'

import { columns } from "@/app/projects/components/columns";
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import { ProjectCard } from './project-card'

interface ProjectsProps {
    data: Project[]
}

export const ProjectList: FC<ProjectsProps> = ({ data }) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Projects`} description="Below are a list of our current projects." />
            </div>
            <Separator />

            <div id='data-grid' className='hidden md:block'>
                <DataTable columns={columns} data={data} />
            </div>

            <div id='card-grid' className='flex flex-col justify-start items-start gap-4 md:hidden'>
                {data && data.map((project:Project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </>
    )
}