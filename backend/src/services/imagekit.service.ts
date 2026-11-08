import { ImageKit } from "@imagekit/nodejs";
import { config } from "../config/config.js";

const imagekit = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY 
});

async function uploadImage(file: Buffer, fileName: string) {
         const result = imagekit.files.upload({
           file: file.toString('base64'),
           fileName: fileName + ".jpg",
           folder: 'ace_exe'
     })

        return result;
}

export default uploadImage;