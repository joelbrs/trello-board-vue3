import type { ID } from ".";

export interface Task {
  id: ID;
  title: string;
  createdAt: Date;
}
