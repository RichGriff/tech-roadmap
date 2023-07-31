'use client'

import React, { FC } from 'react'
import { Heading } from '../../../components/Heading'
import { Separator } from '../../../components/ui/separator'
import { useRouter } from 'next/navigation'
import { DataTable } from '../../../components/ui/data-table'

import { columns } from "@/app/projects/components/columns";

interface ProjectsProps {
    data: Project[]
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