import app from "../app";
import { spawn } from 'child_process';
import fs from 'fs'
import cloudinary from './config/cloudinary.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const upload = multer({dest: 'uploads/'});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.post('/detect-face', upload.single('image'), async (req, res)=>{
  const inputPath = req.file.path;
  const outputPath = `uploads/processed_${req.file.filename}.jpg`;

  const python = spawn('python', [
    path.join(__dirname, './utils/faceDetection.py'),
    inputPath,
    outputPath
  ]);
 python.stdout.on('data', (data) => console.log(`Python output: ${data}`));
  python.stderr.on('data', (data) => console.error(`Python error: ${data}`));
  python.on('close', async (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Face detection failed' });
    }

    if (!fs.existsSync(outputPath)) {
      return res.status(200).json({ message: 'No faces detected' });
    }

    try {
      // Upload processed image to Cloudinary
      const result = await cloudinary.uploader.upload(outputPath, {
        folder: 'face-detection',
      });

      // Cleanup local files
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);

      res.json({ url: result.secure_url });
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      res.status(500).json({ error: 'Cloudinary upload failed' });
    }
      });

});