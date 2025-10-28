# Installing n8n

This guide covers installing n8n on your system to run the AI agent tutorials.

## Prerequisites

- **Node.js**: Version 20.x or 22.x (recommended: 22.x)
- **npm**: Comes with Node.js
- **Memory**: At least 4GB RAM recommended

## Installation Methods

### Method 1: npx (Quickest - Recommended for Testing)

The fastest way to get started:

```bash
npx n8n
```

This will:
- Download and run n8n automatically
- Start the server on http://localhost:5678
- No installation required

**Pros**: Instant start, no installation
**Cons**: Slower startup each time, always uses latest version

---

### Method 2: Global npm Installation (Recommended for Regular Use)

Install n8n globally on your system:

```bash
npm install -g n8n
```

Then start n8n:

```bash
n8n
```

**Pros**: Faster startup, version control
**Cons**: Requires installation step

---

### Method 3: Docker (Recommended for Production)

If you have Docker installed:

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n
```

With data persistence:

```bash
docker run -d \
  --name n8n \
  --restart unless-stopped \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n
```

**Pros**: Isolated environment, easy updates
**Cons**: Requires Docker knowledge

---

## First Time Setup

1. **Start n8n** using one of the methods above

2. **Open your browser** and go to:
   ```
   http://localhost:5678
   ```

3. **Create your account**:
   - Enter your email and password
   - This is stored locally (not sent anywhere)
   - Required for accessing n8n

4. **You're ready!** You'll see the n8n welcome screen

---

## Importing Workflows

Once n8n is running:

1. Click **"Workflows"** in the left sidebar
2. Click **"Add Workflow"** → **"Import from File"**
3. Navigate to the tutorial folder (e.g., `01-basic-agent/`)
4. Select `workflow.json`
5. Click **"Import"**

The workflow will open in the editor!

---

## Setting Up Gemini API Credentials

Before running workflows, add your Gemini API key:

1. Click **"Credentials"** in the left sidebar (or ⚙️ gear icon)
2. Click **"Add Credential"**
3. Search for **"Google Gemini"**
4. Select **"Google Gemini API"**
5. Enter your API key (get it from: https://aistudio.google.com/app/apikey)
6. Click **"Save"**

Now all workflows will use this credential automatically!

---

## Stopping n8n

**If using npx or npm:**
- Press `Ctrl+C` in the terminal

**If using Docker:**
```bash
docker stop n8n
```

---

## Troubleshooting

### Port 5678 Already in Use

If you get an error about port 5678:

```bash
# Use a different port
n8n start --port 5679
```

Then access n8n at: http://localhost:5679

### Permission Errors (Linux/macOS)

If npm install fails with EACCES:

```bash
# Use npx instead (no installation needed)
npx n8n

# OR fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Node.js Version Issues

Check your Node.js version:

```bash
node --version
```

If it's not 20.x or 22.x, upgrade using NVM:

```bash
nvm install 22
nvm use 22
```

---

## Next Steps

1. ✅ Install n8n
2. ✅ Get your Gemini API key from https://aistudio.google.com/app/apikey
3. ✅ Import Tutorial 01 workflow
4. ✅ Add your Gemini credential
5. ✅ Click "Execute Workflow" and start learning!

For detailed tutorial instructions, see:
- [01-basic-agent/README.md](../01-basic-agent/README.md)

---

## Official Documentation

- n8n Documentation: https://docs.n8n.io
- n8n Installation Guide: https://docs.n8n.io/hosting/installation/
- Community Forum: https://community.n8n.io
