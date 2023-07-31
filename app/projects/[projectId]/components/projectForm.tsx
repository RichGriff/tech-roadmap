"use client"

import axios from "axios"
import { useState } from "react"
import { ArrowLeft, Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Heading } from '@/components/Heading'
import { Breadcrumb } from "./breadcrumb"


interface ProjectFormProps {
  initialData: Project;
};

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? initialData.name : 'No Project Found';
  const description = initialData ? 'Below are the exisiting tasks identified for the project.' : '';

  return (
    <>
      <div className="mb-8">
        <Breadcrumb project={initialData} />
      </div>
      <div className="flex items-center justify-start gap-4">
          {/* <Button variant={"outline"} size={"icon"} onClick={() => router.push('/')}>
            <ArrowLeft />
          </Button> */}
          <Heading title={title} description={description} />
        {/* {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )} */}
      </div>
      <Separator />
    </>
  );
};