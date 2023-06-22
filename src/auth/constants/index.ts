export enum AUTH_ACTIONS {
  EMAIL = 'email',
  GOOGLE = 'google',
  GITHUB = 'github',
}

export type AuthAction =
  | AUTH_ACTIONS.EMAIL
  | AUTH_ACTIONS.GITHUB
  | AUTH_ACTIONS.GOOGLE
  | undefined
