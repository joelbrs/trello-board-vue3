import type { ID, Task } from ".";

export interface Column {
  id: ID;
  title: string;
  tasks: Task[];
}
