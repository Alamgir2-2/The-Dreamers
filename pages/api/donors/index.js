import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
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
}
