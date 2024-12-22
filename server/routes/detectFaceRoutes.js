import { spawn } from 'child_process';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const router = express.Router();
const upload = multer(); // Memory storage for multer

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const python = spawn('python', [
    path.join(__dirname, '../utils/faceDetection.py'),
    '-', // Indicating input from stdin
    '-', // Indicating output to stdout
  ]);

  let processedImageBuffer = Buffer.alloc(0);

  python.stdin.write(req.file.buffer);
  python.stdin.end();

  python.stdout.on('data', (data) => {
    processedImageBuffer = Buffer.concat([processedImageBuffer, data]);
  });

  python.stderr.on('data', (data) => {
    console.error(`Python error: ${data}`);
  });

  python.on('close', async (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Face detection failed' });
    }

    try {
      // Upload processed image to Cloudinary
      const result = await cloudinary.uploader.upload_stream({
        folder: 'face-detection',
      }, (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ error: 'Cloudinary upload failed' });
        }
        res.json({ url: result.secure_url });
      }).end(processedImageBuffer);
    } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).json({ error: 'Image processing failed' });
    }
  });
});

export default router;
