import { Activity } from '../../../model/activity';

type ActivitiesActions =
  | { type: 'init', payload: Activity[]}
  | { type: 'add', payload: Activity }
  | { type: 'remove', payload: number }
  | { type: 'edit', payload: Activity }

export function activitiesReducer(state: Activity[], action: ActivitiesActions) {
  switch (action.type) {
    case 'init': return [...action.payload];
    case 'add': return [...state, action.payload];
    case 'remove': return state.filter(p => p.id !== action.payload);
    case 'edit': return state.map(p => {
       return p.id === action.payload.id ? { ...p, ...action.payload } : p;
    })
  }
}
