import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

export const getTask = (task) => {
  return Tasks.find(task._id).fetch()[0];
};
