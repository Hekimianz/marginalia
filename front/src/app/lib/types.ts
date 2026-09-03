export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: string | null;
}

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  updateAvatar: (file: File) => Promise<void>;
  deleteAccount: () => Promise<void>;
  updateNames: (firstName: string, lastName: string) => Promise<void>;
}

export interface CloudinarySignature {
  signature: string;
  timestamp: number;
  folder: string;
  apiKey: string;
  cloudName: string;
}
