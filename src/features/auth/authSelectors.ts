import type { RootState } from '../../app/store'

export const selectToken  = (s: RootState) => s.auth.token
export const selectUserId = (s: RootState) => s.auth.userId
export const selectEmail  = (s: RootState) => s.auth.email
