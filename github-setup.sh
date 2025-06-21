#!/bin/bash

# Murmur App - GitHub Setup Script
echo "🎵 Setting up Murmur App for GitHub..."

# Initialize git repository if not already done
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "🎉 Initial commit: Murmur voice-first recommendation platform

✨ Features:
- Interactive audio waveforms with click-to-seek
- Voice recommendations with trust scoring
- Modern responsive UI with gradient design
- Accessibility-first design
- Real-time waveform visualization
- Location-based discovery

🛠️ Tech Stack:
- Next.js 15 with App Router
- Tailwind CSS + Radix UI
- TypeScript
- WaveSurfer.js for audio
- Vercel-ready deployment

🚀 Ready for production deployment!"

echo ""
echo "🎉 Repository prepared for GitHub!"
echo ""
echo "📋 Next steps:"
echo "1. Create a new repository on GitHub"
echo "2. Add remote: git remote add origin https://github.com/yourusername/murmur-app.git"
echo "3. Push to GitHub: git push -u origin main"
echo "4. Deploy to Vercel using the GitHub integration"
echo ""
echo "🎵 Your Murmur app is ready to go live!"