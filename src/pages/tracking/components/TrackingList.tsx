import { Activity } from '../../../model/activity';
import TrackingListItem from './TrackingListItem';

interface TrackingListProps {
  activities: Activity[];
  // NEW
  onEdit: (id: number, description: string) => void;
  // NEW
  onDelete: (id: number) => void;
}

export function TrackingList(props: TrackingListProps) {
  return <div>
    {
      props.activities.map(a => {
        return <TrackingListItem
          activity={a}
          key={a.id}
          onEdit={(desc) => props.onEdit(a.id, desc)}
          onDelete={props.onDelete}
        />
      })
    }
  </div>
};
