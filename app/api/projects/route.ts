import { NextResponse } from "next/server";

export async function GET(req:any, res:any) {
    console.log('hit api')

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", "Basic Vk05RHhSZjl0aWVKQVptTzZZN2k6");

    // var requestOptions:RequestInit = {
    //     method: 'GET',
    //     headers: myHeaders,
    //     redirect: 'follow',
    //     cache: 'no-store'
    // };

    // const response = await fetch(`https://pobl.freshservice.com/api/v2/pm/projects?page=${page_number}&per_page=10}`, requestOptions)
    // const result = await response.json()
    // return NextResponse.json(result.projects)
};

// export async function GET(req: Request) {
//     let completed = false;
//     let page_number = 1;
//     let projects = []
//     let all_projects: any[] = []

//     while (!completed) {
//         try {
//             projects = await FetchProjects(page_number)
//             projects.map((project: Project) => all_projects.push(project))
//             const fetchMore = await CheckProjectCount(projects)
//             if(fetchMore) {
//                 page_number = page_number + 1
//                 projects = await FetchProjects(page_number)
//             } else {
//                 completed = true
//             }
//         } catch (error) {
//             console.log(`Error ${error}`)
//         }
//     }
    
//     const visibleProjects = all_projects.filter(x => x.custom_fields.visible_to_business == 'Yes')
//     return NextResponse.json(visibleProjects)
// };

const FetchProjects = async (page_number: number) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic Vk05RHhSZjl0aWVKQVptTzZZN2k6");

    var requestOptions:RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        cache: 'no-store'
    };

    const response = await fetch(`https://pobl.freshservice.com/api/v2/pm/projects?page=${page_number}&per_page=10}`, requestOptions)
    const result = await response.json()
    return result.projects
}

const CheckProjectCount = async (projects:any) => {
    if(projects.length === 10) {
        return true

    } else if(projects.length <= 10) {
        return false
    }
}