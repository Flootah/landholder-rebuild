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
      //console.log("submitting...")
      // create user and login, route to home
      await realm.createUser(email.value, password.value)
      await realm.loginUser(email.value, password.value)
    } catch ({name, message}) {
      errorlog.value = message
      return
    }
    router.push('/')
  }

</script>

<template>
  <EmailPassInput 
    title="Signup"
    v-model:email="email"
    v-model:password="password"
    @submit="onSubmit()"
  />
  <div class="buttonwrap">
  <button class="btn btn-outline-dark p-3 hover:bg-slate-600" type="button" @click="$router.push('/login')">
      Back
    </button>
    |
    <button class="btn btn-outline-dark p-3 hover:bg-slate-600" type="button" @click="onSubmit()">
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
