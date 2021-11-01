import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { useToast } from 'vue-toastification'
import { User as ISupabaseUser } from '@supabase/supabase-js'
import { supabase } from '__/supabase'
import { router } from '__/router'
import { loginWithProviderRedirectURL } from '__/helpers'
import * as store_const from '__/store-constants'

/**
 * @name State
 * @description Define your typings for the store state.
 */
export interface State {
  user: ISupabaseUser // user model from the Supabase
}

/**
 * @name key
 * @description Define injection key for custom store.
 */
export const key: InjectionKey<Store<State>> = Symbol()

/**
 * @name useStore
 * @description Define my own `useStore` composition function. Now, by importing your own composable function,
 * you can retrieve the typed store without having to provide the injection key and its typing.
 */
export function useStore() {
  return baseUseStore(key)
}

/**
 * @name store
 * @description Define default store with custom state.
 */
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
        // Validating form fields.
        if (form.user_metadata.full_name === '') throw new Error(`Oops... Full name field is required!`)
        if (form.email === '') throw new Error(`Oops... Email address field is required!`)
        if (form.password === '') throw new Error(`Oops... Password field is required!`)
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
        await dispatch(store_const.LOGIN_WITH_EMAIL_ACTION, form)
      } catch (error: any) {
        // Show toast with error message.
        if (error.status === 400) useToast().error(`Oops... User with this email address already exists!`)
        else useToast().error(error.error_description || error.message)
      }
    },
    /**
     * @name LOGIN_WITH_EMAIL_ACTION
     * @description Action for logging user with email and password.
     * @param commit object with access to commit action
     * @param form object with email and password
     */
    async [store_const.LOGIN_WITH_EMAIL_ACTION]({ commit }, form) {
      try {
        // Call signIn() method from Supabase.
        // See: https://supabase.io/docs/reference/javascript/auth-signin
        const { error, user } = await supabase.auth.signIn({ email: form.email, password: form.password })
        // If something went wrong, throw error.
        if (error) throw error
        // Show toast with success message.
        useToast().success(`Hey, friend. Welcome to your account!`)
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
     * @name LOGIN_WITH_GOOGLE_ACTION
     * @description Action for logging user with Google account.
     */
    async [store_const.LOGIN_WITH_GOOGLE_ACTION]() {
      try {
        // Call signIn() method from Supabase.
        // See: https://supabase.io/docs/guides/auth/auth-google
        const { error } = await supabase.auth.signIn(
          { provider: 'google' },
          { redirectTo: loginWithProviderRedirectURL },
        )
        // If something went wrong, throw error.
        if (error) throw error
      } catch (error: any) {
        // Show toast with error message.
        if (error.status === 400) useToast().error(`Oops... Something went wrong with the Google authentication!`)
        else useToast().error(error.error_description || error.message)
      }
    },
    /**
     * @name LOGIN_WITH_FACEBOOK_ACTION
     * @description Action for logging user with Facebook account.
     */
    async [store_const.LOGIN_WITH_FACEBOOK_ACTION]() {
      try {
        // Call signIn() method from Supabase.
        // See: https://supabase.io/docs/guides/auth/auth-facebook
        const { error } = await supabase.auth.signIn(
          { provider: 'facebook' },
          { redirectTo: loginWithProviderRedirectURL },
        )
        // If something went wrong, throw error.
        if (error) throw error
      } catch (error: any) {
        // Show toast with error message.
        if (error.status === 400) useToast().error(`Oops... Something went wrong with the Facebook authentication!`)
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
