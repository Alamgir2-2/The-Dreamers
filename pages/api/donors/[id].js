import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, bloodGroup, phone, address, institute, lastDonation, imageUrl } = req.body;
    const donor = await prisma.donor.update({
      where: { id },
      data: { name, bloodGroup, phone, address, institute, lastDonation: new Date(lastDonation), imageUrl },
    });
    return res.status(200).json(donor);
  }

  if (req.method === 'DELETE') {
    await prisma.donor.delete({ where: { id } });
    return res.status(200).json({ message: 'Donor deleted' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
