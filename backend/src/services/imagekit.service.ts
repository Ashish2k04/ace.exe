import { ImageKit } from "@imagekit/nodejs";
import { config } from "../config/config.js";

const imagekit = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY 
});

async function uploadImage(file: Buffer, fileName: string) {
         const result = imagekit.files.upload({
           file: file.toString('base64'),
           fileName: fileName,
           folder: 'ace_exe'
     })

        return result;
}


async function deleteImage(fileId: string) {
    return await imagekit.files.delete(fileId);
}

export default uploadImage;
export { deleteImage };