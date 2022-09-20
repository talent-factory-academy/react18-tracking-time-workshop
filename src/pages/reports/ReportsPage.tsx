import React, { useState } from 'react';
import { ReportsActivities } from './components/ReportsActivities';
import { ReportFilters } from './components/ReportsFilters';
import { ReportsStats } from './components/ReportsStats';
import { useReports } from './hooks/useReports';

const ReportsPage = () => {
  const { project, projects, actions } = useReports();
  const [duration, setDuration] = useState<number>(-1);

  return <div className="max-w-screen-lg mx-auto">
    <ReportFilters
      projects={projects}
      onSelectProject={actions.loadActivitiesByProject}
      onSelectDuration={setDuration}
    />

    {
      project ?
        <ReportsActivities project={project} duration={duration}/> :
        <div>You need to select a project to see reports</div>
    }

    <ReportsStats />

  </div>
};

export default ReportsPage;
