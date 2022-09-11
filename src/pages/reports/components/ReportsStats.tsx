import axios from 'axios';
import { useEffect, useState } from 'react';
import { ChartPiePercentage } from '../../../shared/ChartPiePercentage';
import { ProjectActivities } from '../hooks/useReports';
import { getProjectsPercentage, ProjectWithData } from '../utils/reports.utils';
import { ProjectsList } from './ProjectsList';

export function ReportsStats () {
  const [projects, setProjects] = useState<ProjectWithData[]>([]);

  useEffect(() => {
    axios.get<ProjectActivities[]>('http://localhost:3000/projects?_embed=tracking')
      .then(res => {
        const data = getProjectsPercentage(res.data);
        setProjects(data);
      })
  }, [])

  // create the array of data with the percentage. i.e. [30, 20, 50]
  const chartPercentage = projects.map(item => item.percentage);
  // create the array of data with the labels. i.e. ['ACME', 'ABC', 'Another']
  const chartLabels = projects.map(item => item.name);

  return <div className="flex gap-10">
    <div className="w-1/2">
      <h1 className="my-8 text-3xl">Projects</h1>
      <ProjectsList data={projects} />
    </div>
    <div className="w-1/2">
      <ChartPiePercentage labels={chartLabels} data={chartPercentage}/>
    </div>
  </div>
}

