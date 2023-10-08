import multer from "multer";
import path from "path";
import fs from "fs";

export interface UploadedPostImage {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
    buffer: Buffer; // This line specifies that the object should have a 'buffer' property of type Buffer
  }

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = "./uploads/posts/";
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    cb(null, "uploads/posts/");
  },
  filename: (req, file, cb) => {
    const fileName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, fileName);

    // if (!req.body.images) {
    //   req.body.images = [];
    // }

    // req.body.images.push(fileName);
  },
});
export const postsUpload = multer({ dest: "uploads/posts/", storage: storage });