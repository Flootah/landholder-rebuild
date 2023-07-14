<script setup>
defineProps({
  title: {
    type: String,
    required: false
  },
  email: String,
  password: String,
})
defineEmits(['update:email', 'update:password', 'submit'])

</script>

<template>
  <div class="title">{{title}}</div>
    <form name="user-form" id="inputform" @submit="$emit('submit')" onsubmit="return false">
    <input type="submit" style="display: none" />
    <div class="mb-3">
      <label for="email">E-mail: </label>
      <input 
        id="email" 
        type="text" 
        :value="email" 
        @input="$emit('update:email', $event.target.value)" />
    </div>
    <div class="mb-3">
      <label for="password">Password: </label>
      <input 
        id="password" 
        type="password" 
        :value="password" 
        @input="$emit('update:password', $event.target.value)" />
    </div>
  </form>
</template>

<style>
form {
  max-width: 100vw;
  align-self: center;
  margin: auto;
  text-align: center;
  display: table;
}

form .mb3 {
  display: table-row;
}

form label {
  display: table-cell;
}

form input {
  color: black;
  padding: 5px 10px;
  align-self: right;
  display: table-cell;
}

.title {
  font-size: xx-large;
  text-align: center;
  margin-bottom: 50px;
}
</style>