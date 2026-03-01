# Blood Bank Database Setup Guide

## Step 1: Install Dependencies
```bash
npm install @prisma/client cloudinary
npm install -D prisma
```

## Step 2: Setup Neon Database
1. Go to https://neon.tech
2. Create free account
3. Create new project: "dreamers-blood-bank"
4. Copy connection string

## Step 3: Setup Cloudinary
1. Go to https://cloudinary.com
2. Create free account
3. Get: Cloud Name, API Key, API Secret

## Step 4: Configure Environment Variables
Create `.env` file in root:
```
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

## Step 5: Initialize Database
```bash
npx prisma generate
npx prisma db push
```

## Step 6: Add to Vercel
In Vercel Dashboard → Settings → Environment Variables:
- Add all variables from .env
- Redeploy

## API Endpoints Created:
- GET /api/donors - Get all donors
- GET /api/donors?bloodGroup=A+ - Filter by blood group
- POST /api/donors - Create donor
- PUT /api/donors/[id] - Update donor
- DELETE /api/donors/[id] - Delete donor
- POST /api/upload - Upload image

## Test API:
```bash
# Get all donors
curl http://localhost:3000/api/donors

# Create donor
curl -X POST http://localhost:3000/api/donors \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","bloodGroup":"A+","phone":"+123","address":"Dhaka","institute":"NSTU","lastDonation":"2024-01-01"}'
```
