import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME!,
    api_key: process.env.API_KEY!,
    api_secret: process.env.API_SECRET!
});

const uploadOnCloudinary = async (path: string, resourceType: "image" | "raw" | "auto" | "video") => {

    try {
        if (!path) {
            return null;
        }

        const response = await cloudinary.uploader.upload(path, { resource_type: resourceType });

        fs.unlinkSync(path);

        return response;

    } catch (error) {
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
        }
        return console.error("Error uploading file:", error);
    }
};

const deleteFromCloudinary = async (publicId: string, resourceType: "image" | "raw" | "auto" | "video") => {
    try {
        if (!publicId) {
            return "publicId is missing";
        }

        const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });

        return result;

    } catch (error) {
        return console.error('Error deleting image:', error);
    }
}

export { uploadOnCloudinary, deleteFromCloudinary };