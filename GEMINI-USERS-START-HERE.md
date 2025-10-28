# 🎯 START HERE: Gemini Users Guide

**Using a free Google account? Perfect! This tutorial is 100% Gemini-native!**

## Will Everything Run Smoothly? ✅ YES!

All workflows are **pre-configured with Google Gemini**. No node swapping needed!

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

## How the Workflows Work

### ✅ Pre-Configured for Gemini

All workflow JSON files are **ready to use with Gemini**:

- ✅ All LLM nodes use **Google Gemini Chat Model**
- ✅ Models are set to `gemini-1.5-flash` or `gemini-1.5-pro`
- ✅ No node swapping required!

**What this means for you:**
1. Import the workflow
2. Add your Gemini credential
3. Start using it immediately!

## Quick Start

### Tutorial 01 Example:

1. Import `01-basic-agent/workflow.json`
2. Click on "Google Gemini Chat Model" node (red ⚠️)
3. Select your Gemini credential from dropdown
4. Click "Execute Workflow"

**That's it!** 🎉

## Will Everything Work?

### ✅ Yes, Everything Works Perfectly:

- All 5 tutorials are Gemini-native
- All code examples work
- All concepts apply
- Memory, tools, orchestration - all fully supported

### 🎁 Bonus Benefits:

- **FREE** (1,500 requests/day)
- **No credit card** required
- **Fast** (gemini-1.5-flash is very quick)
- **Powerful** (comparable to GPT-4)
- **Large context** (1M tokens available)

## Recommended Workflow

### For Absolute Smoothest Experience:

1. **Install n8n**
   - See [docs/n8n-installation.md](docs/n8n-installation.md)

2. **Get Gemini API Key**
   - [Get key](https://aistudio.google.com/app/apikey)

3. **Read Setup Guide**
   - [docs/setup.md](docs/setup.md) - Configuration details

4. **Start Tutorial 01**
   - [01-basic-agent](01-basic-agent/README.md) - Build your first agent!

## What Models to Use?

| Tutorial | Pre-Configured Model | Why |
|----------|---------------------|-----|
| 01-basic-agent | `gemini-1.5-flash` | Fast, perfect for learning |
| 02-api-integration | `gemini-1.5-flash` | Good for tools |
| 03-memory-agent | `gemini-1.5-flash` | Handles context well |
| 04-mcp-agent | `gemini-1.5-flash` | Good for MCP tools |
| 05-orchestration | `gemini-1.5-pro` | Multi-agent reasoning |

**All workflows come with optimal models pre-selected!**

## Rate Limits (Free Tier)

You get:
- ✅ 15 requests per minute
- ✅ 1,500 requests per day
- ✅ 1 million tokens per minute

**More than enough for learning!**

If you hit limits, add a 4-second delay between requests:
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

**Solution:** Add delays between requests or upgrade to paid tier

## Cost Comparison

### Learning all 5 tutorials (~100 requests):

| Provider | Cost |
|----------|------|
| **Google Gemini** | **$0** 🎉 |

**Gemini is 100% FREE for this entire course!**

## Need More Help?

### Documentation:
1. **[n8n Installation](docs/n8n-installation.md)** - Install n8n
2. **[Setup Guide](docs/setup.md)** - Configure credentials
3. **[Gemini Guide](docs/gemini-guide.md)** - Detailed Gemini info
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
3. ✅ Import workflows (already Gemini-native!)
4. ✅ Add credential (10 seconds)
5. ✅ Everything works perfectly!

**Total effort:** ~1 minute per tutorial

**Total cost:** $0 🎉

## Ready to Start?

### Your Next Steps:

1. **Get API Key**: [Google AI Studio](https://aistudio.google.com/app/apikey)
2. **Install n8n**: [docs/n8n-installation.md](docs/n8n-installation.md)
3. **Configure**: [docs/setup.md](docs/setup.md)
4. **Build First Agent**: [01-basic-agent](01-basic-agent/README.md)

---

**Questions?** Check the [Gemini Guide](docs/gemini-guide.md) or [Troubleshooting](docs/troubleshooting.md)

**Happy building! 🚀**
