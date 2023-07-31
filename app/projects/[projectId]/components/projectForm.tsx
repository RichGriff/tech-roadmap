"use client"

import axios from "axios"
import { useState } from "react"
import { ArrowLeft, Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Heading } from '@/components/Heading'


interface ProjectFormProps {
  initialData: Project;
};

type Project = {
    id: number,
    name: string,
    key: string,
    description: null,
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

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? initialData.name : 'No Project Found';
  const description = initialData ? 'Project detail below including tasks and sprints.' : 'Add a new billboard';
//   const toastMessage = initialData ? 'Billboard updated.' : 'Billboard created.';
//   const action = initialData ? 'Save changes' : 'Create';

//   const onSubmit = async (data: BillboardFormValues) => {
//     try {
//       setLoading(true);
//       if (initialData) {
//         await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
//       } else {
//         await axios.post(`/api/${params.storeId}/billboards`, data);
//       }
//       router.refresh();
//       router.push(`/${params.storeId}/billboards`);
//       toast.success(toastMessage);
//     } catch (error: any) {
//       toast.error('Something went wrong.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onDelete = async () => {
//     try {
//       setLoading(true);
//       await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
//       router.refresh();
//       router.push(`/${params.storeId}/billboards`);
//       toast.success('Billboard deleted.');
//     } catch (error: any) {
//       toast.error('Make sure you removed all categories using this billboard first.');
//     } finally {
//       setLoading(false);
//       setOpen(false);
//     }
//   }

  return (
    <>
     <div className="flex items-center justify-start gap-4">
          <Button variant={"outline"} size={"icon"} onClick={() => router.push('/')}>
            <ArrowLeft />
          </Button>
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