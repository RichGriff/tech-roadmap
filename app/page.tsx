import { getServerSession } from "next-auth";
import { ProjectList } from "./projects/components/Projects";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function Projects() {
  const session = await getServerSession(authOptions)

  if(!session || !session?.user) {
    redirect('/signin')
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProjectList />
      </div>
    </div>
  )
}
