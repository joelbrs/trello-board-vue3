<script setup lang="ts">
import { nanoid } from "nanoid";
import draggable from "vuedraggable";
import type { Column, Task } from "~/types";

const columns: Ref<Column[]> = ref([
  {
    id: nanoid(),
    title: "Backlog",
    tasks: [
      {
        id: nanoid(),
        title: "Create marketing landing page",
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: "Develop cool feature",
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: "Fix page nav bug",
        createdAt: new Date(),
      },
    ],
  },
  {
    id: nanoid(),
    title: "Selected for Dev",
    tasks: [],
  },
  {
    id: nanoid(),
    title: "In Progress",
    tasks: [],
  },
  {
    id: nanoid(),
    title: "QA",
    tasks: [],
  },
  {
    id: nanoid(),
    title: "Complete",
    tasks: [],
  },
]);

const alt = useKeyModifier("Alt");
</script>

<template>
  <div>
    <draggable
      v-model="columns"
      item-key="id"
      group="columns"
      :animation="150"
      handle=".drag-handler"
      class="flex gap-4 overflow-x-auto items-start"
    >
      <template #item="{ element: column }: { element: Column }">
        <div class="column bg-gray-200 p-5 rounded min-w-[250px]">
          <header class="font-bold mb-4">
            <DragHandle />
            {{ column.title }}
          </header>

          <draggable
            v-model="column.tasks"
            item-key="id"
            handle=".drag-handler"
            :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
            :animation="150"
          >
            <template #item="{ element: task }: { element: Task }">
              <div>
                <TrelloBoardTask :task="task" />
              </div>
            </template>
          </draggable>

          <footer>
            <NewTask @add="column.tasks.push($event)" />
          </footer>
        </div>
      </template>
    </draggable>
  </div>
</template>

<style scoped>
.sortable-drag .task {
  transform: rotate(5deg);
}

.sortable-ghost .task {
  position: relative;
}

.sortable-ghost .task::after {
  content: "";
  @apply absolute top-0 left-0 right-0 bg-red-300 rounded;
}
</style>
