<template>
  <div>
    <q-input
      :v-model="search"
      clearable
      @input="filterFn"
      rounded
      type="search"
      label="Krankenhäuser in meiner Nähe"
    >
      <template v-slot:append>
        <q-icon name="fas fa-map-marker-alt" />
      </template>
    </q-input>
    <q-list separator>
      <q-item
        v-for="item in options"
        :key="item"
        clickable
        v-ripple
        @click="() => handleHospitalSelect(item)"
      >
        {{ item }}
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, SetupContext } from '@vue/composition-api'

function useAutocomplete(context: SetupContext) {
  const stringOptions = [
    'Freiburg Krankenhaus',
    'Emmendingen Krankenhaus',
    'Stuttgart Krankenhaus',
  ]
  const options: Ref<string[]> = ref([])
  const selectedHospital = ref('')
  const search = ref('')
  function filterFn(val: string) {
    if (val) {
      const needle = val.toLowerCase()
      options.value = stringOptions.filter(
        (v: string) => v.toLowerCase().indexOf(needle) > -1,
      )
    } else {
      options.value = []
    }
  }

  function handleHospitalSelect(val: string) {
    selectedHospital.value = val
    context.emit('input', val)
  }

  return {
    search,
    selectedHospital,
    options,
    filterFn,
    handleHospitalSelect,
  }
}

export default defineComponent({
  name: 'HospitalSearch',
  setup(props, context) {
    return { ...useAutocomplete(context) }
  },
})
</script>

<style module lang="scss">
.searchBar {
  width: 60vw;
  height: 50vh;
}
</style>