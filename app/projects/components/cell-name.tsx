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
import { cleanDescription } from "@/lib/utils";


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
  let ragColor = 'bg-slate-200'

  switch (data.custom_fields.rag_rating) {
    case 'Green':
      ragColor = 'bg-emerald-500'
      break;
    case 'Amber':
      ragColor = 'bg-amber-400'
      break;
    case 'Red':
      ragColor = 'bg-red-500'
      break;
    default:
      ragColor = 'bg-slate-200'
      break;
  }
  
  return (
    <div className="flex flex-col justify-start items-start gap-4 max-w-xl">
      <div className="">
        <Link href={`/projects/${data.id}`} className="hover:text-indigo-500 font-medium text-[1rem]">
          {data.name}
        </Link>
        <span className={`inline-block mx-4 w-3 h-3 rounded-full ${ragColor}`}></span>
      </div>
      <div className="text-slate-600">
        {data.description && (
          cleanDescription(data.description)
          // <TooltipProvider>
          //   <Tooltip>
          //     <TooltipTrigger><InfoIcon className="w-4 h-4 text-slate-400 hover:text-indigo-500" /></TooltipTrigger>
          //     <TooltipContent sideOffset={12} className="w-80 ml-10">
          //       <p>{formattedDesc}</p>
          //     </TooltipContent>
          //   </Tooltip>
          // </TooltipProvider>
        )}
      </div>
    </div>
  );
};