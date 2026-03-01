import { uploadImage } from '../../lib/cloudinary';

export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { file } = req.body;
    const imageUrl = await uploadImage(file);
    return res.status(200).json({ imageUrl });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
