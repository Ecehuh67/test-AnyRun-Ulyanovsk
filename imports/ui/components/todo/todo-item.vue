<template>
  <div>
    <li class="task-list__item">
      <input class="task-list__item-checkbox" type="checkbox" />
      <p class="task-list__text">{{ task.text }}</p>
      <button
        class="task-list__item-button task-list__button--delete"
        type="click"
      >
        &times;
      </button>
    </li>
  </div>
</template>

<script>
export default {
  props: ['task'],
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

.task-list__text--checked {
  text-decoration: line-through;
}

.task-list__item-button {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 10px;
  top: 30%;

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
