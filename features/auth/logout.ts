import { cookies } from 'next/headers';

export async function logout() {
  document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  window.location.href = '/login';
}