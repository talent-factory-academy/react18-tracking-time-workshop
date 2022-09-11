import { ProjectWithData } from '../utils/reports.utils';

interface ReportsListProps {
  data: ProjectWithData[]
}

export function ProjectsList(props: ReportsListProps) {
  return <div className="mt-4">
    {
      props.data.map(project => {
        return (
          <div className="flex justify-between" key={project.name}>
            <div className="font-bold">{project.name}</div>
            <div>{project.totalDuration} mins ({project.percentage} %)</div>
          </div>
        )
      })
    }
  </div>
}
