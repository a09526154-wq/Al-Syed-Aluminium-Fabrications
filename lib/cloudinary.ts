import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "lpcqpx7a",
  api_key: process.env.CLOUDINARY_API_KEY || "349187281517524",
  api_secret: process.env.CLOUDINARY_API_SECRET || "3QaL90IL8x4EP8pXJbWlonl3c4o",
  secure: true,
});

export { cloudinary };

/**
 * Optimizes a Cloudinary URL with auto format and auto quality transformations.
 * E.g. https://res.cloudinary.com/demo/image/upload/sample.jpg ->
 *      https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/sample.jpg
 */
export function getOptimizedCloudinaryUrl(
  url: string,
  transformations: string = "f_auto,q_auto"
): string {
  if (!url) return "";
  if (!url.includes("res.cloudinary.com")) {
    return url; // Non-cloudinary URLs returned as-is
  }

  // Check if transformation is already present
  if (url.includes("/upload/f_auto") || url.includes("/upload/q_auto") || url.includes(`/upload/${transformations}/`)) {
    return url;
  }

  return url.replace("/upload/", `/upload/${transformations}/`);
}
