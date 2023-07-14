<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { ref } from 'vue';
    import realm from '../realm'

    const fetchedUser = await realm.fetchUser();
    const route = useRoute();
    const router = useRouter();
    const editing = (route.name=="editlandholding");
    const error = ref("")
    const id = route.params.id 

    const legalentity = ref(null)
    const netmineralacres = ref(null)
    const mineralownerroyalty = ref(null)
    const section = ref(null)
    const township = ref(null)
    const range = ref(null)
    const titlesource = ref(null)

    if(editing) {
        const curLH = await fetchedUser.functions.getLandHoldingById(id)
        legalentity.value = curLH.legalEntity
        netmineralacres.value = curLH.netMineralAcres
        mineralownerroyalty.value = curLH.mineralOwnerRoyalty
        section.value = curLH.section
        township.value = curLH.township
        range.value = curLH.range
        titlesource.value = curLH.titleSource
    } else {
        legalentity.value = "JD Trust"
        netmineralacres.value = "5"
        mineralownerroyalty.value = "10"
        section.value = "111"
        township.value = "222N"
        range.value = "333E"
        titlesource.value = "Class A"
    }

    if(!fetchedUser) {
      await router.push('./login')
    }

    async function submit() {
        try {
            if(
                !legalentity.value ||
                !netmineralacres.value ||
                !mineralownerroyalty.value ||
                !section.value ||
                !township.value ||
                !range.value ||
                !titlesource.value
            )
            throw new Error("All fields must be filled.")

            // format checks
            if(!netmineralacres.value.match(/^\d+$/))
                throw new Error("Net Mineral Acres must be a number")
            if(!mineralownerroyalty.value.match(/^\d+$/))
                throw new Error("Mineral Owner Royalry must be a number")
            if(!section.value.match(/^\d{3}$/))
                throw new Error("Section must be three digits (123)")
            if(!township.value.match(/^\d{3}[N|S]$/))
                throw new Error("Township must be three digits followed by N or S (123N)")
            if(!range.value.match(/^\d{3}[E|W]$/))
                throw new Error("Range must be three digits followed by E or W (123E)")

            if(editing) {
                await editLH();
            } else {
                await createLH();
            }
            router.push('/')
        } catch (e) {
            error.value = e
        }

    }

    async function editLH() {
        let sectionname = section.value + "-" + township.value + "-" + range.value
        let name = sectionname + "-" + legalentity.value

        await fetchedUser.functions.updateLandHolding(
            id,
            name,
            legalentity.value,
            netmineralacres.value,
            mineralownerroyalty.value,
            sectionname,
            section.value,
            township.value,
            range.value,
            titlesource.value
        )
    }

    async function createLH() {
        let sectionname = section.value + "-" + township.value + "-" + range.value
        let name = sectionname + "-" + legalentity.value
        await fetchedUser.functions.createLandHolding(
            name,
            id,
            legalentity.value,
            netmineralacres.value,
            mineralownerroyalty.value,
            sectionname,
            section.value,
            township.value,
            range.value,
            titlesource.value
        )
    }

    console.log("editing", editing, "in", route.name)

</script>

<template>
  <div>
    <div class="title">{{ editing ? "Edit" : "Create" }} Holding</div>
    <form name="user-form" id="inputform" onsubmit="onSubmit()">
      <div class="mb-3">
        <label for="legalentity">Legal Entity: </label>
        <input v-model="legalentity" id="legalentity" type="text" />
      </div>
      <div class="mb-3">
        <label for="netmineralacres">Net Mineral Acres: </label>
        <input v-model="netmineralacres" id="netmineralacres" type="text" />
      </div>
      <div class="mb-3">
        <label for="royalty">Mineral Owner Royalty: </label>
        <input v-model="mineralownerroyalty" id="royalty" type="text" />
      </div>
      <div class="mb-3">
        <label for="section">Section: </label>
        <input v-model="section" id="section" type="text" />
      </div>
      <div class="mb-3">
        <label for="township">Township: </label>
        <input v-model="township" id="township" type="text" />
      </div>
      <div class="mb-3">
        <label for="range">Range: </label>
        <input v-model="range" id="range" type="text" />
      </div>
      <div class="mb-3">
        <label for="titlesource">Title Source: </label>
        <select v-model="titlesource" id="titlesource">
          <option value="Class A">Class A</option>
          <option value="Class B">Class B</option>
          <option value="Class C">Class C</option>
          <option value="Class D">Class D</option>
        </select>
      </div>
    </form>
    <div class="content-center text-center">
      <button class="p-5 m-4" @click="$router.push('/')">Cancel</button>
      <button class="p-5 m-4" @click="submit()">Confirm</button>
    </div>
    <p class="text-red-500 text-center text-lg">{{ error }}</p>
  </div>
</template>