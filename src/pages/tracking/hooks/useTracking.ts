import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { Activity } from '../../../model/activity';
import { Project } from '../../../model/project';
import { FormType } from '../components/TrackingForm';
import { activitiesReducer } from '../store/activities.store';
import { projectsReducer } from '../store/projects.store';

export function useTracking() {

  const [projects, projectsDispatch] = useReducer(projectsReducer, [])
  const [activities, activitiesDispatch] = useReducer(activitiesReducer, [])

  useEffect(() => {
    Promise.all([
      axios.get<Project[]>('http://localhost:3000/projects'),
      axios.get<Activity[]>('http://localhost:3000/tracking?_expand=project')
    ]).then(res => {
      const [projects, activities] = res;
      console.log(projects.data)
      console.log(activities.data)

      projectsDispatch({ type: 'init', payload: projects.data })
      activitiesDispatch({ type: 'init', payload: activities.data })
    })
  }, []);

  function addActivity(formData: FormType) {
    // save the new activity on database
    // it returns an activity without the project info (because the JsonServer API works in this way :(
    axios.post<Omit<Activity, 'project'>>('http://localhost:3000/tracking', formData)
      .then(newActivity => {
        console.log(newActivity)
        // so we need get the current activity with `project` info too
        axios.get<Activity>(`http://localhost:3000/tracking/${newActivity.data.id}?_expand=project`)
          .then(activity => {
            console.log(activity)
            activitiesDispatch({ type: 'add', payload: activity.data})
          })
      })
  }

  function deleteActivity(id: number) {
    axios.delete(`http://localhost:3000/tracking/${id}`)
      .then(() => {
        activitiesDispatch({ type: 'remove', payload: id})
      })
  }

  function editActivity(id: number, description: string) {
    axios.patch<Activity>(`http://localhost:3000/tracking/${id}`, { description })
      .then((activity) => {
        activitiesDispatch({ type: 'edit', payload: activity.data})
      })
  }

  return {
    activities,
    projects,
    actions: {
      addActivity,
      editActivity,
      deleteActivity
    }
  }

}
