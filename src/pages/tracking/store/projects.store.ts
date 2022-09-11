import { Project } from '../../../model/project';

type ProjectsActions =
  | { type: 'init', payload: Project[]}
  | { type: 'add', payload: Project }
  | { type: 'remove', payload: number }
  | { type: 'edit', payload: Project }

export function projectsReducer(state: Project[], action: ProjectsActions) {
  switch (action.type) {
    case 'init': return [...action.payload];
    case 'add': return [...state, action.payload];
    case 'remove': return state.filter(p => p?.id !== action.payload);
    case 'edit': return state.map(p => {
      return p?.id === action.payload.id ? action.payload : p;
    })
  }
}
