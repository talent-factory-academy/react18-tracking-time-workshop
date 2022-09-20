import React from 'react';
import { ProjectActivities } from '../hooks/useReports';

interface ReportsActivitiesProps {
  project: ProjectActivities;
  duration: number
}

export function ReportsActivities (props: ReportsActivitiesProps) {

  const filteredProject = props.project &&
    {
      ...props.project,
      tracking:  props.duration === -1 ?
        props.project?.tracking :
        props.project?.tracking.filter(p => {
          const [hours, minutes] = p.duration.split(':')
          const durationInMinutes = +minutes + (+hours * 60)
          return durationInMinutes <= props.duration
        })
    }

  return (
    <div>
      {
        filteredProject?.tracking.map(a => {
          return <div key={a.id} className="flex gap-2 my-8 border-b justify-between">
            <div>{a.description}</div>
            <div>{a.duration}</div>
            <div>{a.date}</div>
          </div>
        })
      }
    </div>

  )
};

