# Workflow Compatibility Notes

## Important: Workflow JSON Files

✅ **The workflow JSON files in this repository are pre-configured for Google Gemini!**

### What This Means

All workflow files include:
- `@n8n/n8n-nodes-langchain.lmChatGoogleGemini` (Gemini nodes)
- Models: `gemini-1.5-flash` or `gemini-1.5-pro`
- Credentials: `googleGeminiApi`

**No modifications needed!** Just import and add your Gemini API credential.

## Using Workflows with Gemini (Ready to Go!)

### Quick Start (Recommended)

1. **Import the workflow** into n8n
2. **Click on the Google Gemini Chat Model node** (will have red ⚠️)
3. **Select your credential** from the dropdown
4. **Execute!**

That's it! The workflow is ready to use.

## Node Configuration

### What's Pre-Configured

All LLM nodes in the workflows use:

```json
{
  "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
  "parameters": {
    "model": "gemini-1.5-flash",
    "options": {
      "temperature": 0.7
    }
  },
  "credentials": {
    "googleGeminiApi": {
      "id": "gemini-credentials",
      "name": "Google Gemini API"
    }
  }
}
```

### Model Selection

| Tutorial | Pre-Set Model | Reason |
|----------|--------------|---------|
| 01-basic-agent | `gemini-1.5-flash` | Fast for learning |
| 02-api-integration | `gemini-1.5-flash` | Good for tools |
| 03-memory-agent | `gemini-1.5-flash` | Handles context |
| 04-mcp-agent | `gemini-1.5-flash` | MCP compatible |
| 05-orchestration | `gemini-1.5-pro` | Multi-agent reasoning |

## What Works Out of the Box

### ✅ Ready to Use (No Changes)

- All webhook triggers
- All data transformation nodes
- All HTTP request nodes
- All code nodes
- All LLM nodes (Gemini pre-configured!)
- Memory and Redis integration
- Function calling / tool use
- Multi-agent orchestration

### 🔧 Only Requires Credential

- Google Gemini Chat Model nodes → Add your Gemini API credential

## Comparison with Other LLM Providers

### Gemini (Pre-Configured) vs Others

| Feature | Google Gemini ✅ | Alternative |
|---------|-----------------|-------------|
| Setup | Pre-configured | Manual node swap needed |
| Cost | FREE tier | Paid |
| Credit Card | Not required | Required |
| Models Available | gemini-1.5-flash, pro | Various |
| Rate Limits (Free) | 1,500 req/day | N/A |

## Advanced: Using Other LLM Providers

If you want to use a different LLM provider (not recommended for beginners):

### Steps to Switch

1. **Import the workflow**
2. **Delete** the Google Gemini Chat Model node
3. **Add** your preferred LLM node:
   - OpenAI Chat Model
   - Anthropic Claude
   - Azure OpenAI
   - Ollama (local)
4. **Configure** model settings
5. **Connect** the same way
6. **Add credential** for your provider

### Example: Switching to OpenAI

Before (Gemini - default):
```json
{
  "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
  "parameters": {
    "model": "gemini-1.5-flash"
  },
  "credentials": {
    "googleGeminiApi": {}
  }
}
```

After (OpenAI):
```json
{
  "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
  "parameters": {
    "model": "gpt-4o-mini"
  },
  "credentials": {
    "openAiApi": {}
  }
}
```

## Troubleshooting

### "Can't find credential dropdown"

**Solution:**
1. Make sure you created a Google Gemini API credential first
2. Settings → Credentials → Add Credential → Search "Gemini"

### "Node has red warning"

**Expected!** This means you need to select your credential:
1. Click the node
2. Select your credential from dropdown
3. Warning disappears!

### "Want to use a different model"

**Solution:**
1. Click the Google Gemini Chat Model node
2. Change "Model" field to:
   - `gemini-1.5-flash` (fast, free)
   - `gemini-1.5-pro` (powerful, free)
   - `gemini-pro` (balanced, free)

### "Workflow not working"

**Checklist:**
1. ✅ Gemini API credential added?
2. ✅ Credential selected in LLM nodes?
3. ✅ API key valid? (test at Google AI Studio)
4. ✅ Within rate limits? (15 req/min)
5. ✅ n8n up to date? (supports Gemini nodes)

## Need Help?

- [Gemini Setup Guide](gemini-guide.md) - Detailed Gemini instructions
- [Troubleshooting](troubleshooting.md) - Common issues and fixes
- [n8n Community](https://community.n8n.io/) - Community support

## Summary

🎉 **All workflows are Gemini-ready!**

1. Import workflow
2. Add Gemini credential
3. Execute!

No node swapping, no JSON editing, no complications. Just import and go!
