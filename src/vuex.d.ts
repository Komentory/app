import { ComponentCustomProperties } from 'vue'
import { Router } from 'vue-router'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    user: object
  }

  // Provide typings for `this.$store`.
  interface ComponentCustomProperties {
    $store: Store<State>
    $router: Router
  }
}
