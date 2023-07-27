"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { ProjectColumns } from "./columns";
import { useState } from "react";
import { Copy, Eye, ListTodo, MoreHorizontal } from "lucide-react";

interface CellActionProps {
  data: ProjectColumns;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

//   const onConfirm = async () => {
//     try {
//       setLoading(true);
//       await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
//       toast.success('Billboard deleted.');
//       router.refresh();
//     } catch (error) {
//       toast.error('Make sure you removed all categories using this billboard first.');
//     } finally {
//       setOpen(false);
//       setLoading(false);
//     }
//   };

//   const onCopy = (id: string) => {
//     navigator.clipboard.writeText(id);
//     toast.success('Billboard ID copied to clipboard.');
//   }

  return (
    <>
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.name)}
            >
              <Copy className="w-4 h-4 mr-2"/>Copy Project Name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push(`/projects/${data.id}`)} >
                <Eye className="mr-2 h-4 w-4" /> View Detail
            </DropdownMenuItem>
            <DropdownMenuItem><ListTodo className="w-4 h-4 mr-2"/>View Tasks</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </>
  );
};