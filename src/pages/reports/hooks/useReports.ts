import axios from 'axios';
import { useEffect, useState } from 'react';
import { Activity } from '../../../model/activity';
import { Project } from '../../../model/project';

export type ProjectActivities = { id: number, name: string, tracking: Activity[] }

export function useReports() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<ProjectActivities | null>(null);

  useEffect(() => {
    // load all projects
    axios.get<Project[]>(`http://localhost:3000/projects`)
      .then(res => setProjects(res.data));
  }, [])

  function loadActivitiesByProject(projectId: number) {
    if (projectId === -1) {
      setProject(null)
    }  else {
      axios.get<ProjectActivities>(`http://localhost:3000/projects/${projectId}?_embed=tracking`)
        .then(res => {
          setProject(res.data);
        })
    }
  }

  return {
    project, projects,
    actions: {
      loadActivitiesByProject,
    }
  }
}
