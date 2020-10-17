<template>
  <div class="timer-wrapper">
    <ul class="timer">
      <li class="timer__item timer__item--hours">
        {{ this.renewTimer.hours || '00' }}
      </li>
      <li class="timer__item timer__item--minutes">
        {{ this.renewTimer.minutes || '00' }}
      </li>
      <li class="timer__item timer__item--seconds">
        {{ this.renewTimer.seconds || '00' }}
      </li>
    </ul>
    <div class="timer-button__wrapper" v-if="!this.task.isDone">
      <button
        class="timer__button"
        type="button"
        v-on:click="startTrackTask"
        v-if="!isTracked"
      >
        {{ this.task.duration === 0 ? 'Start' : 'Renew' }}
      </button>

      <button class="timer__button" type="button" v-on:click="pauseTime" v-else>
        Pause
      </button>
      <button
        class="timer__button timer__button--reset"
        type="button"
        :disabled="this.task.duration === 0"
        v-on:click="resetTimer"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script>
import { Meteor } from 'meteor/meteor';
import { Tasks, updateTask, checkError } from '../../../api/tasks';
import { getValue } from '../../../utils/timer';

export default {
  props: ['task'],
  // This method allows to watch for changing values to rerender
  computed: {
    isTracked() {
      return !!this.task.isTracked;
    },
    // Convert duration into correct format for a timer-list
    renewTimer() {
      const time = getValue(this.task.duration);
      return time;
    },
  },
  methods: {
    startTrackTask() {
      // Update the collection to show a timer has been started
      const timer = Meteor.setInterval(() => {
        this.task.duration += 1;

        Meteor.call(
          'updateTask',
          this.task._id,
          {
            ...this.task,
            initialTime:
              this.task.initialTime.length > 0
                ? this.task.initialTime
                : [new Date()],
            isTracked: true,
            timer,
          },
          checkError
        );
      }, 1000);

      // Update the local variable to save current value of having been started
    },
    pauseTime() {
      // Stop circle of updating a timer
      Meteor.clearInterval(this.task.timer);

      // Update the collection to show a timer has been paused
      Meteor.call(
        'updateTask',
        this.task._id,
        {
          ...this.task,
          // duration: newTime,
          isTracked: false,
          timer: null,
        },
        checkError
      );
    },
    resetTimer() {
      Meteor.clearInterval(this.task.timer);

      // Return the server task back into an initial state
      Meteor.call(
        'updateTask',
        this.task._id,
        {
          ...this.task,
          isTracked: false,
          initialTime: [],
          duration: 0,
          timer: null,
        },
        checkError
      );
    },

    // After the application was closed or page was refreshed recovers a timer
    initialUpdate() {
      if (this.task.isTracked) {
        this.pauseTime();
        this.startTrackTask();
      }
    },
  },
  created() {
    this.initialUpdate();
  },
};
</script>

<style lang="less" scoped>
.timer-wrapper {
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: column;

  top: 12px;
  right: 50px;

  width: 110px;
}

.timer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 0;
  padding: 0;
  margin-bottom: 5px;

  font-size: 10px;

  list-style: none;
}

.timer-button__wrapper {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;

  padding: 0 5px;
}

.timer__item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 33%;

  &:not(:first-of-type)::before {
    position: absolute;
    content: ':';
    top: 3px;
    left: 0;
  }
}

.timer__button {
  // width: 20px;

  font-size: 10px;
}
</style>
