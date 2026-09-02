import { paths, PathValue } from "./paths";
import { User } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path: PathValue, options: RequestInit = {}) {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.message);
  }
  const text = await res.text();
  return text ? await JSON.parse(text) : undefined;
}

export async function login(email: string, password: string) {
  const data = await apiFetch(paths.login, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
}

export async function register(
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
) {
  const firstNameFormatted =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const lastNameFormatted =
    lastName.charAt(0).toUpperCase() + lastName.slice(1);
  await apiFetch(paths.register, {
    method: "POST",
    body: JSON.stringify({
      firstName: firstNameFormatted,
      lastName: lastNameFormatted,
      username,
      email,
      password,
    }),
  });
}

export async function logout(refresh_token: string) {
  await apiFetch(paths.logout, {
    method: "POST",
    body: JSON.stringify({ refresh_token }),
  });
}

export async function getAvatarSig() {
  return await apiFetch(paths.getAvatarSig);
}

export async function changeAvatarUrl(url: string): Promise<User> {
  return await apiFetch(paths.avatar, {
    method: "PATCH",
    body: JSON.stringify({ url }),
  });
}
