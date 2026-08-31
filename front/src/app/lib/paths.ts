export const paths = {
  login: "/auth/login",
  register: "/users/register",
  me: "/auth/me",
  logout: "/auth/logout",
} as const;

export type PathValue = (typeof paths)[keyof typeof paths];
