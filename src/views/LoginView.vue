<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';
  import EmailPassInput from '../components/EmailPassInput.vue';
  import realm from '../realm'

  const router = useRouter();
  const email = ref("")
  const password = ref("")
  const errorlog = ref("")

  var fetchedUser = await realm.fetchUser();
  if(fetchedUser) {
    router.push('/')
  }

  async function onSubmit() {
    try {
      console.log("logging in...")
      //realm.loginUser("test@email.com", "123456")
      await realm.loginUser(email.value, password.value)
    } catch ({name, message}) {
      errorlog.value = message;
    }
    router.push("/")
  }
</script>

<template>
  
  <EmailPassInput 
    title="Login"
    v-model:email="email"
    v-model:password="password"
    @submit="onSubmit()"
  />

  <div class="buttonwrap">
  <button class="btn btn-outline-dark" type="buttom" @click="onSubmit()">
      Login
    </button>
    |
    <button class="btn btn-outline-dark" type="button" form="inputform" @click="this.$router.push('/signup')">
      Signup
    </button>
    <br>
    <p id="error">
      {{ errorlog }}
    </p>
  </div>
</template>

<style>
.buttonwrap {
  margin: auto;
  text-align: center;
}

#error {
  margin-top: 30px;
  color: red;
}
</style>
