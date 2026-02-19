# Cucumber BDD Framework Setup Script
# This script automates the installation and setup process

Write-Host "🎭 Playwright + Cucumber BDD Framework Setup" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js installation
Write-Host "📦 Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
    
    # Check if version is >= 18
    $version = $nodeVersion -replace 'v', ''
    $majorVersion = [int]($version.Split('.')[0])
    
    if ($majorVersion -lt 18) {
        Write-Host "⚠️  Warning: Node.js v18 or higher is recommended. Current version: $nodeVersion" -ForegroundColor Yellow
        Write-Host "   Please upgrade Node.js from https://nodejs.org/" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "   Please install Node.js v18+ from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Check npm installation
Write-Host "📦 Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✅ npm is installed: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install dependencies
Write-Host "📥 Installing npm dependencies..." -ForegroundColor Yellow
Write-Host "   This may take a few minutes..." -ForegroundColor Gray
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install Playwright browsers
Write-Host "🌐 Installing Playwright browsers..." -ForegroundColor Yellow
Write-Host "   This will download Chromium, Firefox, and WebKit..." -ForegroundColor Gray
npx playwright install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Playwright browsers installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install Playwright browsers!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Create required directories
Write-Host "📁 Creating required directories..." -ForegroundColor Yellow
$directories = @(
    "reports",
    "test-results",
    "test-results/screenshots",
    "test-results/videos",
    "test-results/traces"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "   ✓ Created $dir" -ForegroundColor Green
    } else {
        Write-Host "   ✓ $dir already exists" -ForegroundColor Gray
    }
}

Write-Host ""

# Validate setup with dry run
Write-Host "✔️  Validating setup with dry run..." -ForegroundColor Yellow
npm run test:bdd:dryrun

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Setup validation passed!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Setup validation had some issues. Please check the output above." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Review the documentation:" -ForegroundColor White
Write-Host "   • BDD-SETUP-GUIDE.md - Complete setup guide" -ForegroundColor Gray
Write-Host "   • BDD-QUICK-REFERENCE.md - Quick command reference" -ForegroundColor Gray
Write-Host "   • BDD-CONVERSION-SUMMARY.md - Conversion details" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Run your first test:" -ForegroundColor White
Write-Host "   npm run test:bdd:smoke" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. Generate a report:" -ForegroundColor White
Write-Host "   npm run test:bdd:report" -ForegroundColor Yellow
Write-Host ""
Write-Host "4. Explore available commands:" -ForegroundColor White
Write-Host "   npm run test:bdd          - Run all tests" -ForegroundColor Gray
Write-Host "   npm run test:bdd:smoke    - Run smoke tests" -ForegroundColor Gray
Write-Host "   npm run test:bdd:headed   - Run with visible browser" -ForegroundColor Gray
Write-Host "   npm run test:bdd:firefox  - Run on Firefox" -ForegroundColor Gray
Write-Host ""
Write-Host "📖 For more information, see README.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "Happy Testing! 🚀" -ForegroundColor Green
Write-Host ""
