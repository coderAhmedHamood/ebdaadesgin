// Centralized helper to resolve image URLs coming from the DB
// If the stored value is absolute (starts with http), return as-is
// If it starts with '/', prepend API_ORIGIN
// Otherwise, assume it's a filename under /uploads

const API_ORIGIN = (typeof window !== 'undefined' && (import.meta as any)?.env?.VITE_API_ORIGIN)
  || 'https://ebdaadesign.com';

export function getImageUrl(img?: string | null): string {
  if (!img) return '';
  try {
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    if (img.startsWith('/')) return `${API_ORIGIN}${img}`;
    return `${API_ORIGIN}/uploads/${img}`;
  } catch {
    return img;
  }
}
