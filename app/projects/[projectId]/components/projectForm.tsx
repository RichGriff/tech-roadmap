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
  const description = initialData ? initialData.description : '';
  const sponsor = initialData ? initialData.custom_fields.business_owner : ''
  const partner = initialData ? initialData.custom_fields.tech_delivery_lead : ''

  return (
    <>
      <div className="mb-8">
        <Breadcrumb project={initialData} />
      </div>
      <div className="flex flex-col items-start justify-start gap-4">
          <Heading title={title} description={description} sponsor={sponsor} partner={partner} />
      </div>
      <Separator />
    </>
  );
};