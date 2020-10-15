<template>
  <div class="main__list-wrapper">
    <h2 class="main__list-caption">Todos List</h2>
    <div class="main__from-wrapper">
      <form class="main__form">
        <input
          class="main__form-input"
          type="text"
          placeholder="Write to create new Task"
        />
        <button class="main__form-button" type="submit">create</button>
      </form>
    </div>

    <ul class="main__task-list task-list">
      <TodoItem v-for="(task, idx) in tasks" v-bind:task="task" :key="idx" />
    </ul>
  </div>
</template>

<script>
import TodoItem from '../todo/todo-item';
import { Tasks } from '../../../api/tasks';

export default {
  components: {
    TodoItem,
  },
  meteor: {
    tasks() {
      return Tasks.find({}).fetch();
    },
  },
};
</script>
<style scoped lang="less">
ul {
  margin: 0;
  padding: 20px 30px;

  display: flex;
  flex-direction: column;

  min-width: 300px;

  list-style: none;
}

.main__list-caption {
  margin: 0;
  padding: 20px 30px;
  margin-bottom: 20px;

  background-color: #ffc3a0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.main__from-wrapper {
  padding: 10px 30px;
  margin-bottom: 20px;

  display: flex;
}

.main__form {
  position: relative;
  width: 100%;
}

.main__form-input {
  box-sizing: border-box;
  width: 70%;
  height: 30px;
  outline: none;
  border: none;

  &:focus {
    border-bottom: 1px solid black;
  }
}

.main__form-button {
  position: absolute;
  display: flex;
  box-sizing: border-box;

  padding: 2px 10px;
  right: 15%;
  top: 10px;

  font-size: 15px;

  border: 1px solid black;
  border-radius: 10px;
  outline: none;
  background-color: #e0c3fc;
  cursor: pointer;

  &:hover {
    background-color: rgb(152, 251, 152);
  }

  &:active {
    background-color: #8ec5fc;
  }
}

.main__list-wrapper {
  box-sizing: border-box;
  /* padding: 50px 30px; */

  width: 600px;
  height: 300px;

  background: white;
  border-radius: 5px;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
}
</style>
