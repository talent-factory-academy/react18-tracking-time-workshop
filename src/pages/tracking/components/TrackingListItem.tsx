import { useState } from 'react';
import { Activity } from '../../../model/activity';
import { HumanDate, Tag, TimesAgo } from '../../../shared';

interface TrackingListItemProps {
  activity: Activity;
  onEdit: (text: string) => void;
  onDelete: (id: number) => void;
}

export default function TrackingListItem (props: TrackingListItemProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return isCollapsed ?
    <div onClick={() => setIsCollapsed(false)}>
      <Preview activity={props.activity} />
    </div> :
    <div>
      <Edit
        activity={props.activity}
        onConfirm={text => {
          props.onEdit(text);
          setIsCollapsed(true)
        }}
        onDelete={() => {
          props.onDelete(props.activity.id)
        }}
      />
    </div>
}

/**
 * Preview Component
 */
export function Preview (props: {  activity: Activity }) {
  const { activity: a } = props;
  return (
    <div
      className="flex justify-between items-center border-b p-4"
      key={a.id}
    >
      <div className="w-3/5">
        <div>{a.description}</div>
        <Tag>{a.project.name}</Tag>
      </div>
      <div className="w-1/5">
        <HumanDate value={a.date} /> <br/>
        <TimesAgo value={a.date} />
      </div>
      <div className="w-1/5 text-right">{a.duration} mins</div>
    </div>
  )
};

/**
 * Edit Component
 */
interface EditProps {
  activity: Activity;
  onConfirm: (text: string) => void;
  onDelete: () => void;
}

function Edit (props: EditProps) {
  const [description, setDescription] = useState(props.activity.description);

  return <form className="m-4" onSubmit={e => {
    e.preventDefault();
    props.onConfirm(description)
  }}>
    <input type="text"
           className="w-full"
           value={description}
           onChange={e => setDescription(e.currentTarget.value)}
    />
    <button type="button" onClick={props.onDelete} className="text-sm text-sky-300 ml-1">
      Delete Activities
    </button>
  </form>
}
