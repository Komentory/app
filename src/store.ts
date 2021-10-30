import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { useToast } from 'vue-toastification'
import { supabase } from '__/supabase'
import { router } from '__/router'
import * as store_const from '__/store-constants'

/**
 * @name State
 * @description Define your typings for the store state.
 */
export interface State {
  // User from the Supabase.
  user: {
    id: string
    aud: string
    role: string
    email: string
    email_confirmed_at: Date
    phone: string
    confirmed_at: Date
    email_change_confirm_status: 0
    last_sign_in_at: Date
    app_metadata: { provider: string }
    user_metadata: {}
    created_at: Date
    updated_at: Date
  }
}

// Define injection key.
export const key: InjectionKey<Store<State>> = Symbol()

/**
 * @name useStore
 * @description Define my own `useStore` composition function. Now, by importing your own composable function,
 * you can retrieve the typed store without having to provide the injection key and its typing.
 */
export function useStore() {
  return baseUseStore(key)
}

// Define store.
export const store = createStore<State>({
  state: {
    /**
     * @name user
     * @description the user state.
     */
    user: <State['user']>{},
  },
  getters: {
    /**
     * @name isUserLoggedIn
     * @description getter for checking if user is logged in.
     */
    isUserLoggedIn(state) {
      return state.user.id !== undefined // return true, if user is logged out
    },
  },
  mutations: {
    /**
     * @name USER_MUTATE
     * @description mutate user object to store.
     */
    [store_const.USER_MUTATE](state, user) {
      state.user = user
    },
  },
  actions: {
    /**
     * @name REGISTER_ACTION
     * @description Action for register a new user.
     * @param dispatch object with access to dispatch action
     * @param form object with email and password
     */
    async [store_const.REGISTER_ACTION]({ dispatch }, form) {
      try {
        // Call signUp() method from Supabase.
        // See: https://supabase.io/docs/reference/javascript/auth-signup
        const { error } = await supabase.auth.signUp(
          { email: form.email, password: form.password },
          { data: form.user_metadata },
        )
        // If something went wrong, throw error.
        if (error) throw error
        // Show toast with success message.
        useToast().success(`You've been registered successfully! Redirect to your account.`)
        // Go to LOGIN_ACTION for logging in.
        await dispatch(store_const.LOGIN_ACTION, form)
      } catch (error: any) {
        // Show toast with error message.
        if (error.status === 400) useToast().error(`Oops... User with this email address already exists!`)
        else useToast().error(error.error_description || error.message)
      }
    },
    /**
     * @name LOGIN_ACTION
     * @description Action for logging in user.
     * @param commit object with access to commit action
     * @param form object with email and password
     */
    async [store_const.LOGIN_ACTION]({ commit }, form) {
      try {
        // Call signIn() method from Supabase.
        // See: https://supabase.io/docs/reference/javascript/auth-signin
        const { error, user } = await supabase.auth.signIn({ email: form.email, password: form.password })
        // If something went wrong, throw error.
        if (error) throw error
        // Show toast with success message.
        useToast().success(`Hey, friend! Welcome to your account.`)
        // Mutate store's state with the user object.
        commit(store_const.USER_MUTATE, user)
        // Catch saved route in ?redirect= query.
        const { redirect } = router.currentRoute.value.query
        // Checking, if redirect route is exists.
        redirect
          ? await router.replace({ path: redirect as string }) // replace current route with redirect path
          : await router.push({ name: 'account' }) // or just push account page
      } catch (error: any) {
        // Show toast with error message.
        if (error.status === 400) useToast().error(`Oops... Wrong email address or password!`)
        else useToast().error(error.error_description || error.message)
      }
    },
    /**
     * @name LOGOUT_ACTION
     * @description Action for logging out user.
     * @param commit object with access to commit action
     */
    async [store_const.LOGOUT_ACTION]({ commit }) {
      try {
        // Call signOut() method from Supabase.
        // See: https://supabase.io/docs/reference/javascript/auth-signout
        const { error } = await supabase.auth.signOut()
        // // If something went wrong, throw error.
        if (error) throw error
        // Show toast with info message.
        useToast().info(`You're out. We'll be waiting for you again!`)
        // Push login page.
        await router.push({ name: 'login' })
      } catch (error: any) {
        // Show toast with error message.
        useToast().error(error.error_description || error.message)
      } finally {
        // In any case, we mutate store's state with the empty user object.
        commit(store_const.USER_MUTATE, <State['user']>{})
      }
    },
  },
})
