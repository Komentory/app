// Define environment variables.
export const {
  VITE_DEFAULT_USER_IMAGE: defaultUserImage, // URL to the default user image (avatar) from Supabase bucket
  VITE_LOGIN_WITH_PROVIDER_REDIRECT_URL: loginWithProviderRedirectURL, // redirect URL after authentication
  VITE_RESET_PASSWORD_REDIRECT_URL: resetPasswordRedirectURL, // redirect URL after resetting password
} = import.meta.env

// Define function for getting hash from URL by given name.
// See: https://github.com/supabase/supabase/blob/master/examples/vue3-ts-todo-list/src/lib/helpers.ts
export function getHashValueByName(name: string, url: string) {
  // Searching for the hash value by name.
  const results = new RegExp('[?&#]' + name.replace(/[[]]/g, '\\$&') + '(=([^&#]*)|&|#|$)').exec(url)
  // Checking, if results are exists.
  if (!results || !results[2]) return ''
  // Returning the hash value.
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
