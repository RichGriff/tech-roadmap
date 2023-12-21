"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CellAction } from "./cell-action"
import { CellName } from "./cell-name"
import { format } from "date-fns"

export type ProjectColumns = {
  id: number
  title: string
  description: string
  status_id: number,
  planned_start_date: string
  planned_end_date: string
  custom_fields: {
    rag_rating: string,
    business_owner: string,
    tech_delivery_lead: string,
    specific_project_status: string,
  }
}

export const columns: ColumnDef<ProjectColumns>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <CellName data={row.original} />
  },
  {
    header: "Status",
    id: "status",
    cell: ({ row }) => {
        const project = row.original
        let label = (project.custom_fields.specific_project_status === 'Closed') ? 'Completed' : project.custom_fields.specific_project_status
        // {(project.status_id) === 1 ?
        //   label = 'Not Started' 
        //   : (project.status_id === 2) ? 
        //   label = 'In Progress'
        //   : 
        //   label = 'Complete'
        // }

        /* 
          Backlog - grey
          Requirements Gathering - teal
          In Progress - indigo
          In Pre-Release CAB - indigo
          Closed/Completed - emerald 
          Blocked - rose
          Rejected - rose
          On Hold - amber
        */

        return (
          <Badge
            className={`${ 
              (label === 'Requirements gathering') ? 'bg-teal-500 hover:bg-teal-600' : 
              (label === 'In Progress' || label === 'In Pre-Release CAB') ? 'bg-indigo-500 hover:bg-indigo-600' : 
              (label === 'Completed') ? 'bg-emerald-500 hover:bg-emerald-600' : 
              (label === 'Blocked' || label === 'Rejected') ? 'bg-rose-500 hover:bg-rose-600' :
              (label === 'On hold') ? 'bg-amber-500 hover:bg-amber-600' : 
              'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}  
          >
            {label}
          </Badge>
        )
    }
  }, 
  {
    accessorKey: "tech_delivery_lead",
    header: "Delivery Partner",
    cell: ({ row }) => { return row.original.custom_fields.tech_delivery_lead}
  },
  {
    accessorKey: "planned_start_date",
    header: ({ column }) => {
        return (
          <a
            className="flex justify-start items-center hover:cursor-pointer hover:text-black transition-all"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Start Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </a>
        )
      },
    cell: ({ row }) => {
      const project = row.original
      return (format(new Date(project.planned_start_date), 'dd/MM/yyyy'))
    }
  }, 
  {
    accessorKey: "planned_end_date",
    header: ({ column }) => {
        return (
          <a
            className="flex justify-start items-center hover:cursor-pointer hover:text-black transition-all"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Estimated Completion Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </a>
        )
      },
    cell: ({ row }) => {
      const project = row.original
      return (format(new Date(project.planned_end_date), 'dd/MM/yyyy'))
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
