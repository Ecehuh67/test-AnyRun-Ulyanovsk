<template>
  <div>
    <li class="task-list__item" v-bind:class="{ done: this.task.isDone }">
      <input
        class="task-list__item-checkbox"
        type="checkbox"
        v-on:change="compliteTask"
        :checked="!!this.task.isDone"
      />
      {{ this.task.isDone }}
      <div class="task-list__item-wrapper">
        <span class="task-list__text">{{ this.task.text }}</span>
        <span class="task-list__description" v-if="!!this.task.description">{{
          this.task.description
        }}</span>
      </div>

      <Timer v-bind:task="task" ref="timerComponent" />

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
import { Meteor } from 'meteor/meteor';
import {
  Tasks,
  completeTask,
  checkError,
  removeTask,
  updateTask,
} from '../../../api/tasks';
import Timer from '../timer/timer';
export default {
  props: ['task'],
  components: {
    Timer,
  },
  computed: {
    isCompleted() {
      return this.task.isDone;
    },
  },
  methods: {
    compliteTask() {
      this.onChange();
      Meteor.call(
        'completeTask',
        this.task._id,
        {
          ...this.task,
          isDone: !this.task.isDone,
          doneTime: new Date(),
          isTracked: false,
          timer: null,
        },
        checkError
      );
      this.task.isDone = true;
    },
    deleteTask() {
      this.onChange();
      Meteor.call('removeTask', this.taskItem._id, checkError);
    },
    onChange() {
      Meteor.clearInterval(this.task.timer);
    },
  },

  // Get access to tasks from Mondo db
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
  margin-right: 10px;
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

.done {
  text-decoration: line-through;
}

.task-list__item-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;

  max-width: 350px;
  min-height: 50px;
}

.task-list__text {
  font-weight: 600;
}

.task-list__description {
  margin-top: 10px;
}

.task-list__item-button {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 10px;
  top: 10px;

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
