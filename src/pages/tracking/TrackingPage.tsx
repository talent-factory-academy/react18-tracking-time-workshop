import TrackingForm, { FormType } from './components/TrackingForm';
import { TrackingList } from './components/TrackingList';
import { useTracking } from './hooks/useTracking';

const TrackingPage = () => {
  const {
    activities, projects, actions
  } = useTracking();

  return <div className="max-w-screen-lg mx-auto ">
    <TrackingForm
      projects={projects}
      onAdd={actions.addActivity}
    />

    <TrackingList
      activities={activities}
      onEdit={actions.editActivity}
      onDelete={actions.deleteActivity}
    />
  </div>
};

export default TrackingPage;
