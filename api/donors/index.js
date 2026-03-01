import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const { bloodGroup } = req.query;
      const donors = await prisma.donor.findMany({
        where: bloodGroup ? { bloodGroup } : {},
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json(donors);
    }

    if (req.method === 'POST') {
      const { name, bloodGroup, phone, address, institute, lastDonation, imageUrl } = req.body;
      const donor = await prisma.donor.create({
        data: { name, bloodGroup, phone, address, institute, lastDonation: new Date(lastDonation), imageUrl },
      });
      return res.status(201).json(donor);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
