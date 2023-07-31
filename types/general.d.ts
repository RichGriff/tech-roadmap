type Project = {
    id: number,
    name: string,
    key: string,
    description: string,
    status_id: number,
    priority_id: number,
    sprint_duration: number,
    project_type: number,
    start_date: string,
    end_date: string,
    archived: false,
    visibility: number,
    manager_id: number,
    created_at: string,
    updated_at: string,
    custom_fields: any
}