#!/bin/bash

# Set Node.js path
export PATH="/usr/local/Cellar/node/24.10.0/bin:$PATH"

# Navigate to frontend
cd "$(dirname "$0")/frontend"

# Deploy to Vercel
vercel --prod --yes
