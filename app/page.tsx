import { ProjectList } from "./projects/components/Projects";

export default async function Projects() {

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProjectList />
      </div>
    </div>
  )
}
