<template>
  <div>
    <!-- {{ task }} -->
    <li class="task-list__item" v-bind:class="{ done: this.task.isDone }">
      <input
        class="task-list__item-checkbox"
        type="checkbox"
        v-on:change="compliteTask"
      />
      <span class="task-list__text">{{ task.text }}</span>

      <Timer v-bind:task="task" />

      <button
        class="task-list__item-button task-list__button--delete"
        type="click"
        v-on:click="deleteTask"
      >
        &times;
      </button>
    </li>
  </div>
</template>

<script>
import { Tasks } from '../../../api/tasks';
import Timer from '../timer/timer';
export default {
  props: ['task'],
  components: {
    Timer,
  },
  methods: {
    compliteTask() {
      // const currentTask = getTaskId(this.task);
      Tasks.update(this.taskItem._id, {
        ...this.task,
        isDone: !this.task.isDone,
      });
    },
    deleteTask() {
      // const currentTask = getTaskId(this.task);
      Tasks.remove(this.taskItem._id);
    },
  },
  meteor: {
    taskItem() {
      return Tasks.find(this.task._id).fetch()[0];
    },
  },
};
</script>

<style scoped lang="less">
p {
  margin: 0;
  padding: 0;
}
.main__list-wrapper {
  width: 600px;
  height: 300px;

  background: white;
}

.task-list__item-checkbox {
  margin-right: 5px;
}

.task-list__item {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 5px 10px;

  min-height: 40px;

  border: 1px solid lightgray;
  border-radius: 5px;

  &:not(last-of-type) {
    margin-bottom: 15px;
  }
}

.task-list__text {
  max-width: 300px;
}

.done {
  text-decoration: line-through;
}

.task-list__item-button {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 10px;
  top: 12px;

  width: 20px;
  height: 20px;

  color: red;
  font-size: 20px;
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    color: black;
  }
}
</style>
