<template>
  <div id="app">
    <ExampleComponent />
  </div>
</template>

<script>
  // import { mapGetters, mapActions, mapMutations } from 'vuex'
  // import Store from '~/store'
  import ExampleComponent from '~/components/ExampleComponent'

  export default {
    name: 'app',
    components: {
      ExampleComponent
    },
    data: () => {
      return {
      }
    },
    computed: {
    },
    created() {
    },
    methods: {
    }
  }
</script>