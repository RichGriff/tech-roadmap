"use client";

import { useParams, useRouter } from "next/navigation";

import { ProjectColumns } from "./columns";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react";
import Link from "next/link";


interface CellActionProps {
  data: ProjectColumns;
}

export const CellName: React.FC<CellActionProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const regex = /(<([^>]+)>)/ig;
  const formattedDesc = data.description?.replace(regex, '');
  
  return (
    <div className="flex justify-start items-center gap-4">
      <Link href={`/projects/${data.id}`} className="hover:text-indigo-500 font-medium">
        {data.name}
      </Link>
      {data.description && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><InfoIcon className="w-4 h-4 text-slate-400 hover:text-indigo-500" /></TooltipTrigger>
            <TooltipContent sideOffset={12} className="w-80 ml-10">
              <p>{formattedDesc}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};