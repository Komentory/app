import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { useToast } from 'vue-toastification'
import {
  MailIcon as Mail,
  ShieldExclamationIcon as Shield,
  LockOpenIcon as SuccessLogin,
  ExclamationIcon as Warning,
  InformationCircleIcon as Info,
  CheckIcon as Okay,
} from '@heroicons/vue/outline'
import { User as ISupabaseUser } from '@supabase/supabase-js'
import { supabase } from '__/supabase'
import { router } from '__/router'
import { loginWithProviderRedirectURL, resetPasswordRedirectURL } from '__/helpers'
import * as store_const from '__/store-constants'

/**
 * @name State
 * @description Define your typings for the store state.
 */
export interface State {
  user: ISupabaseUser // user model from the Supabase
  loading: boolean // loading state
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
    /**
     * @name loading
     * @description the loading state.
     */
    loading: false,
  },
  getters: {
    /**
     * @name isUserLoggedIn
     * @description getter for checking if user is logged in.
     */
    isUserLoggedIn(state) {
      return state.user.id !== undefined // return true, if user is logged out
    },
    /**
     * @name isLoading
     * @description getter for checking loading state.
     */
    isLoading(state) {
      return state.loading
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
    /**
     * @name LOADING_MUTATE
     * @description mutate loading state in store.
     */
    [store_const.LOADING_MUTATE](state) {
      state.loading = !state.loading
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
        if (form.user_metadata.full_name.length === 0) throw new Error(`Oops... Full name field is required!`)
        if (form.email.length === 0) throw new Error(`Oops... Email address field is required!`)
        if (!/.+@.+\..+/i.test(form.email)) throw new Error(`Oops... Email address is not valid!`)
        if (form.password.length === 0) throw new Error(`Oops... Password field is required!`)
        // Call signUp() method from Supabase.
        // See: https://supabase.io/docs/reference/javascript/auth-signup
        const { error } = await supabase.auth.signUp(
          { email: form.email, password: form.password },
          { data: form.user_metadata },
        )
        // If something went wrong, throw error.
        if (error) throw error
        // Show toast with success message.
        useToast().success(`You've been registered successfully! Redirect to your account.`, { icon: Okay })
        // Go to LOGIN_ACTION for logging in.
        await dispatch(store_const.LOGIN_WITH_EMAIL_ACTION, form)
      } catch (error: any) {
        // Show toast with error message.
        if (error.status === 400) useToast().error(`Oops... User is already exists! Try to login?`, { icon: Shield })
        else useToast().error(error.error_description || error.message, { icon: Warning })
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
        // Start loading.
        commit(store_const.LOADING_MUTATE)
        // Validating form fields.
        if (form.email.length === 0) throw new Error(`Oops... Email address field is required!`)
        if (!/.+@.+\..+/i.test(form.email)) throw new Error(`Oops... Email address is not valid!`)
        if (form.password.length === 0) throw new Error(`Oops... Password field is required!`)
        // Call signIn() method from Supabase.
        // See: https://supabase.io/docs/reference/javascript/auth-signin
        const { error, user } = await supabase.auth.signIn({ email: form.email, password: form.password })
        // If something went wrong, throw error.
        if (error) throw error
        // Show toast with success message.
        useToast().success(`Hey, friend. Welcome to your account!`, { icon: SuccessLogin })
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
        if (error.status === 400) useToast().error(`Oops... Wrong email address or password!`, { icon: Shield })
        else useToast().error(error.error_description || error.message, { icon: Warning })
      } finally {
        // Stop loading.
        commit(store_const.LOADING_MUTATE)
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
          { redirectTo: loginWithProviderRedirectURL as string },
        )
        // If something went wrong, throw error.
        if (error) throw error
      } catch (error: any) {
        // Show toast with error message.
        if (error.status === 400) useToast().error(`Oops... Something wrong with the Google auth!`, { icon: Shield })
        else useToast().error(error.error_description || error.message, { icon: Warning })
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
          { redirectTo: loginWithProviderRedirectURL as string },
        )
        // If something went wrong, throw error.
        if (error) throw error
      } catch (error: any) {
        // Show toast with error message.
        if (error.status === 400) useToast().error(`Oops... Something wrong with the Facebook auth!`, { icon: Shield })
        else useToast().error(error.error_description || error.message, { icon: Warning })
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
        // If something went wrong, throw error.
        if (error) throw error
        // Show toast with info message.
        useToast().info(`You're out. We'll be waiting for you again!`, { icon: Info })
        // Push login page.
        await router.push({ name: 'login' })
      } catch (error: any) {
        // Show toast with error message.
        useToast().error(error.error_description || error.message, { icon: Warning })
      } finally {
        // In any case, we mutate store's state with the empty user object.
        commit(store_const.USER_MUTATE, <State['user']>{})
      }
    },
    /**
     * @name RESET_PASSWORD_ACTION
     * @description Action for resetting password.
     * @param form object with email
     */
    async [store_const.RESET_PASSWORD_ACTION]({ commit }, form) {
      try {
        // Start loading.
        commit(store_const.LOADING_MUTATE)
        // Validating form fields.
        if (form.email.length === 0) throw new Error(`Oops... Email address field is required!`)
        if (!/.+@.+\..+/i.test(form.email)) throw new Error(`Oops... Email address is not valid!`)
        // Call resetPasswordForEmail() method from Supabase.
        // See: https://supabase.io/docs/reference/javascript/reset-password-email
        const { error } = await supabase.auth.api.resetPasswordForEmail(form.email, {
          redirectTo: resetPasswordRedirectURL as string,
        })
        // If something went wrong, throw error.
        if (error) throw error
        // Show toast with info message.
        useToast().warning(`Please check your email. The magic link was successfully sent!`, { icon: Mail })
      } catch (error: any) {
        // Show toast with error message.
        useToast().error(error.error_description || error.message, { icon: Warning })
      } finally {
        // Stop loading.
        commit(store_const.LOADING_MUTATE)
      }
    },
    /**
     * @name RENEW_PASSWORD_ACTION
     * @description Action for resetting password.
     * @param form object with access_token, new_password and new_password_again
     */
    async [store_const.RENEW_PASSWORD_ACTION]({ commit }, form) {
      try {
        // Start loading.
        commit(store_const.LOADING_MUTATE)
        // Validating form fields.
        if (form.access_token.length === 0) throw new Error(`Oops... Access token from the magic link is not valid!`)
        if (form.new_password.length === 0) throw new Error(`Oops... New password field is required!`)
        if (form.new_password_again.length === 0) throw new Error(`Oops... Re-type new password field is required!`)
        // Call updateUser() method from Supabase.
        // See: https://supabase.io/docs/reference/javascript/reset-password-email#notes
        const { error } = await supabase.auth.api.updateUser(form.access_token, { password: form.new_password })
        // If something went wrong, throw error.
        if (error) throw error
        // Show toast with info message.
        useToast().success(`Okay. Your password was updated successfully!`, { icon: Okay })
        // Push login page.
        await router.push({ name: 'account' })
      } catch (error: any) {
        // Show toast with error message.
        useToast().error(error.error_description || error.message, { icon: Warning })
      } finally {
        // Stop loading.
        commit(store_const.LOADING_MUTATE)
      }
    },
  },
})
