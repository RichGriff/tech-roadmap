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
import { Calendar, Contact2 } from "lucide-react";
import { cleanDescription } from "@/lib/utils";

const fetchProject = async (id:number) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic Vk05RHhSZjl0aWVKQVptTzZZN2k6");

    var requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      cache: 'no-store'
    };

    const response = await fetch(`https://pobl.freshservice.com/api/v2/pm/projects/${id}`, requestOptions)
    const result = await response.json()
    return result.project
}

const fetchProjectEpicTasks = async (id:number, typeId:number) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Basic Vk05RHhSZjl0aWVKQVptTzZZN2k6");

  var requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
    cache: 'no-store'
  };

  const response = await fetch(`https://pobl.freshservice.com/api/v2/pm/projects/${id}/tasks/filter?query="type_id:${typeId}"`, requestOptions)
  const result = await response.json()
  return result.tasks
}

const fetchProjectStatuses = async (id:number) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Basic Vk05RHhSZjl0aWVKQVptTzZZN2k6");

  var requestOptions: RequestInit = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
    cache: 'no-store'
  };

  const response = await fetch(`https://pobl.freshservice.com/api/v2/pm/projects/${id}/task-statuses`, requestOptions)
  const result = await response.json()
  return result.task_statuses
}

const fetchProjectSprints = async (id:number) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Basic Vk05RHhSZjl0aWVKQVptTzZZN2k6");

  var requestOptions: RequestInit = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
  };

  const response = await fetch(`https://pobl.freshservice.com/api/v2/pm/projects/${id}/sprints`, requestOptions)
  const result = await response.json()
  return result.sprints
}

const ProjectDetail = async ({ params }: { params: { projectId: number }}) => {
    const project = await fetchProject(params.projectId)
    const projectEpicTasks  = await fetchProjectEpicTasks(params.projectId, 2000312579)
    const projectTaskStatuses = await fetchProjectStatuses(params.projectId)
  
    return ( 
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <>
            <ProjectForm initialData={project} />

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
                        <TableHead>End</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {projectEpicTasks ? (
                    projectEpicTasks.map((task:any, index:number) => {
                      let ragColor
                      let val = projectTaskStatuses.filter((x:any) => x.id === task.status_id)
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
                              {/* <Badge className="my-1 bg-indigo-500 hover:bg-indigo-600">Epic</Badge> */}
                              <div className="flex justify-start items-center gap-2 text-base font-medium">
                                {task.title}
                                {/* <span className="text-slate-400 text-xs">({task.display_key})</span> */}
                                <span className={`inline-block mx-2 w-3 h-3 rounded-full ${ragColor}`}></span>
                              </div>
                            </div>
                            <div className="mt-3 text-sm text-slate-400">
                              {cleanDescription(task.description)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="my-1 bg-indigo-500 hover:bg-indigo-600">{val[0].name}</Badge>
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
                {/* <div className="p-2">
                  <p className="text-sm text-muted-foreground mb-4">Project Sprints</p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>Start</TableHead>
                        <TableHead>End</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {projectSprints ? (
                    projectSprints.map((sprint:any, index:number) => (
                      <TableRow key={sprint.id}>
                        <TableCell>
                          <div className="flex flex-col justify-start items-start">
                            {sprint.title}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col justify-start items-start">
                            {sprint.state == 1 ? 
                            <Badge className="my-1 bg-slate-500 hover:bg-slate-600">Pending</Badge> 
                            : 
                            sprint.state == 2 ? 
                            <Badge className="my-1 bg-blue-500 hover:bg-blue-600">Active</Badge> 
                            : 
                            <Badge className="my-1 bg-emerald-500 hover:bg-emerald-600">Completed</Badge>
                            }
                            
                          </div>
                        </TableCell>
                        <TableCell>{(sprint.planned_start_date != null) ? format(new Date(sprint.planned_start_date), 'MM/dd/yyyy') : '-'}</TableCell>
                        <TableCell>{(sprint.planned_end_date != null) ? format(new Date(sprint.planned_end_date), 'MM/dd/yyyy') : '-'}</TableCell>
                      </TableRow>
                    ))
                    ) : (
                      <TableCell><div className="text-slate-400">No Tasks Found.</div></TableCell>
                    )}
                    </TableBody>
                  </Table>
                </div> */}
              </div>
            </div>

            <div id="task-cards" className="flex flex-col justify-start items-start gap-4 md:hidden">

              {projectEpicTasks ? (
                projectEpicTasks.map((task:any, index:number) => {
                  let val = projectTaskStatuses.filter((x:any) => x.id === task.status_id)
                  return (
                    <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      {(val[0].name === 'Open') ? (
                        <Badge variant={"secondary"} className='mb-4'>{val[0].name}</Badge>
                      ) : (val[0].name === 'In Progress') ? (
                        <Badge className='mb-4 bg-blue-500 hover:bg-blue-600'>{val[0].name}</Badge>
                      ) : (
                        <Badge className='mb-4 bg-emerald-500 hover:bg-emerald-600'>{val[0].name}</Badge>
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
                        {project.custom_fields.tech_delivery_partner && (
                        <div className='flex justify-start items-center gap-3'>
                            <Contact2 className='w-4 h-4' />
                            <p className='text-sm text-slate-600'>
                                Tech Delivery: {project.custom_fields.tech_delivery_partner}
                            </p>
                        </div>)}
                      </div>
                    </div>
                  )
                }
                )) : (
                  <p>No Tasks Found</p>
                )}

            </div>
          </>
        </div>
      </div>
    );
  }
  
  export default ProjectDetail;
  