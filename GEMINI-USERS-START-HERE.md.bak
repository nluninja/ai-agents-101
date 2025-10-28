# 🎯 START HERE: Gemini Users Guide

**Using a free Google account? You're in the right place!**

## Will Everything Run Smoothly? ✅ YES!

This tutorial **fully supports Google Gemini**, but there's one small step you need to know about.

## The 1-Minute Setup

### Step 1: Get Your FREE API Key (30 seconds)

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy it (starts with `AI...`)

**That's it!** No credit card needed.

### Step 2: Add to n8n (30 seconds)

1. Open n8n at http://localhost:5678
2. Settings → Credentials → Add Credential
3. Search for "Google Gemini API"
4. Paste your key → Save

Done! ✅

## Important: About the Workflows

### ⚠️ One Small Adjustment Needed

The workflow JSON files in this repo are **pre-configured for OpenAI** (to work for everyone).

**What this means for you:**
After importing a workflow, you need to **swap the LLM node** (takes 30 seconds).

### How to Swap the Node

1. Import the workflow as normal
2. Click on the "OpenAI Chat Model" node
3. Delete it
4. Add a new "Google Gemini Chat Model" node
5. Copy/paste the system prompt
6. Set model to `gemini-1.5-flash`
7. Connect it the same way

**That's it!** Now it uses Gemini (and it's FREE!).

## Quick Example

### What You'll See (OpenAI node):
```
Node: OpenAI Chat Model
Model: gpt-4o-mini
Temperature: 0.7
System Message: "You are a helpful assistant..."
```

### What You Need (Gemini node):
```
Node: Google Gemini Chat Model
Model: gemini-1.5-flash
Temperature: 0.7
System Message: "You are a helpful assistant..."  (same!)
```

## Will Everything Work?

### ✅ Yes, Everything Works:

- All 5 tutorials work perfectly with Gemini
- All code examples work
- All concepts apply
- Memory, tools, orchestration - all supported

### 🎁 Bonus Benefits:

- **FREE** (1,500 requests/day)
- **No credit card** required
- **Fast** (gemini-1.5-flash is very quick)
- **Powerful** (comparable to GPT-4)
- **Large context** (1M tokens available)

## Recommended Workflow

### For Absolute Smoothest Experience:

1. **Follow the Quick Start**
   - [QUICKSTART.md](QUICKSTART.md) has Gemini instructions

2. **Read the Gemini Guide**
   - [docs/gemini-guide.md](docs/gemini-guide.md) - Everything about Gemini

3. **Check Compatibility Notes**
   - [docs/workflow-compatibility.md](docs/workflow-compatibility.md) - Technical details

4. **Start Tutorial 01**
   - [01-basic-agent](01-basic-agent/README.md) - Build your first agent!

## What Models to Use?

| Tutorial | Recommended Model | Why |
|----------|------------------|-----|
| 01-basic-agent | `gemini-1.5-flash` | Fast, perfect for learning |
| 02-api-integration | `gemini-1.5-flash` | Good enough for tools |
| 03-memory-agent | `gemini-1.5-flash` | Handles context well |
| 04-mcp-agent | `gemini-1.5-pro` | Better for complex tools |
| 05-orchestration | `gemini-1.5-pro` | Multi-agent needs reasoning |

**Start with `gemini-1.5-flash` for everything** - it's free and powerful!

## Rate Limits (Free Tier)

You get:
- ✅ 15 requests per minute
- ✅ 1,500 requests per day
- ✅ 1 million tokens per minute

**More than enough for learning!**

If you hit limits, just add a 4-second delay between requests:
```javascript
await new Promise(r => setTimeout(r, 4000));
```

## Troubleshooting

### "Can't find Google Gemini node"

**Solution:** Update n8n to latest version
```bash
npm install -g n8n@latest
```

### "Invalid API Key"

**Solutions:**
1. Check you copied the full key (starts with `AI`)
2. Remove any trailing spaces
3. Regenerate key if needed

### "Rate limit exceeded"

**Solution:** Add delays between requests (see [gemini-guide.md](docs/gemini-guide.md))

## Cost Comparison

### Learning all 5 tutorials (~100 requests):

| Provider | Cost |
|----------|------|
| **Google Gemini** | **$0** 🎉 |
| OpenAI GPT-4o-mini | ~$1-2 |
| OpenAI GPT-4o | ~$5-10 |

**Gemini is FREE for this entire course!**

## Need More Help?

### Documentation:
1. **[Gemini Guide](docs/gemini-guide.md)** - Detailed Gemini docs
2. **[Setup Guide](docs/setup.md)** - Full setup instructions
3. **[Compatibility Guide](docs/workflow-compatibility.md)** - Technical details
4. **[Troubleshooting](docs/troubleshooting.md)** - Fix common issues

### External Resources:
- [Google AI Studio](https://aistudio.google.com/) - Manage your API
- [Gemini API Docs](https://ai.google.dev/docs) - Official documentation
- [n8n Community](https://community.n8n.io/) - Get help from others

## TL;DR - The Answer

### Q: Will everything run smoothly with Gemini?

### A: YES! ✅

**Here's what happens:**

1. ✅ Get FREE Gemini API key (30 seconds)
2. ✅ Add to n8n (30 seconds)
3. ✅ Import workflows normally
4. ⚠️ Swap OpenAI node → Gemini node (30 seconds per workflow)
5. ✅ Everything works perfectly!

**Total extra effort:** ~30 seconds per tutorial = 2.5 minutes total

**Total cost:** $0 🎉

**It's worth it!**

## Ready to Start?

### Your Next Steps:

1. **Get API Key**: [Google AI Studio](https://aistudio.google.com/app/apikey)
2. **Install n8n**: [QUICKSTART.md](QUICKSTART.md)
3. **Configure**: [docs/setup.md](docs/setup.md)
4. **Build First Agent**: [01-basic-agent](01-basic-agent/README.md)

---

**Questions?** Check the [Gemini Guide](docs/gemini-guide.md) or [Troubleshooting](docs/troubleshooting.md)

**Happy building! 🚀**
