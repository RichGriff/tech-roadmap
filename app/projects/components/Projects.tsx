'use client'

import React, { FC, useEffect, useMemo, useState } from 'react'
import { Heading } from '../../../components/Heading'
import { Separator } from '../../../components/ui/separator'
import { useRouter } from 'next/navigation'
import { DataTable } from '../../../components/ui/data-table'

import { columns } from "@/app/projects/components/columns";
import { ProjectCard } from './project-card'
import { Input } from '@/components/ui/input'

interface ProjectsProps {
}

type SearchTerm = {
    name?: string,
    businessOwner?: string,
    techDelivery?: string,
    status?: string
}

export const revalidate = 10;

export const ProjectList: FC<ProjectsProps> = ({ }) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<SearchTerm>()
    const [data, setData] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchProjects = async () => {
        const response = await fetch(`/api/projects`);
        const result = await response.json();
        return result
    }

    useEffect(() => {
        fetchProjects().then(result => {
            setData(result)
            setIsLoading(false)
        })
    }, [])

    function getFilteredList() {
        let filteredData

        if (!searchTerm) {
            return data;
        }

        if(searchTerm.name) {
            filteredData = data.filter((item) => item.name.toLowerCase().includes(searchTerm.name?.toLowerCase()!))
        } else {
            filteredData = data.filter((item) => {
                // const statusCondition = searchTerm.status
                //     ? item.status_id === parseInt(searchTerm.status)
                //     : true; // If searchTerm.status is not defined, don't filter by status
                const statusCondition = searchTerm.status
                    ? item.custom_fields.specific_project_status?.toLowerCase() === searchTerm.status.toLowerCase()
                    : true; // If searchTerm.businessOwner is not defined, don't filter by businessOwner

                const businessOwnerCondition = searchTerm.businessOwner
                    ? item.custom_fields.business_owner?.toLowerCase().includes(searchTerm.businessOwner.toLowerCase())
                    : true; // If searchTerm.businessOwner is not defined, don't filter by businessOwner
                
                const techDeliveryCondition = searchTerm.techDelivery
                    ? item.custom_fields.tech_delivery_lead?.toLowerCase().includes(searchTerm.techDelivery.toLowerCase())
                    : true; // If searchTerm.techDelivery is not defined, don't filter by techDelivery
                
                // Return true if all conditions are met (logical AND)
                return statusCondition && businessOwnerCondition && techDeliveryCondition;
            });
        }

        return filteredData
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
                    <DataTable columns={columns} data={filteredList} setSearchTerm={setSearchTerm} getFilteredList={getFilteredList} />
                </div>

                <div id='card-grid' className='flex flex-col justify-start items-start gap-4 md:hidden'>
                    <Input
                        placeholder="Search By Name"
                        value={searchTerm?.name}
                        onChange={(e) => setSearchTerm({ name: e.target.value })}
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