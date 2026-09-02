export const paths = {
  login: "/auth/login",
  register: "/users/register",
  me: "/auth/me",
  logout: "/auth/logout",
  getAvatarSig: "/users/avatar/signature",
  avatar: "/users/avatar",
} as const;

export type PathValue = (typeof paths)[keyof typeof paths];
