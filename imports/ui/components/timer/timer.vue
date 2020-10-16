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
    <div class="timer-button__wrapper">
      <button
        class="timer__button"
        type="button"
        v-on:click="startTrackTask"
        v-if="!isTracked"
      >
        {{ this.time.currentTime.seconds === '00' ? 'Start' : 'Renew' }}
      </button>

      <button class="timer__button" type="button" v-on:click="pauseTime" v-else>
        Pause
      </button>
      <button
        class="timer__button timer__button--reset"
        type="button"
        :disabled="this.time.duration === 0"
        v-on:click="resetTimer"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script>
import { Tasks } from '../../../api/tasks';
import { getValue } from '../../../utils/timer';

export default {
  props: ['task'],

  // Create a local variable to use inside a Vue component
  data() {
    return {
      time: {
        initialTime: [],
        doneTime: [],
        timer: null,
        currentTime: {},
        duration: 0,
        isTracked: false,
      },
    };
  },
  // This method allows to watch for changing values to rerender
  computed: {
    isTracked() {
      return !!this.time.isTracked;
    },
    // Convert duration into correct format for a timer-list
    renewTimer() {
      const time = getValue(this.time.duration);
      this.time.currentTime = time;
      return this.time.currentTime;
    },
  },
  methods: {
    startTrackTask() {
      this.updateTimer();

      const date = new Date();

      // Update the collection to show a timer has been started
      Tasks.update(this.taskItem._id, {
        ...this.task,
        initialTime: [date],
        isTracked: true,
      });

      // Update the local variable to save current value of having been started
      this.time.isTracked = true;
    },
    pauseTime() {
      const newTime = Math.floor(
        (new Date() - this.taskItem.initialTime[0]) / 1000
      );

      // Stop circle of updating a timer
      window.clearInterval(this.time.timer);
      this.time.isTracked = false;

      // Update the collection to show a timer has been paused
      Tasks.update(this.taskItem._id, {
        ...this.task,
        duration: this.taskItem.duration + newTime,
        isTracked: false,
      });
    },
    resetTimer() {
      // Stop circle of updating a timer
      window.clearInterval(this.time.timer);

      // Return the local variable back into an initial state
      this.time = {
        initialTime: [],
        doneTime: [],
        timer: null,
        currentTime: {},
        duration: 0,
        isTracked: false,
      };

      // Return the server task back into an initial state
      Tasks.update(this.taskItem._id, {
        ...this.task,
        isTracked: false,
        initialTime: [],
        duration: 0,
      });
    },

    // Renew each second our timer on 1 sec
    updateTimer() {
      this.time.duration = this.taskItem.duration;
      const timer = window.setInterval(() => {
        this.time.duration += 1;
      }, 1000);
      this.time.timer = timer;
    },

    // After the application was closed or page was refreshed recovers a timer
    initialUpdate() {
      let timer = null;
      const date = new Date();
      if (!this.taskItem.isTracked) {
        this.time.duration = this.taskItem.duration;
      } else {
        this.time.isTracked = this.taskItem.isTracked;
        this.time.duration =
          this.taskItem.duration +
          Math.floor((date - this.taskItem.initialTime[0]) / 1000);
        timer = window.setInterval(() => {
          this.time.duration += 1;
        }, 1000);
        this.time.timer = timer;
      }
    },
  },
  mounted() {
    this.initialUpdate();
  },
  meteor: {
    tasks() {
      return Tasks.find({}).fetch();
    },
    taskItem() {
      return Tasks.find(this.task._id).fetch()[0];
    },
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
