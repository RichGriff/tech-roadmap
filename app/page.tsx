const fetchProjects = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Basic Vk05RHhSZjl0aWVKQVptTzZZN2k6");

  var requestOptions:RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch(`https://pobl.freshservice.com/api/v2/pm/projects`, requestOptions)
  const result = await response.json()
  return result.projects
}

export default async function Home() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2>Summary</h2>
      </div>
    </div>
  )
}
