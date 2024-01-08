'use client'

import { Separator } from "@/components/ui/separator";
import { ProjectForm } from "./components/projectForm";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from 'date-fns'
import { Calendar, Contact2, Loader2 } from "lucide-react";
import { cleanDescription } from "@/lib/utils";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectHeaderSkeleton from "@/components/ui/project-header-skeleton";

// const fetchProjectSprints = async (id:number) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("Authorization", "Basic Vk05RHhSZjl0aWVKQVptTzZZN2k6");

//   var requestOptions: RequestInit = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
//   };

//   const response = await fetch(`https://pobl.freshservice.com/api/v2/pm/projects/${id}/sprints`, requestOptions)
//   const result = await response.json()
//   return result.sprints
// }

const ProjectDetail = ({ params }: { params: { projectId: number }}) => {
    const [project, setProject] = useState<Project>()
    const [projectEpicTasks, setProjectEpicTasks] = useState<any>([])
    const [projectTaskStatuses, setProjectTaskStatuses] = useState<any>([])

    // const project = await fetchProject(params.projectId)
    // const projectEpicTasks  = await fetchProjectEpicTasks(params.projectId, 2000312579)
    // const projectTaskStatuses = await fetchProjectStatuses(params.projectId)

    // const fetchProject = async (id:number) => {
    //   console.log('FETCH PROJECT', id)
    //   var myHeaders = new Headers();
    //   myHeaders.append("Content-Type", "application/json");
    //   myHeaders.append("Authorization", "Basic Vk05RHhSZjl0aWVKQVptTzZZN2k6");
  
    //   var requestOptions: RequestInit = {
    //     method: 'GET',
    //     headers: myHeaders,
    //     redirect: 'follow',
    //     cache: 'no-store'
    //   };
  
    //   const response = await fetch(`https://pobl.freshservice.com/api/v2/pm/projects/${id}`, requestOptions)
    //   const result = await response.json()
    //   return result.project
    // }
    
    // const fetchProjectEpicTasks = async (id:number, typeId:number) => {
    //   var myHeaders = new Headers();
    //   myHeaders.append("Content-Type", "application/json");
    //   myHeaders.append("Authorization", "Basic Vk05RHhSZjl0aWVKQVptTzZZN2k6");
    
    //   var requestOptions: RequestInit = {
    //     method: 'GET',
    //     headers: myHeaders,
    //     redirect: 'follow',
    //     cache: 'no-store'
    //   };
    
    //   const response = await fetch(`https://pobl.freshservice.com/api/v2/pm/projects/${id}/tasks/filter?query="type_id:${typeId}"`, requestOptions)
    //   const result = await response.json()
    //   return result.tasks
    // }

    const fetchProject = async (id:number) => {
      const response = await fetch(`/api/projects/${id}`);
      const result = await response.json();
      return result
    }

    const fetchProjectEpicTasks = async (id:number) => {
      const response = await fetch(`/api/projects/${id}/epics`);
      const result = await response.json();
      return result
    }

    const fetchProjectStatuses = async (id:number) => {
      const response = await fetch(`/api/projects/${id}/statuses`);
      const result = await response.json();
      return result
    }
    
    // const fetchProjectStatuses = async (id:number) => {
    //   var myHeaders = new Headers();
    //   myHeaders.append("Content-Type", "application/json");
    //   myHeaders.append("Authorization", "Basic Vk05RHhSZjl0aWVKQVptTzZZN2k6");
    
    //   var requestOptions: RequestInit = {
    //   method: 'GET',
    //   headers: myHeaders,
    //   redirect: 'follow',
    //     cache: 'no-store'
    //   };
    
    //   const response = await fetch(`https://pobl.freshservice.com/api/v2/pm/projects/${id}/task-statuses`, requestOptions)
    //   const result = await response.json()
    //   return result.task_statuses
    // }

    useEffect(() => {
      if(params.projectId) {
        fetchProject(params.projectId).then(project => setProject(project))
        fetchProjectEpicTasks(params.projectId).then(epics => setProjectEpicTasks(epics))
        fetchProjectStatuses(params.projectId).then(statuses => setProjectTaskStatuses(statuses))
      }
    },[params.projectId])
    
    //@ts-ignore
    projectEpicTasks.sort((a, b) => new Date(a.planned_end_date) - new Date(b.planned_end_date));
  
    return ( 
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <>
              {project ? (
                <ProjectForm initialData={project} />
              ) : (
                <ProjectHeaderSkeleton />
              )}
              {project ? (
                <>
                  {projectEpicTasks.length > 0 ? (
                    <>
                      <div id="task-table" className="hidden md:block">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="p-2">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Title</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead>Tech Delivery</TableHead>
                                  <TableHead>Start</TableHead>
                                  <TableHead>Estimated Completion Date</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                              {projectEpicTasks ? (
                              projectEpicTasks.map((task:any, index:number) => {
                                let ragColor
                                let val = projectTaskStatuses.filter((x:any) => x.id === task.status_id)[0] as any
                                switch (task.custom_fields.rag_rating) {
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
                                  <TableRow key={task.id}>
                                    <TableCell className="w-6/12">
                                      <div className="flex flex-col justify-start items-start">
                                        <div className="flex justify-start items-center gap-2 text-base font-medium">
                                          {task.title}
                                          <span className={`inline-block mx-2 w-3 h-3 rounded-full ${ragColor}`}></span>
                                        </div>
                                      </div>
                                      <div className="mt-3 text-sm text-slate-400">
                                        {cleanDescription(task.description)}
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <Badge className={`my-1 ${(val.name === 'Closed') ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-indigo-500 hover:bg-indigo-600'}`}>{(val.name === 'Closed') ? 'Completed' : val.name}</Badge>
                                    </TableCell>
                                    <TableCell>
                                      {(task.custom_fields.tech_delivery_partner != null) ? task.custom_fields.tech_delivery_partner : '-'}
                                    </TableCell>
                                    <TableCell>{(task.planned_start_date != null) ? format(new Date(task.planned_start_date), 'dd/MM/yyyy') : '-'}</TableCell>
                                    <TableCell>{(task.planned_end_date != null) ? format(new Date(task.planned_end_date), 'dd/MM/yyyy') : '-'}</TableCell>
                                  </TableRow>
                                )
                              }
                              )) : (
                                <TableCell><div className="text-slate-400">No Tasks Found.</div></TableCell>
                              )}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>

                      <div id="task-cards" className="flex flex-col justify-start items-start gap-4 md:hidden">

                        {projectEpicTasks ? (
                          projectEpicTasks.map((task:any, index:number) => {
                            let val = projectTaskStatuses.filter((x:any) => x.id === task.status_id)[0] as any
                            return (
                              <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                {(val.name === 'Open') ? (
                                  <Badge variant={"secondary"} className='mb-4'>{val.name}</Badge>
                                ) : (val.name === 'In Progress') ? (
                                  <Badge className='mb-4 bg-blue-500 hover:bg-blue-600'>{val.name}</Badge>
                                ) : (
                                  <Badge className='mb-4 bg-emerald-500 hover:bg-emerald-600'>{val.name}</Badge>
                                )}
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white hover:text-indigo-500">
                                    {task.title}
                                </h5>
                                <p className="mb-4 font-normal text-slate-600 dark:text-gray-400">
                                  {cleanDescription(task.description)}
                                </p>
                                <div className="space-y-4">
                                  <div className='flex justify-start items-center gap-3'>
                                      <Calendar className='w-4 h-4' />
                                      <p className='text-sm text-slate-600'>
                                      {(task.planned_start_date != null) ? format(new Date(task.planned_start_date), 'dd/MM/yyyy') : '-'} 
                                      - 
                                      {(task.planned_end_date != null) ? format(new Date(task.planned_end_date), 'dd/MM/yyyy') : '-'}
                                      </p>
                                  </div>
                                  {project && project.custom_fields.tech_delivery_partner ? (
                                  <div className='flex justify-start items-center gap-3'>
                                      <Contact2 className='w-4 h-4' />
                                      <p className='text-sm text-slate-600'>
                                          Tech Delivery: {project.custom_fields.tech_delivery_partner}
                                      </p>
                                  </div>) : null}
                                </div>
                              </div>
                            )
                          }
                          )) : (
                            <p>No Tasks Found</p>
                          )}

                      </div>
                    </>
                  ) : (
                    <p className="flex justify-start items-center gap-2 text-slate-400"><Loader2 className="w-4 h-4 animate-spin"/>Fetching Project Epics</p>
                  )}
                </>
              ) : null }
            </>
        </div>
      </div>
    );
  }
  
  export default ProjectDetail;
  