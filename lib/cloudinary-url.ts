/**
 * Pure URL transformation helper for Cloudinary image URLs.
 * Safe for use in both Client and Server Components (no Node.js modules).
 */
export function getOptimizedCloudinaryUrl(
  url: string,
  transformations: string = "f_auto,q_auto"
): string {
  if (!url) return "";
  if (!url.includes("res.cloudinary.com")) {
    return url; // Return non-Cloudinary images as-is
  }

  // Avoid duplicate transformation strings
  if (
    url.includes("/upload/f_auto") ||
    url.includes("/upload/q_auto") ||
    url.includes(`/upload/${transformations}/`)
  ) {
    return url;
  }

  return url.replace("/upload/", `/upload/${transformations}/`);
}
