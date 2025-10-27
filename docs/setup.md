# Setup Guide

## Installation Options

### Option 1: npx (Recommended for Beginners)

```bash
npx n8n
```

This will:
- Download and run n8n locally
- Open at http://localhost:5678
- Store data in `~/.n8n`

### Option 2: Docker

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

### Option 3: npm Global Install

```bash
npm install -g n8n
n8n
```

## Initial Configuration

1. **Access n8n**
   - Open http://localhost:5678
   - Create your account (local only)

2. **Set Up Credentials**

### OpenAI Credentials
1. Go to Settings → Credentials
2. Click "Add Credential"
3. Select "OpenAI API"
4. Enter your API key from https://platform.openai.com/api-keys

### Redis (for memory examples)
1. Install Redis locally:
   ```bash
   # macOS
   brew install redis
   brew services start redis

   # Ubuntu/Debian
   sudo apt-get install redis-server
   sudo systemctl start redis

   # Docker
   docker run -d -p 6379:6379 redis
   ```

2. Add Redis credentials in n8n:
   - Host: localhost
   - Port: 6379
   - Database: 0

## Importing Workflows

1. In n8n, click "Add Workflow"
2. Click the three dots (⋯) → "Import from File"
3. Select the `workflow.json` from any tutorial folder
4. The workflow will be imported

## Environment Variables (Optional)

Create a `.env` file in your n8n directory:

```env
# OpenAI
OPENAI_API_KEY=sk-...

# n8n Settings
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your_password

# Webhook URL (for production)
WEBHOOK_URL=https://your-domain.com
```

## Verification

Test your setup:

1. Create a simple workflow
2. Add a webhook node
3. Add a "Set" node
4. Connect and execute
5. You should see data flow through

## Next Steps

Once setup is complete, proceed to [01-basic-agent](../01-basic-agent/README.md)!
