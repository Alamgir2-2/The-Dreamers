const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const donorAPI = {
  getAll: async (bloodGroup = null) => {
    try {
      const url = bloodGroup ? `${API_URL}/donors?bloodGroup=${bloodGroup}` : `${API_URL}/donors`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch donors');
      return res.json();
    } catch (error) {
      console.error('API Error:', error);
      return [];
    }
  },

  create: async (donor) => {
    const res = await fetch(`${API_URL}/donors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donor),
    });
    return res.json();
  },

  update: async (id, donor) => {
    const res = await fetch(`${API_URL}/donors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donor),
    });
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_URL}/donors/${id}`, { method: 'DELETE' });
    return res.json();
  },
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  return res.json();
};
