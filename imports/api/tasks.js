import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

export const getTask = (task) => {
  return Tasks.find(task._id).fetch()[0];
};

export const checkError = (error, success) => {
  if (error) {
    throw new Error('something wrong with server');
  } else {
    console.log('db has been changed');
  }
};

Meteor.methods({
  createTask(task) {
    Tasks.insert(task);
  },
  completeTask(taskId, obj) {
    Tasks.update(taskId, obj);
  },
  removeTask(taskId) {
    Tasks.remove(taskId);
  },
  updateTask(taskId, obj) {
    Tasks.update(taskId, obj);
  },
});
