import Vue from 'vue';
import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App';
import VueMeteorTracker from 'vue-meteor-tracker';
import './main.html';

Meteor.startup(() => {
  Vue.use(VueMeteorTracker);
  new Vue({
    render: (h) => h(App),
  }).$mount('#app');
});
