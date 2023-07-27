'use client'

import React, { FC } from 'react'
import { Heading } from '../../../components/Heading'
import { Button } from '../../../components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '../../../components/ui/separator'
import { useRouter } from 'next/navigation'
import { DataTable } from '../../../components/ui/data-table'

import { columns } from "@/app/projects/components/columns";

interface ProjectsProps {
    data: Project[]
}

type Project = {
    id: number,
    name: string,
    key: string,
    description: string,
    status_id: number,
    priority_id: number,
    sprint_duration: number,
    project_type: number,
    start_date: string,
    end_date: string,
    archived: false,
    visibility: number,
    manager_id: number,
    created_at: string,
    updated_at: string,
    custom_fields: any
  }

export const ProjectList: FC<ProjectsProps> = ({ data }) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
            <Heading title={`Projects`} description="Below are a list of our current projects." />
            {/* <Button onClick={() => router.push(`/`)}>
                <Plus className="mr-2 h-4 w-4" /> Add New
            </Button> */}
            </div>
            <Separator />
            <DataTable columns={columns} data={data} />
        </>
    )
}