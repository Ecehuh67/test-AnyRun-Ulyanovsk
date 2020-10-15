<template>
  <div class="body-wrapper html-wrapper">
    <h1 class="main__caption visually-hidden">Welcome to the Time Tracker</h1>
    <main class="main">
      <h1 class="main__caption visually-hidden">Welcome to the Time Tracker</h1>
      <TodosList />
    </main>
  </div>
</template>

<script>
import TodosList from './components/todos-list/todos-list';
export default {
  name: 'app',
  components: {
    TodosList,
  },
};
</script>

<style scoped>
.html-wrapper {
  display: flex;
  justify-content: center;
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
