import { paths, PathValue } from "./paths";
import { User } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
let refreshPromise: Promise<void> | null = null;

async function sendRequest(
  path: PathValue,
  options: RequestInit,
  token: string | null,
): Promise<Response> {
  try {
    return await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error(
      "We couldn’t connect to Marginalia. Check your connection and try again.",
    );
  }
}

async function refresh() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    clearSession();
    throw new Error("No refresh token");
  }
  const res = await sendRequest(
    paths.refresh,
    {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
    },
    null,
  );
  if (res.status === 401) {
    clearSession();
    throw new Error("Invalid refresh token");
  }
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.message);
  }
  const data: { refresh_token: string; access_token: string } =
    await res.json();
  localStorage.setItem("refresh_token", data.refresh_token);
  localStorage.setItem("access_token", data.access_token);
}

function clearSession() {
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("access_token");
  if (window.location.pathname !== "/login") {
    window.location.replace("/login");
  }
}

export async function apiFetch(path: PathValue, options: RequestInit = {}) {
  const token = localStorage.getItem("access_token");
  let res = await sendRequest(path, options, token);
  if (res.status === 401 && token) {
    if (!refreshPromise) {
      refreshPromise = refresh().finally(() => {
        refreshPromise = null;
      });
    }
    await refreshPromise;
    const newToken = localStorage.getItem("access_token");
    res = await sendRequest(path, options, newToken);
  }
  if (res.status === 401 && token) {
    clearSession();
    throw new Error("Your session is no longer valid");
  }
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

export async function deleteAccount() {
  await apiFetch(paths.deleteAccount, {
    method: "PATCH",
  });
}

export async function changeNames(body: {
  firstName?: string;
  lastName?: string;
}) {
  return await apiFetch(paths.changeNames, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}
