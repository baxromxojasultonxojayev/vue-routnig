<template>

  <ul>
    <button @click="confirmAdds">Confirm</button>
    <button @click="saveChanges">Save changes</button>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data(){
    return { changesSaved: false }
  },
  methods: {
    confirmAdds() {
      this.$router.push('/home')
    },
    saveChanges(){
      this.changesSaved = true
    }
  },
  beforeRouteEnter(to, from, next){
    console.log('salom');
    console.log(to, from);
    next()
  },
  beforeRouteLeave(to, from, next){
    console.log('Components of USERSLIST');
    console.log(to, from);
    if(this.changesSaved){
      next()
    }else{
      const userLeave = confirm('Are you sure you got unsaved changes')
      next(userLeave)
    }
  },
  unmounted(){
    console.log('Bye');
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
