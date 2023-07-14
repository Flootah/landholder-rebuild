<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { ref } from 'vue';
    import realm from '../realm'
    
    
    const fetchedUser = await realm.fetchUser();
    const route = useRoute();
    const router = useRouter();
    const editing = ('id' in route.params);
    const error = ref("")

    var id
    const name = ref(null)
    const ownertype = ref(null)
    const entitytype = ref(null)
    const address = ref(null)

    // load values into form, depending on if we are editing or not.
    if(editing) {
      try{
        id = route.params.id
        const curOwner = await fetchedUser.functions.getOwnerById(id);
        name.value = curOwner.name
        ownertype.value = curOwner.ownerType
        entitytype.value = curOwner.entityType
        address.value = curOwner.address
      } catch (e) {
        error.value = e
      }
    } else {
      name.value = "John Doe"
      ownertype.value = "Competitor"
      entitytype.value = "Company"
      address.value = "123 Default St."
    }



    if(!fetchedUser) {
      await router.push('./login')
    }

    async function submit() {
      try{
        if(
          !name.value ||
          !ownertype.value ||
          !entitytype.value ||
          !address.value
        ) 
        throw new Error("All fields must be filled.")

        // check that name does not exist if creating new owner.
        // getOwnerByName returns owner id if match is founce, empty string otherwise
        var match = await fetchedUser.functions.getOwnerByName(name.value)
        if(match) {
          if(!editing) throw new Error("Name already in use!");
          if(match != id) throw new Error("Name already in use!")
        }


        if(editing)
          updateOwner()
        else
          createOwner()

        router.push("/")
      } catch (e) {
        error.value = e
      }
    }

    async function createOwner() {
      await fetchedUser.functions.createOwner(
        name.value,
        entitytype.value, 
        ownertype.value, 
        address.value);
    }

    async function updateOwner() {
      await fetchedUser.functions.updateOwner(
        id,
        name.value,
        entitytype.value, 
        ownertype.value, 
        address.value);
    }

</script>

<template>
  <div>
    <div class="title">{{editing ? "Edit" : "Create"}} Owner</div>
    <form name="user-form" id="inputform" onsubmit="onSubmit()">
      <div class="mb-3">
        <label for="name">Name: </label>
        <input v-model="name" id="name" type="text" />
      </div>
      <div class="mb-3">
        <label for="ownertype">Owner Type: </label>
        <select v-model="ownertype" id="ownertype">
          <option value="Competitor">Competitor</option>
          <option value="Seller">Seller</option>
          <option value="Investor">Investor</option>
          <option value="Professional">Professional</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="entitytype">Entity Type:</label>
        <select v-model="entitytype" id="entitytype">
          <option value="Company">Company</option>
          <option value="Individual">Individual</option>
          <option value="Investor">Investor</option>
          <option value="Trust">Trust</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="address">Address: </label>
        <input v-model="address" id="address" type="text" />
      </div>
    </form>
    <div class="content-center text-center mb-6">
      <button class="p-5 m-4" @click="$router.push('/')">Cancel</button>
      <button class="p-5 m-4" @click="submit()">Confirm</button>
    </div>
    <p class="text-red-500 text-center text-lg">{{ error }}</p>
  </div>
</template>

<style>
input, select {
  width: 200px;
  height: 35px;
  padding: 2px 10px !important;
  color: black !important;
}
</style>