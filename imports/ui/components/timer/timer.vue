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
    <button
      class="timer__button"
      type="button"
      v-on:click="startTrackTask"
      v-if="!isTracked"
    >
      Start
    </button>
    <button class="timer__button" type="button" v-on:click="pauseTime" v-else>
      Pause
    </button>
    <button
      class="timer__button timer__button--reset"
      type="button"
      disabled="disabled"
    >
      Reset
    </button>
  </div>
</template>

<script>
import { Tasks } from '../../../api/tasks';
import { getValue } from '../../../utils/timer';

export default {
  props: ['task'],
  data() {
    return {
      time: {
        initialTime: [],
        doneTime: [],
        timer: null,
        currentTime: {},
        duration: 0,
      },
    };
  },
  computed: {
    isTracked() {
      return !!this.taskItem.isTracked;
    },
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
      Tasks.update(this.taskItem._id, {
        ...this.task,
        initialTime: [date],
        isTracked: !this.isTracked,
      });
    },
    pauseTime() {
      const newTime = Math.floor(
        (new Date() - this.taskItem.initialTime[0]) / 1000
      );

      window.clearInterval(this.time.timer);

      Tasks.update(this.taskItem._id, {
        ...this.task,
        duration: this.taskItem.duration + newTime,
        isTracked: !this.isTracked,
      });
    },
    updateTimer() {
      this.time.duration = this.taskItem.duration;
      const timer = window.setInterval(() => {
        this.time.duration += 1;
      }, 1000);
      this.time.timer = timer;
    },
    initialUpdate() {
      let timer = null;
      const date = new Date();
      if (!this.taskItem.isTracked) {
        this.time.duration = this.taskItem.duration;
      } else {
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
  justify-content: space-between;

  top: 12px;
  right: 50px;

  width: 160px;
}

.timer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 0;
  padding: 0;

  width: 70px;

  font-size: 10px;

  list-style: none;
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
  font-size: 10px;
}
</style>
