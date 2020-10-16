import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

// Tasks.remove({});

export const getTaskId = (task) => {
  return Tasks.find(task._id).fetch()[0]._id;
};
