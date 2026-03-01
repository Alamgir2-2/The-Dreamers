import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const JWT_SECRET = process.env.JWT_SECRET || 'dreamers-secret-key';

// Register user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile
app.get('/api/user/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const { userId } = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    delete user.password;
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Update user profile
app.put('/api/user/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const { userId } = jwt.verify(token, JWT_SECRET);
    const { name, photo, school, sscBatch, college, hscBatch, university, department, bloodGroup, mobile, permanentAddress, currentAddress, professionType, institution, designation, specialization, orgPosition, orgBranch, orgJoinDate, lastBloodDonation } = req.body;
    const user = await prisma.user.update({
      where: { id: userId },
      data: { name, photo, school, sscBatch, college, hscBatch, university, department, bloodGroup, mobile, permanentAddress, currentAddress, professionType, institution, designation, specialization, orgPosition, orgBranch, orgJoinDate: orgJoinDate ? new Date(orgJoinDate) : null, lastBloodDonation: lastBloodDonation ? new Date(lastBloodDonation) : null },
    });
    delete user.password;
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all donors by blood group from User table
app.get('/api/donors', async (req, res) => {
  try {
    const { bloodGroup } = req.query;
    const donors = await prisma.user.findMany({
      where: bloodGroup ? { bloodGroup } : {},
      select: {
        id: true,
        name: true,
        photo: true,
        bloodGroup: true,
        mobile: true,
        currentAddress: true,
        professionType: true,
        institution: true,
        lastBloodDonation: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(donors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create donor
app.post('/api/donors', async (req, res) => {
  try {
    const { name, bloodGroup, phone, address, institute, lastDonation, imageUrl } = req.body;
    const donor = await prisma.donor.create({
      data: { name, bloodGroup, phone, address, institute, lastDonation: new Date(lastDonation), imageUrl },
    });
    res.status(201).json(donor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update donor
app.put('/api/donors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bloodGroup, phone, address, institute, lastDonation, imageUrl } = req.body;
    const donor = await prisma.donor.update({
      where: { id },
      data: { name, bloodGroup, phone, address, institute, lastDonation: new Date(lastDonation), imageUrl },
    });
    res.json(donor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete donor
app.delete('/api/donors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.donor.delete({ where: { id } });
    res.json({ message: 'Donor deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload image to Cloudinary
app.post('/api/upload', async (req, res) => {
  try {
    const { file } = req.body;
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const result = await cloudinary.uploader.upload(file, {
      folder: 'dreamers-users',
      resource_type: 'auto'
    });
    
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all members
app.get('/api/members', async (req, res) => {
  try {
    const members = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        photo: true,
        orgPosition: true,
        professionType: true,
        institution: true,
        designation: true,
        school: true,
        college: true,
        university: true,
        bloodGroup: true,
        lastBloodDonation: true,
        orgBranch: true,
        currentAddress: true,
        mobile: true,
        email: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export for Vercel serverless
export default async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  return app(req, res);
};
