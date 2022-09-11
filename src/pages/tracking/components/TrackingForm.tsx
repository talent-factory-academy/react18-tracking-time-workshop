import clsx from 'clsx';
import { useState } from 'react';
import { Activity } from '../../../model/activity';
import { Project } from '../../../model/project';

export type FormType = Omit<Activity, 'id' | 'project'>;

interface TrackingFormProps {
  projects: Project[];
  onAdd: (formData: FormType) => void;
}

const initialState: FormType = { description: '', date: '', duration: 0, projectId: -1}

const TrackingForm = (props: TrackingFormProps) => {
  const [formData, setFormData] = useState<FormType>(initialState);

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    console.log(e.target.type)
    const type = e.target.type;
    const name = e.target.name;
    const value = e.target.value;

    setFormData(s => ({
      ...s,
      [name]: type === 'select-one' ? +value : value
    }))
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.onAdd(formData);
  }

  // NEW: validators
  const isDescriptionValid = formData.description.length > 5;
  const isDateValid = formData.date !== '';
  const isDurationValid = formData.duration !== 0;
  const isProjectValid = formData.projectId !== -1
  const isFormValid = isDescriptionValid && isDateValid && isDurationValid && isProjectValid;

  // NEW: Update all form controls to handle errors and disable button if form is invalid
  return <form className="flex flex-col gap-1" onSubmit={submitHandler}>
    {/*NEW*/}
    <input
      type="text" placeholder="description"
      className={clsx('w-full', {'input-error': !isDescriptionValid })}
      name="description" onChange={onChangeHandler}
    />
    <div className="flex">
      {/*NEW*/}
      <input type="datetime-local" name="date" onChange={onChangeHandler}
             className={clsx({'input-error': !isDateValid })} />
      <input type="time"  name="duration" onChange={onChangeHandler}
             className={clsx({'input-error': !isDurationValid })} />
      <select  name="projectId" onChange={onChangeHandler}
               className={clsx({'input-error': !isProjectValid })} >
        <option value={-1}>Select a Project</option>
        {
          props.projects.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))
        }
      </select>
      {/*NEW*/}
      <button
        className="bg-sky-300 px-4 hover:bg-sky-400 transition disabled:opacity-50"
        disabled={!isFormValid}>CONFIRM</button>
    </div>


  </form>
};
export default TrackingForm;
