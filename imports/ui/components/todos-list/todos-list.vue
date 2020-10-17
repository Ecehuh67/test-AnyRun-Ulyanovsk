<template>
  <div class="main__list-wrapper">
    <h2 class="main__list-caption">
      Todos List ({{ this.notCompleted.length }})
    </h2>
    <div class="main__from-wrapper">
      <form class="main__form" @submit.prevent="saveNewItem">
        <div class="main__form-label-wrapper">
          <label class="main__form-label" for="task-text">Text:</label>
          <input
            class="main__form-input"
            type="text"
            id="task-text"
            v-model="task.text"
            placeholder="Write a text for your new task"
            required
          />
        </div>
        <div class="main__form-label-wrapper">
          <label class="main__form-label" for="task-description"
            >Description:</label
          >
          <input
            class="main__form-input"
            type="desctiption"
            id="task-description"
            v-model="task.description"
            placeholder="Write here your description"
          />
        </div>
        <button class="main__form-button" type="submit">create</button>
      </form>
    </div>

    <ul class="main__task-list task-list" v-if="noTasks">
      <TodoItem v-for="(task, idx) of tasks" v-bind:task="task" :key="idx" />
      <TodoItem
        v-for="(task, idx) of completedTasks"
        v-bind:task="task"
        :key="task + idx"
      />
    </ul>
    <p v-else class="task-list__caption">There is no any tasks to do!</p>
  </div>
</template>

<script>
import TodoItem from '../todo/todo-item';
import { Meteor } from 'meteor/meteor';
import { Tasks, checkError } from '../../../api/tasks';

export default {
  data() {
    return { task: {} };
  },
  components: {
    TodoItem,
  },
  computed: {
    noTasks() {
      return !!(this.tasks.length + this.completedTasks.length);
    },
  },
  methods: {
    saveNewItem() {
      const newTask = {
        ...this.task,
        isDone: false,
        isTracked: false,
        initialTime: [],
        duration: 0,
      };

      Meteor.call('createTask', newTask, checkError);

      this.task = {
        text: '',
        description: '',
      };
    },
  },
  meteor: {
    // Get tasks from Mongo db and sort them
    tasks() {
      return Tasks.find({ isDone: false }).fetch();
    },
    completedTasks() {
      return Tasks.find({ isDone: true }, { sort: { doneTime: -1 } }).fetch();
    },

    notCompleted() {
      return Tasks.find({ isDone: false }).fetch();
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
  position: relative;
  padding: 10px 30px;
  margin-bottom: 20px;

  display: flex;
}

.main__form {
  // position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.main__form-label-wrapper {
  display: flex;
  align-items: center;
}

.main__form-label {
  width: 90px;
}

.main__form-input {
  box-sizing: border-box;
  width: 50%;
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
  right: 20%;
  bottom: -20px;

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

  width: 600px;

  background: white;
  border-radius: 5px;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
}

.task-list__caption {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 90px;
}
</style>
