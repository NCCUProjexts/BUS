import { createSelector } from "reselect"

export const isLoggedIn = createSelector(
  (state) => state.auth.googleProfile,
  (googleProfile) => googleProfile != null
)

export const googleProfile = createSelector(
  (state) => state.auth.googleProfile,
  (profile) => {
    if(profile) return profile;
    return {
      email: '',
      displayName: '',
      photoURL: '',
      locale: 'zh-TW',
    }
  }
)