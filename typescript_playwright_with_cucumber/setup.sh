#!/bin/bash

# Cucumber BDD Framework Setup Script (Unix/Linux/Mac)
# This script automates the installation and setup process

echo ""
echo "🎭 Playwright + Cucumber BDD Framework Setup"
echo "============================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
GRAY='\033[0;37m'
NC='\033[0m' # No Color

# Check Node.js installation
echo -e "${YELLOW}📦 Checking Node.js installation...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js is installed: $NODE_VERSION${NC}"
    
    # Extract major version
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
    
    if [ "$MAJOR_VERSION" -lt 18 ]; then
        echo -e "${YELLOW}⚠️  Warning: Node.js v18 or higher is recommended. Current version: $NODE_VERSION${NC}"
        echo -e "${YELLOW}   Please upgrade Node.js from https://nodejs.org/${NC}"
    fi
else
    echo -e "${RED}❌ Node.js is not installed!${NC}"
    echo -e "${RED}   Please install Node.js v18+ from https://nodejs.org/${NC}"
    exit 1
fi

echo ""

# Check npm installation
echo -e "${YELLOW}📦 Checking npm installation...${NC}"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✅ npm is installed: v$NPM_VERSION${NC}"
else
    echo -e "${RED}❌ npm is not installed!${NC}"
    exit 1
fi

echo ""

# Install dependencies
echo -e "${YELLOW}📥 Installing npm dependencies...${NC}"
echo -e "${GRAY}   This may take a few minutes...${NC}"
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependencies installed successfully!${NC}"
else
    echo -e "${RED}❌ Failed to install dependencies!${NC}"
    exit 1
fi

echo ""

# Install Playwright browsers
echo -e "${YELLOW}🌐 Installing Playwright browsers...${NC}"
echo -e "${GRAY}   This will download Chromium, Firefox, and WebKit...${NC}"
npx playwright install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Playwright browsers installed successfully!${NC}"
else
    echo -e "${RED}❌ Failed to install Playwright browsers!${NC}"
    exit 1
fi

echo ""

# Create required directories
echo -e "${YELLOW}📁 Creating required directories...${NC}"
directories=(
    "reports"
    "test-results"
    "test-results/screenshots"
    "test-results/videos"
    "test-results/traces"
)

for dir in "${directories[@]}"; do
    if [ ! -d "$dir" ]; then
        mkdir -p "$dir"
        echo -e "${GREEN}   ✓ Created $dir${NC}"
    else
        echo -e "${GRAY}   ✓ $dir already exists${NC}"
    fi
done

echo ""

# Validate setup with dry run
echo -e "${YELLOW}✔️  Validating setup with dry run...${NC}"
npm run test:bdd:dryrun

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Setup validation passed!${NC}"
else
    echo -e "${YELLOW}⚠️  Setup validation had some issues. Please check the output above.${NC}"
fi

echo ""
echo "============================================="
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "============================================="
echo ""
echo -e "${CYAN}📚 Next Steps:${NC}"
echo ""
echo -e "${NC}1. Review the documentation:${NC}"
echo -e "${GRAY}   • BDD-SETUP-GUIDE.md - Complete setup guide${NC}"
echo -e "${GRAY}   • BDD-QUICK-REFERENCE.md - Quick command reference${NC}"
echo -e "${GRAY}   • BDD-CONVERSION-SUMMARY.md - Conversion details${NC}"
echo ""
echo -e "${NC}2. Run your first test:${NC}"
echo -e "${YELLOW}   npm run test:bdd:smoke${NC}"
echo ""
echo -e "${NC}3. Generate a report:${NC}"
echo -e "${YELLOW}   npm run test:bdd:report${NC}"
echo ""
echo -e "${NC}4. Explore available commands:${NC}"
echo -e "${GRAY}   npm run test:bdd          - Run all tests${NC}"
echo -e "${GRAY}   npm run test:bdd:smoke    - Run smoke tests${NC}"
echo -e "${GRAY}   npm run test:bdd:headed   - Run with visible browser${NC}"
echo -e "${GRAY}   npm run test:bdd:firefox  - Run on Firefox${NC}"
echo ""
echo -e "${CYAN}📖 For more information, see README.md${NC}"
echo ""
echo -e "${GREEN}Happy Testing! 🚀${NC}"
echo ""
