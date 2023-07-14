<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import realm from '../realm'

const router = useRouter()
const fetchedUser = await realm.fetchUser();
// set references that can be accessed later
const owners = ref("")
const landholdings = ref("")
const lhtable = ref(null)
const otable = ref(null)

async function logOut() {
  await realm.logoutUser().then(router.push('./login'));
}

async function loadData() {
  try {
  //let name = await fetchedUser.functions.nameByOwnerId('64adc08218d258f7773994b0')
  //let numOwned = await fetchedUser.functions.numOwnedById('64adc08218d258f7773994b0')
  //console.log(name, "owns", numOwned, "holdings")
  //console.log("loading data...")
  owners.value = await fetchedUser.functions.getAllOwners();
  landholdings.value = await fetchedUser.functions.getAllLandHoldings();

  for(const o of owners.value) {
    o.owned = await fetchedUser.functions.numOwnedById(o._id)
    //console.log(o.owned)
  }

  for(const l of landholdings.value) {
    l.owner = await fetchedUser.functions.nameByOwnerId(l.ownerId)
    //l.sectionName = l.section + '-' + l.township + '-' + l.range
    //console.log(l.owner)
  }

  } catch (e) {
    console.log(e)
  }
}

async function deleteOwner(id) {
  await fetchedUser.functions.delOwner(id);
  loadData()
}

async function deleteLandHolding(id) {
  await fetchedUser.functions.delLandHolding(id);
  loadData()
}

if(!fetchedUser) {
  router.push('/login')
}

await loadData()





</script>

<template>
  <main class="flex flex-col items-center">
    <h1 class="text-5xl font-bold mb-5">Database Contents</h1>
    <h2 class="text-3xl fond-bold mb-5">Owners</h2>
      <table ref="otable" class="bg-slate-800 border-slate-400 border-2 table-auto w-5/6 border-collapsed text-center text-s">
        <thead>
          <tr class="even:bg-slate-800 odd:bg-slate-900">
            <th>Name</th>
            <th>Type</th>
            <th>Entity</th>
            <th>Address</th>
            <th>Total Holdings</th>
            <th colspan="2">Actions</th>
          </tr>
        </thead>
        <tr class="even:bg-slate-800 odd:bg-slate-900" v-for="(owner, i) in owners" :key="i">
          <td>{{ owner.name }}</td>
          <td>{{ owner.ownerType }}</td>
          <td>{{ owner.entityType }}</td>
          <td>{{ owner.address }}</td>
          <td>{{ owner.owned }}</td>
          <td>
            <div class="flex items-center justify-center space-x-3" >
              <button title="New Land Holding..." class="btn btn-outline-dark font-bold p-2 hover:bg-slate-600" type="button" @click="$router.push({name:'newlandholding', params: {id: owner._id.toString()}})">
                <img src="@/assets/add.svg" class="h-6"/>
              </button>
              <button title="Edit Owner..." class="btn btn-outline-dark font-bold p-2 hover:bg-slate-600" type="button" @click="$router.push({name:'editowner', params: {id: owner._id.toString()}})">
                <img src="@/assets/edit.svg" class="h-6"/>
              </button>
              <button title="Delete Owner" class="btn btn-outline-dark font-bold p-2 hover:bg-slate-600" type="button" @click="deleteOwner(owner._id)">
                <img src="@/assets/delete.svg" class="h-6"/>
              </button>
            </div>
          </td>
        </tr>
      </table>
      <button title="New Owner..." class="btn btn-outline-dark font-bold p-5 hover:bg-slate-600 mb-10" type="button" @click="$router.push({name:'newowner'})">
        <img src="@/assets/add.svg" class="h-8" />
      </button>
    <h2 class="text-3xl fond-bold mb-5">Land Holdings</h2>

      <table class="bg-slate-800 border-slate-400 border-2 table-fit w-5/6 border-collapsed text-center text-s" ref="lhtable">
        <thead>
          <tr class="even:bg-slate-800 odd:bg-slate-900">
            <th width ="190px">Name</th>
            <th>Owner</th>
            <th>Entity</th>
            <th width="75px" title="Net Mineral Acres">NMA</th>
            <th width="75px" title="Mineral Owner Royalty">MOR</th>
            <th width ="140px">Section Name</th>
            <th>Section</th>
            <th>Township</th>
            <th>Range</th>
            <th> Title Source </th>
            <th colspan="2" width="50px">Actions</th>
          </tr>
        </thead>
        <tr class="even:bg-slate-800 odd:bg-slate-900" v-for="(lh, i) in landholdings" :key="i">
          <td>{{ lh.name }}</td>
          <td>{{ lh.owner }}</td>
          <td>{{ lh.legalEntity }}</td>
          <td>{{ lh.netMineralAcres }}</td>
          <td>{{ lh.mineralOwnerRoyalty }}</td>
          <td>{{ lh.sectionName }}</td>
          <td>{{ lh.section }}</td>
          <td>{{ lh.township }}</td>
          <td>{{ lh.range }}</td>
          <td>{{ lh.titleSource }}</td>
          <td>
            <div class="flex items-center justify-center space-x-3" >
              <button title="Edit Owner..." class="btn btn-outline-dark font-bold p-2 hover:bg-slate-600" type="button" @click="$router.push({name:'editlandholding', params: {id: lh._id.toString()}})">
                <img src="@/assets/edit.svg" class="h-6"/>
              </button>
              <button class="btn btn-outline-dark font-bold p-2 hover:bg-slate-600" type="button" @click="deleteLandHolding(lh._id)">
                <img src="@/assets/delete.svg" class="h-6"/>
              </button>
            </div>
          </td>
        </tr>
      </table>
      <div class="buttonwrap">
      <button class="btn btn-outline-dark font-bold p-5 hover:bg-slate-600" type="button" @click="logOut()">
      Log Out
      </button>
    </div>
  </main>
</template>

<style>
table {
  min-width: 1200px;
}

table, tr, th, td {
  border: 0 solid;
  text-align: center;
  padding: 5px;
}

.buttonwrap {
  text-align: center;
  margin: auto;
}
</style>