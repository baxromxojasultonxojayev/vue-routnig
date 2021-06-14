import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import TeamsList from './components/teams/TeamsList.vue'
import UsersList from './components/users/UsersList.vue'
import InfoUsers from './components/users/InfoUsers.vue'
import TeamMembers from './components/teams/TeamMembers.vue'
import NotFound from './components/nav/NotFound.vue'
import TeamsFooter from './components/teams/TeamsFooter.vue'
import UsersFooter from './components/users/UsersFooter.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/', redirect: '/teams'
    },
    {
      name: 'teams',
      path: '/teams',
      components: { default: TeamsList, footer: TeamsFooter},
      // alias: '/teams'
      children: [
        { 
          name: 'team-members',
          path: ':itemId', 
          component: TeamMembers, 
          props: true  
        },
      ]
    },
    {
      path: '/users',
      components:{ default: UsersList, footer: UsersFooter},
      beforeEnter(to, from, next){
        console.log('Welcome to Vuejs');
        next()
      }
    },
    {
      path: '/home',
      component: InfoUsers,
    },
    {
      path: '/:notFound(.*)', component: NotFound
    },
  ],
  scrollBehavior(to, from, position){
    // console.log(to, from ,position);
    if(position){
      return position
    }
    return ({left: 0,top: 0})
  }
})

router.beforeEach((to, from, next)=> {
  console.log('Hello Vue');
  console.log(to, from);
  next()
})

const app = createApp(App)
app.use(router)
app.mount('#app')


