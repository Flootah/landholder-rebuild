<script setup>
import { defineEmits, defineProps } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  editing: Boolean,
  ownerId: String,
  
})

const route = useRoute();
console.log(typeof(route.params.id), route.params.id)

//console.log(router.currentRoute.params.id)

console.log("edit", props.editing, "title", props.title)

</script>

<template>
  <div>
    <div class="title">{{title}}</div>
    <form name="user-form" id="inputform" onsubmit="onSubmit()">
      <div class="mb-3">
        <label for="owner">Owner: </label>
        <input id="owner" type="text" />
      </div>
      <div class="mb-3">
        <label for="legalentity">Legal Entity: </label>
        <input id="legalentity" type="text" />
      </div>
      <div class="mb-3">
        <label for="netmineralacres">Net Mineral Acres: </label>
        <input id="netmineralacres" type="text" />
      </div>
      <div class="mb-3">
        <label for="royalty">Mineral Owner Royalty: </label>
        <input id="royalty" type="text" />
      </div>
      <div class="mb-3">
        <label for="section">Section: </label>
        <input id="section" type="text" />
      </div>
      <div class="mb-3">
        <label for="township">Township: </label>
        <input id="township" type="text" />
      </div>
      <div class="mb-3">
        <label for="range">Range: </label>
        <input id="range" type="text" />
      </div>
      <div class="mb-3">
        <label for="titlesource">Title Source: </label>
        <select id="titlesource">
          <option value="Class A">Class A</option>
          <option value="Class B">Class B</option>
          <option value="Class C">Class C</option>
          <option value="Class D">Class D</option>
        </select>
      </div>
    </form>
    <div class="content-center text-center">
      <button class="p-5 m-4">Cancel</button>
      <button class="p-5 m-4">Confirm</button>
    </div>

  </div>
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