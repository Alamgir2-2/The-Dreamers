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
    const isAdmin = email === 'mahalamgir1213@gmail.com';
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, isAdmin },
    });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
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
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
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

    console.log('Uploading to Cloudinary...');
    const result = await cloudinary.uploader.upload(file, {
      folder: 'dreamers-users',
      resource_type: 'auto'
    });
    
    console.log('Upload successful:', result.secure_url);
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Branch CRUD
app.get('/api/branches', async (req, res) => {
  try {
    const branches = await prisma.branch.findMany({ orderBy: { createdAt: 'asc' } });
    res.json(branches);
  } catch (error) { res.status(500).json({ error: error.message }); }
});
app.get('/api/branches/:id', async (req, res) => {
  try {
    const branch = await prisma.branch.findUnique({ where: { id: req.params.id } });
    if (!branch) return res.status(404).json({ error: 'Not found' });
    res.json(branch);
  } catch (error) { res.status(500).json({ error: error.message }); }
});
app.post('/api/branches', async (req, res) => {
  try {
    const { name, location, phone, email, yearsActive, bloodDonations, presidentId, presidentEducation, presidentQuote, presidentMission, memberIds, eventIds } = req.body;
    const branch = await prisma.branch.create({ data: { name, location, phone, email, yearsActive: yearsActive||0, bloodDonations: bloodDonations||0, presidentId, presidentEducation, presidentQuote, presidentMission, memberIds: memberIds||[], eventIds: eventIds||[] } });
    res.status(201).json(branch);
  } catch (error) { res.status(500).json({ error: error.message }); }
});
app.put('/api/branches/:id', async (req, res) => {
  try {
    const { name, location, phone, email, yearsActive, bloodDonations, presidentId, presidentEducation, presidentQuote, presidentMission, memberIds, eventIds } = req.body;
    const branch = await prisma.branch.update({ where: { id: req.params.id }, data: { name, location, phone, email, yearsActive: yearsActive||0, bloodDonations: bloodDonations||0, presidentId, presidentEducation, presidentQuote, presidentMission, memberIds: memberIds||[], eventIds: eventIds||[] } });
    res.json(branch);
  } catch (error) { res.status(500).json({ error: error.message }); }
});
app.delete('/api/branches/:id', async (req, res) => {
  try {
    await prisma.branch.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// OrgPositions
app.get('/api/org-positions', async (req, res) => {
  try {
    const positions = await prisma.orgPosition.findMany({ orderBy: { createdAt: 'asc' } });
    res.json(positions);
  } catch (error) { res.status(500).json({ error: error.message }); }
});
app.post('/api/org-positions', async (req, res) => {
  try {
    const { name } = req.body;
    const position = await prisma.orgPosition.create({ data: { name } });
    res.status(201).json(position);
  } catch (error) { res.status(500).json({ error: error.message }); }
});
app.delete('/api/org-positions/:id', async (req, res) => {
  try {
    await prisma.orgPosition.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// OrgBranches
app.get('/api/org-branches', async (req, res) => {
  try {
    const branches = await prisma.orgBranch.findMany({ orderBy: { createdAt: 'asc' } });
    res.json(branches);
  } catch (error) { res.status(500).json({ error: error.message }); }
});
app.post('/api/org-branches', async (req, res) => {
  try {
    const { name } = req.body;
    const branch = await prisma.orgBranch.create({ data: { name } });
    res.status(201).json(branch);
  } catch (error) { res.status(500).json({ error: error.message }); }
});
app.delete('/api/org-branches/:id', async (req, res) => {
  try {
    await prisma.orgBranch.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// Toggle admin role
app.put('/api/members/:id/make-admin', async (req, res) => {
  try {
    const { id } = req.params;
    const { isAdmin } = req.body;
    const user = await prisma.user.update({ where: { id }, data: { isAdmin } });
    res.json({ id: user.id, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete member (admin)
app.delete('/api/members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    res.json({ message: 'Member deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update member org info (admin)
app.put('/api/members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { orgPosition, orgBranch } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data: { orgPosition, orgBranch },
    });
    res.json({ id: user.id, orgPosition: user.orgPosition, orgBranch: user.orgBranch });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Events CRUD
app.get('/api/events', async (req, res) => {
  try {
    const events = await prisma.event.findMany({ orderBy: { date: 'desc' } });
    res.json(events);
  } catch (error) { res.status(500).json({ error: error.message }); }
});
app.post('/api/events', async (req, res) => {
  try {
    const { title, description, date, location, image } = req.body;
    const event = await prisma.event.create({ data: { title, description, date: new Date(date), location, image } });
    res.status(201).json(event);
  } catch (error) { res.status(500).json({ error: error.message }); }
});
app.put('/api/events/:id', async (req, res) => {
  try {
    const { title, description, date, location, image } = req.body;
    const event = await prisma.event.update({ where: { id: req.params.id }, data: { title, description, date: new Date(date), location, image } });
    res.json(event);
  } catch (error) { res.status(500).json({ error: error.message }); }
});
app.delete('/api/events/:id', async (req, res) => {
  try {
    await prisma.event.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (error) { res.status(500).json({ error: error.message }); }
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
        isAdmin: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
