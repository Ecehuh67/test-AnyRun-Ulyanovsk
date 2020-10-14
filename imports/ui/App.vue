<template>
  <main class="html-wrapper main">
    <h1 class="main__caption visually-hidden">Welcome to the Time Tracker</h1>
    <TodosList />
  </main>
</template>

<script>
import TodosList from './components/todos-list/todos-list';
import { Tasks } from '../api/tasks';

export default {
  name: 'app',
  data() {
    return Tasks.find({});
  },
  components: {
    TodosList,
  },
};
</script>

<style scoped>
.html-wrapper {
  margin: 20% auto;
}

p {
  font-size: 2em;
  text-align: center;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
}
</style>
