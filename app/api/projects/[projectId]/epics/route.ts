import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET(req: Request | any, { params }: { params: { projectId: string } }) {
    const token = await getToken({ req })
    if(!token) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

    const projectId = parseInt(params.projectId)
    let completed = false;
    let page_number = 1;
    let epics = []
    let all_epics: any[] = []

    while (!completed) {
        try {
            epics = await FetchProjectEpicTasks(page_number, projectId)
            epics.map((epic: any) => all_epics.push(epic))
            const fetchMore = await CheckTaskCount(epics)
            if(fetchMore) {
                page_number = page_number + 1
                epics = await FetchProjectEpicTasks(page_number, projectId)
            } else {
                completed = true
            }
        } catch (error) {
            console.log(`Error ${error}`)
        }
    }

    const epicTasks = all_epics.filter(x => x.type_id == 2000312579)
    return NextResponse.json(epicTasks)
};

const FetchProjectEpicTasks = async (page_number: number, projectId: number) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic Vk05RHhSZjl0aWVKQVptTzZZN2k6");

    var requestOptions:RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        cache: 'no-store'
    };

    // const response = await fetch(`https://pobl.freshservice.com/api/v2/pm/projects/${id}/tasks/filter?query="type_id:${typeId}"&page=${page_number}&per_page=10`, requestOptions)
    const response = await fetch(`https://pobl.freshservice.com/api/v2/pm/projects/${projectId}/tasks?page=${page_number}&per_page=10`, requestOptions)
    const result = await response.json()
    return result.tasks
}

const CheckTaskCount = async (projects:any) => {
    if(projects.length === 10) {
        return true

    } else if(projects.length <= 10) {
        return false
    }
}