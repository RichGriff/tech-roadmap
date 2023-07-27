"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Copy, Eye, ListTodo, MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { CellAction } from "./cell-action"
import { CellName } from "./cell-name"
import { format } from "date-fns"

export type ProjectColumns = {
  id: number
  name: string
  description: string
  status_id: number,
  start_date: string
  end_date: string
}

export const columns: ColumnDef<ProjectColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <CellName data={row.original} />
  }, 
  {
    header: "Status",
    id: "status",
    cell: ({ row }) => {
        const project = row.original
        let label = ''
        {(project.status_id) === 1 ?
          label = 'Not Started' 
          : (project.status_id === 2) ? 
          label = 'In Progress'
          : 
          label = 'Complete'
        }
        return (
          <Badge
            className={`${(label === 'In Progress') ? 'bg-blue-500' : (label === 'Complete') ? 'bg-emerald-500' : 'bg-slate-200 text-slate-600'}`}  
          >
            {label}
          </Badge>
        )
    }
  }, 
  {
    accessorKey: "start_date",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Start Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
      const project = row.original
      return (format(new Date(project.start_date), 'dd/MM/yyyy'))
    }
  }, 
  {
    accessorKey: "end_date",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            End Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
      const project = row.original
      return (format(new Date(project.end_date), 'dd/MM/yyyy'))
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
