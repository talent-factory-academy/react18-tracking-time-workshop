import { Project } from './project';

export interface Activity {
  id: number;
  description: string;
  date: string;
  duration: string;
  projectId: number;
  project: Project;
}
