# Quick Start Guide

Get up and running with n8n AI agents in 10 minutes!

## Prerequisites

- Node.js 18+ installed
- **LLM API Key** - Choose one:
  - **Google Gemini API** (FREE!) - [Get key here](https://aistudio.google.com/app/apikey)
  - **Gemini API** (Paid) - [Get key here](https://platform.gemini.com/api-keys)

> **💰 Save Money!** Google Gemini offers a generous **FREE tier** - perfect for learning!

## Step 1: Install n8n (2 minutes)

```bash
# Quick install with npx (no installation needed)
npx n8n

# Or install globally
npm install -g n8n
n8n
```

n8n will start at http://localhost:5678

## Step 2: Configure LLM API (2 minutes)

### Option A: Google Gemini (FREE - Recommended)

1. Open http://localhost:5678
2. Create your account (local only)
3. Go to **Settings** → **Credentials**
4. Click **Add Credential**
5. Search for and select **Google Gemini API**
6. Paste your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
7. Click **Save**

### Option B: Gemini (Paid)

1. Open http://localhost:5678
2. Create your account (local only)
3. Go to **Settings** → **Credentials**
4. Click **Add Credential**
5. Select **Gemini API**
6. Paste your API key
7. Click **Save**

## Step 3: Import Your First Agent (1 minute)

1. Click **+ Add workflow**
2. Click the **⋯** menu (three dots)
3. Select **Import from File**
4. Choose `01-basic-agent/workflow.json`
5. Click **Save**

## Step 4: Test It! (1 minute)

1. Click **Execute Workflow** button
2. Copy the webhook test URL shown
3. Open a new terminal and run:

```bash
curl -X POST http://localhost:5678/webhook-test/basic-agent \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello! Tell me a joke about AI."}'
```

You should get a response from your AI agent! 🎉

## Step 5: Activate for Production (1 minute)

1. In n8n, toggle **Inactive** → **Active** (top right)
2. Now your agent runs automatically on incoming requests
3. Use the production URL (without `/webhook-test`)

## What's Next?

### Learn the Fundamentals
- [01-basic-agent](01-basic-agent/README.md) - Start here (15 min)
- [02-api-integration](02-api-integration/README.md) - Add tools (30 min)
- [03-memory-agent](03-memory-agent/README.md) - Add memory (45 min)

### Advanced Topics
- [04-mcp-agent](04-mcp-agent/README.md) - Model Context Protocol (60 min)
- [05-orchestration](05-orchestration/README.md) - Multi-agent systems (90 min)

### Explore Documentation
- [Setup Guide](docs/setup.md) - Detailed setup instructions
- [Core Concepts](docs/concepts.md) - Understanding agents
- [Troubleshooting](docs/troubleshooting.md) - Common issues

## Common Commands

```bash
# Start n8n
npx n8n

# Start on different port
N8N_PORT=5679 npx n8n

# Start with Docker
docker run -it --rm -p 5678:5678 n8nio/n8n

# Test webhook
curl -X POST http://localhost:5678/webhook-test/WORKFLOW_NAME \
  -H "Content-Type: application/json" \
  -d '{"message": "test"}'
```

## Testing Examples

### Basic Chat
```bash
curl -X POST http://localhost:5678/webhook-test/basic-agent \
  -H "Content-Type: application/json" \
  -d '{"message": "Explain quantum computing in simple terms"}'
```

### Weather Query (after tutorial 02)
```bash
curl -X POST http://localhost:5678/webhook-test/weather-agent \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the weather like in Tokyo?"}'
```

### Conversation with Memory (after tutorial 03)
```bash
# First message
curl -X POST http://localhost:5678/webhook-test/memory-agent \
  -H "Content-Type: application/json" \
  -d '{"sessionId": "user-123", "message": "My name is Alice"}'

# Second message
curl -X POST http://localhost:5678/webhook-test/memory-agent \
  -H "Content-Type: application/json" \
  -d '{"sessionId": "user-123", "message": "What is my name?"}'
```

## Project Structure

```
ai-agent101/
├── README.md                   # Overview and learning path
├── QUICKSTART.md              # This file
├── LICENSE                    # MIT License
│
├── docs/                      # Documentation
│   ├── setup.md              # Detailed setup guide
│   ├── concepts.md           # Core concepts explained
│   └── troubleshooting.md    # Common issues & solutions
│
├── 01-basic-agent/           # Tutorial 1: Basic conversational agent
│   ├── README.md             # Step-by-step guide
│   └── workflow.json         # n8n workflow to import
│
├── 02-api-integration/       # Tutorial 2: Agent with API tools
│   ├── README.md
│   └── workflow.json
│
├── 03-memory-agent/          # Tutorial 3: Stateful agent
│   ├── README.md
│   └── workflow.json
│
├── 04-mcp-agent/             # Tutorial 4: MCP integration
│   ├── README.md
│   ├── workflow.json
│   ├── mcp-server.js         # Example MCP server
│   └── package.json
│
└── 05-orchestration/         # Tutorial 5: Multi-agent system
    ├── README.md
    └── workflow.json
```

## Tips for Success

### 1. Start Simple
Don't jump ahead! Each tutorial builds on the previous one.

### 2. Read the READMEs
Each tutorial folder has detailed explanations and examples.

### 3. Experiment
Modify the workflows! Change prompts, add nodes, try new ideas.

### 4. Use the Docs
Check [docs/](docs/) for deeper understanding of concepts.

### 5. Debug Effectively
- Click on nodes to see input/output
- Use the execution log
- Test nodes individually

## Getting Help

### Community & Resources
- [n8n Community Forum](https://community.n8n.io/)
- [n8n Documentation](https://docs.n8n.io/)
- [Gemini Documentation](https://platform.gemini.com/docs)

### Troubleshooting
1. Check [docs/troubleshooting.md](docs/troubleshooting.md)
2. Search the n8n community forum
3. Review error messages in execution log
4. Test components individually

## Pro Tips

### Save API Costs
```javascript
// Use gemini-1.5-flash instead of gpt-4 for testing
model: "gemini-1.5-flash"  // Much cheaper!
```

### Speed Up Development
```javascript
// Lower temperature for consistent testing
temperature: 0.1  // More predictable outputs
```

### Better Prompts
```
Be specific:
❌ "Help me"
✅ "Explain the difference between AGI and narrow AI in 3 sentences"

Provide context:
❌ "What should I do?"
✅ "I'm building a chatbot for customer support. Should I use..."
```

### Monitor Usage
- Check Gemini dashboard for API usage
- Set up billing alerts
- Use rate limiting in production

## Next Steps

Once you've completed the basics:

1. **Customize**: Modify workflows for your use case
2. **Combine**: Mix concepts from different tutorials
3. **Extend**: Add new tools and capabilities
4. **Deploy**: Move to production with proper security
5. **Scale**: Handle more traffic and users

## Learning Path

```
Day 1: Basic Agent (01)
  ↓
Day 2: API Integration (02)
  ↓
Day 3: Memory & State (03)
  ↓
Day 4-5: MCP Integration (04)
  ↓
Day 6-7: Multi-Agent System (05)
  ↓
Week 2+: Build Your Own!
```

## Questions?

- Check the [README](README.md) for overall project info
- Read tutorial-specific docs in each folder
- Explore [docs/concepts.md](docs/concepts.md) for theory
- See [docs/troubleshooting.md](docs/troubleshooting.md) for issues

---

**Ready to build AI agents?** Start with [01-basic-agent](01-basic-agent/README.md)! 🚀
