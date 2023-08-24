'use client'

import React, { FC, useEffect, useMemo, useState } from 'react'
import { Heading } from '../../../components/Heading'
import { Separator } from '../../../components/ui/separator'
import { useRouter } from 'next/navigation'
import { DataTable } from '../../../components/ui/data-table'

import { columns } from "@/app/projects/components/columns";
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import { ProjectCard } from './project-card'
import { Input } from '@/components/ui/input'
import axios from 'axios'

interface ProjectsProps {
}

export const revalidate = 10;

export const ProjectList: FC<ProjectsProps> = ({ }) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('')
    const [data, setData] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchProjects = async () => {
        // const response = await fetch(`/api/projects`, {
        //     next: { revalidate: 0 },
        // });
        const response = await fetch(`/api/projects`);
        const result = await response.json();
        return result
        // const projects = await axios.get(`/api/projects`)
        // return projects
    }

    useEffect(() => {
        fetchProjects().then(result => {
            setData(result)
            setIsLoading(false)
        })
    }, [])

    function getFilteredList() {
        console.log(searchTerm)
        if (!searchTerm) {
            return data;
        }
        return data.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    var filteredList = useMemo(getFilteredList, [searchTerm, data]);

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Projects`} description="Below are a list of our current projects." />
            </div>
            <Separator />

            {isLoading ? (
                <p>Loading Projects...</p>
            ) : (
                <>
                <div id='data-grid' className='hidden md:block'>
                    <DataTable columns={columns} data={data} />
                </div>

                <div id='card-grid' className='flex flex-col justify-start items-start gap-4 md:hidden'>
                    <Input
                        placeholder="Search By Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-full"
                    />
                    {filteredList && filteredList.map((project:Project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
                </>
            )}
            
        </>
    )
}