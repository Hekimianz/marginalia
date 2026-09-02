import type { CloudinarySignature } from "./types";

export async function postToCloudinary(
  file: File,
  signature: CloudinarySignature,
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signature.apiKey);
  formData.append("timestamp", String(signature.timestamp));
  formData.append("signature", signature.signature);
  formData.append("folder", signature.folder);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.message);
  }
  const text = await res.text();
  return text ? await JSON.parse(text) : undefined;
}
