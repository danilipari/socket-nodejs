<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>

  <p>store: {{ $store.state.name }}</p>

  <p>{{ message }}</p>
  <!--  -->
  <div class="d-flex justify-content-center">
    <div class="d-flex justify-content-center">
      <input type="text" class="form-control" v-model="message">
      <button class="btn btn-primary" @click="sendMessage()">send</button>
    </div>
  </div>

  <br><br>

  <button class="btn btn-warning" @click="refreshList()">RefreshList</button>
</template>

<script>
import SocketioService from './services/socket.service.js';
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created() {
    SocketioService.setupSocketConnection();
  },
  beforeUnmount() {
    SocketioService.disconnect();
  },
  data() {
    return {
      message: '',
      liveData: {},
    }
  },
  computed: {
    messages() {
      return []
    }
  },
  methods: {
    sendMessage() {
      SocketioService.sendMessage(this.message);
      console.log('Message sended:' + this.message);
    },
    refreshList() {
      SocketioService.refreshList()
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
