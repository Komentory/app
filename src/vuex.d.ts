import { ComponentCustomProperties } from 'vue'
import { Router } from 'vue-router'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    jwt_access_token: string
    jwt_expire_timestamp: number
    current_user: object
  }

  // Provide typings for `this.$store`.
  interface ComponentCustomProperties {
    $store: Store<State>
    $router: Router
  }
}
