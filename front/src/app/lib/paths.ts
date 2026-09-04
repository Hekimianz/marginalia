export const paths = {
  refresh: "/auth/refresh",
  login: "/auth/login",
  register: "/users/register",
  me: "/auth/me",
  logout: "/auth/logout",
  getAvatarSig: "/users/avatar/signature",
  avatar: "/users/avatar",
  deleteAccount: "/users/delete",
  changeNames: "/users/edit",
} as const;

export type PathValue = (typeof paths)[keyof typeof paths];
