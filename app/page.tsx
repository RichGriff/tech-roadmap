import axios from "axios";
import { ProjectList } from "./projects/components/Projects";


export default async function Projects() {
  // const { data } = await axios.get(`${process.env.API_URL}/api/projects`)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProjectList />
      </div>
    </div>
  )
}
