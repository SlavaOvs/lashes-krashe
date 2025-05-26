const API = import.meta.env.VITE_API;   // URL берётся из Build-variables

export async function api<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw await res.json();
  return res.json();
}