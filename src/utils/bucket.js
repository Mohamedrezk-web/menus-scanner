import { bucket } from '../config/db.config.js';

const uploadImageToBucket = async (file, destinationPath) => {
  const fileName = `${destinationPath}/${Date.now()}_${file.originalname}`;

  // Create file reference
  const fileRef = bucket.file(fileName);

  // Upload file
  await fileRef.save(file.buffer, {
    metadata: { contentType: file.mimetype },
  });

  // Get public URL
  const [url] = await fileRef.getSignedUrl({
    action: 'read',
    expires: '06-06-2025', // Long expiration for public assets
  });

  return url;
};

export { uploadImageToBucket };
