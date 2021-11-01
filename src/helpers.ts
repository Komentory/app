// Define URL to the default user image (avatar) from Supabase bucket.
export const defaultUserImage = import.meta.env.VITE_DEFAULT_USER_IMAGE as string

// Define redirect URL after authentication.
export const loginWithProviderRedirectURL = import.meta.env.VITE_LOGIN_WITH_PROVIDER_REDIRECT_URL as string

// Define redirect URL after resetting password.
export const resetPasswordRedirectURL = import.meta.env.VITE_RESET_PASSWORD_REDIRECT_URL as string
