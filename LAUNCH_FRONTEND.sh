#!/bin/bash

# Mint of the Day - Frontend Launch Script
# This script will help you launch the frontend locally

echo "🎨 Mint of the Day - Frontend Launch"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo ""
    echo "Please install Node.js first:"
    echo "1. Visit https://nodejs.org"
    echo "2. Download LTS version (v18 or v20)"
    echo "3. Run installer and restart terminal"
    echo ""
    echo "OR use Homebrew (Mac):"
    echo "   brew install node"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ npm found: $(npm --version)"
echo ""

# Navigate to frontend directory
cd "$(dirname "$0")/frontend" || exit 1

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    echo "This may take a few minutes..."
    echo ""
    npm install

    if [ $? -ne 0 ]; then
        echo "❌ Installation failed"
        exit 1
    fi
    echo ""
    echo "✅ Dependencies installed!"
else
    echo "✅ Dependencies already installed"
fi

echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  No .env.local file found"
    echo ""
    echo "Creating .env.local from template..."
    cp .env.example .env.local
    echo ""
    echo "📝 IMPORTANT: Edit .env.local with your settings:"
    echo "   1. Add your contract address (after deployment)"
    echo "   2. Update NEXT_PUBLIC_CHAIN_ID (84532 for Sepolia, 8453 for Mainnet)"
    echo "   3. Add NEXT_PUBLIC_CDP_API_KEY (optional for now)"
    echo ""
    echo "For now, the app will run with demo/testnet settings"
    echo ""
fi

echo "🚀 Starting development server..."
echo ""
echo "The app will open at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "===================================="
echo ""

# Start the dev server
npm run dev
