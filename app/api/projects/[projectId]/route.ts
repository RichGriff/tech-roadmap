import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET(req: Request | any, { params }: { params: { projectId: string } }) {
  const token = await getToken({ req })
  if(!token) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const projectId = parseInt(params.projectId)
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Basic Vk05RHhSZjl0aWVKQVptTzZZN2k6");

  var requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
    cache: 'no-store'
  };

  const response = await fetch(`https://pobl.freshservice.com/api/v2/pm/projects/${projectId}`, requestOptions)
  const result = await response.json()
  return NextResponse.json(result.project)
}