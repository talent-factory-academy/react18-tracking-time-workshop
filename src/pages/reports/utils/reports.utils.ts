import { ProjectActivities } from '../hooks/useReports';

export type ProjectWithData = {
  name: string,
  totalDuration: number,
  percentage: number
}

/**
 * Convert projects in {id, name, totalDuration, percentage}[]
 * @param projects: ProjectActivities[]
 * @return ProjectWithData[]
 */
export function getProjectsPercentage(projects: ProjectActivities[]): ProjectWithData[] {
  // convert in array of projects { id: number, name: string, totalDuration: 60 }
  const projectsWithTotalDuration = projects.map(project => {
    return {
      id: project.id,
      name: project.name,
      totalDuration: project.tracking.reduce((total, activity) => {
        // split hours and minutes from duration ("10:15"): result [10, 15]
        const [hours, minutes] = activity.duration.split(':')
        // calculate minutes
        const durationInMinutes = +minutes + (+hours * 60)
        // add current duration to accumulator
        return total + durationInMinutes;
      }, 0)
    }
  });

  // get the total duration of all activities
  const totalDuration = projectsWithTotalDuration
    .reduce((total, project) => total + project.totalDuration, 0)

  // create an array of projects with percentage {id, name, totalDuration, percentage}[]
  return projectsWithTotalDuration
    .map(project => ({
      ...project,
      percentage: +((project.totalDuration/totalDuration)*100).toFixed(0)
    }));
}
