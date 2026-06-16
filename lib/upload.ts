// lib/upload.ts
import cloudinary from './cloudinary';

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: any; 
}

export const uploadToCloudinary = async (
  file: File, 
  folder: string = 'categories'
): Promise<CloudinaryUploadResult | null> => {
  if (!file) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'auto',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as CloudinaryUploadResult);
      }
    ).end(buffer);
  });
};

export const deleteFromCloudinary = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
};