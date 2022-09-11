import React from 'react';
import { Project } from '../../../model/project';

interface ReportFiltersProps {
  projects: Project[];
  onSelectProject: (projectId: number) => void;
  onSelectDuration: (duration: number) => void;
}

export function ReportFilters (props: ReportFiltersProps) {
  return (
    <div className="mb-3">
      <select onChange={e => props.onSelectProject(+e.currentTarget.value)}>
        <option value="-1">Select a Project</option>
        {
          props.projects.map(p => <option value={p.id} key={p.id}>{p.name}</option>)
        }
      </select>

      <select onChange={e => props.onSelectDuration(+e.currentTarget.value)}>
        <option value="-1">Duration</option>
        <option value="30">less than 30 min</option>
        <option value="60">1 hour</option>
        <option value="120">2 hours</option>
        <option value="240">4 hours</option>
      </select>
    </div>
  )
};

