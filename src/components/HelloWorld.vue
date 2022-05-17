<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button type="button" name="button" v-on:click="getmsg">get</button>
    <button type="button" name="button" v-on:click="postmsg">post</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getmsg () {
      this.$axios.get('/api/personal?name=MUKI').then(function (res) {
        console.log('res=', res)
      })
    },
    postmsg () {
      this.$axios.post('/api/favorite', {name: 'money'}).then(res => {
        console.log('post res = ', res)
      })
    }
  }
}
</script>
