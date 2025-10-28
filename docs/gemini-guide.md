# Google Gemini Guide for n8n Agents

**Perfect for users with free Google accounts!**

## Why Use Gemini?

### ✅ Advantages

1. **Completely FREE**
   - No credit card required
   - Generous free tier
   - 1,500 requests per day
   - 1 million tokens per minute

2. **Powerful Models**
   - Gemini 1.5 Pro - Comparable to Gemini Pro
   - Gemini 1.5 Flash - Fast and efficient
   - Large context windows (up to 1M tokens)

3. **Easy Setup**
   - Works with any Google account
   - Get API key in < 1 minute
   - No billing setup needed

### ⚠️ Limitations

- Rate limits (15 RPM on free tier)
- Some advanced features differ from Gemini
- Function calling format slightly different

## Getting Your API Key (1 minute)

### Step 1: Visit Google AI Studio

Go to: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

### Step 2: Sign In

Use any Google account (Gmail, Google Workspace, etc.)

### Step 3: Create API Key

1. Click **"Create API Key"**
2. Select **"Create API key in new project"**
3. Your key will be generated (starts with `AI...`)
4. Click **Copy** to copy it

**That's it!** You now have a free API key.

## Adding to n8n

### Method 1: Through UI (Recommended)

1. Open n8n at http://localhost:5678
2. Go to **Settings** → **Credentials**
3. Click **"+ Add Credential"**
4. Search for **"Google Gemini"** or **"Google PaLM"**
5. Paste your API key
6. Click **Save**

### Method 2: In Workflow Nodes

When you import a workflow:
1. Click on any AI/LLM node
2. In the **"Credential to connect with"** dropdown
3. Select your Google Gemini credential

## Configuring Workflows for Gemini

### Workflow Changes Needed

When importing the tutorial workflows, you'll need to adjust LLM nodes:

#### Before (Gemini):
```
Node: Gemini Chat Model
Model: gemini-1.5-flash
```

#### After (Gemini):
```
Node: Google Gemini Chat Model
Model: gemini-1.5-flash
```

### Model Selection Guide

| Use Case | Recommended Model | Why |
|----------|------------------|-----|
| Learning/Testing | `gemini-1.5-flash` | Fast, efficient, free |
| Production | `gemini-1.5-pro` | More capable, larger context |
| Cost Optimization | `gemini-1.5-flash` | Best performance/cost |
| Long Context | `gemini-1.5-pro` | Up to 1M token context |

## Gemini vs Gemini Differences

### API Response Format

**Gemini:**
```json
{
  "message": "AI response here"
}
```

**Gemini:**
```json
{
  "text": "AI response here"
}
```

### Function Calling

Both support function calling, but with slight syntax differences:

**Gemini:**
```json
{
  "name": "function_name",
  "arguments": "{\"param\": \"value\"}"
}
```

**Gemini:**
```json
{
  "name": "function_name",
  "args": {
    "param": "value"
  }
}
```

### Temperature Ranges

- **Gemini**: 0.0 - 2.0
- **Gemini**: 0.0 - 1.0

## Updating Tutorial Workflows

### Example: Basic Agent (01-basic-agent)

**Change this node:**

Find the "Gemini Chat Model" node, replace with "Google Gemini Chat Model"

**Update configuration:**
```
Model: gemini-1.5-flash
Temperature: 0.7
Max Tokens: 2048 (optional)
```

**System prompt stays the same!**

### Example: Memory Agent (03-memory-agent)

**Same process:**
1. Replace Gemini nodes with Google Gemini nodes
2. Update model name
3. Adjust any response parsing if needed

## Rate Limiting & Best Practices

### Free Tier Limits

| Limit Type | Value |
|------------|-------|
| Requests/minute | 15 RPM |
| Tokens/minute | 1M TPM |
| Requests/day | 1,500 RPD |

### Handling Rate Limits

**Add delays in workflows:**
```javascript
// In Code node before API call
await new Promise(resolve => setTimeout(resolve, 4000)); // 4 second delay
return $input.all();
```

**Implement retry logic:**
```javascript
// Retry on rate limit
for (let i = 0; i < 3; i++) {
  try {
    const result = await callGemini();
    return result;
  } catch (error) {
    if (error.code === 429) { // Rate limit
      await sleep(5000); // Wait 5 seconds
      continue;
    }
    throw error;
  }
}
```

### Optimize Token Usage

1. **Use Flash model for simple tasks**
   ```
   gemini-1.5-flash instead of gemini-1.5-pro
   ```

2. **Trim context in memory agents**
   ```javascript
   // Keep only last 10 messages instead of 20
   const trimmed = messages.slice(-10);
   ```

3. **Shorten system prompts**
   ```
   Be concise in your instructions
   ```

## Cost Comparison

| Provider | Free Tier | After Free Tier |
|----------|-----------|----------------|
| **Google Gemini** | 1,500 req/day FREE | Pay-as-you-go (very cheap) |
| **Gemini** | $5 credit (expires) | ~$0.0001-0.06 per request |

**For 100 requests/day:**
- Gemini: **$0/month** (within free tier)
- Gemini Gemini Proo-mini: **~$3-5/month**
- Gemini Gemini Proo: **~$15-30/month**

## Upgrading to Paid (Optional)

If you exceed free limits, Gemini offers very competitive paid tiers:

**Gemini 1.5 Flash:**
- Input: $0.075 per 1M tokens
- Output: $0.30 per 1M tokens

**Gemini 1.5 Pro:**
- Input: $1.25 per 1M tokens
- Output: $5.00 per 1M tokens

**Still cheaper than Gemini's Gemini Pro!**

## Troubleshooting Gemini

### "Invalid API Key"

**Solution:**
1. Verify key starts with `AI`
2. Check for trailing spaces when pasting
3. Regenerate key if needed
4. Ensure you're using "Google Gemini API" credential type

### "Rate Limit Exceeded"

**Solution:**
1. Add delays between requests (4-5 seconds)
2. Reduce request frequency
3. Use caching for repeated queries
4. Consider upgrading to paid tier

### "Model Not Found"

**Solution:**
1. Use `gemini-1.5-flash` or `gemini-1.5-pro`
2. Don't use `gemini-pro-vision` for text-only
3. Check model name spelling

### Function Calling Not Working

**Solution:**
1. Ensure n8n version supports Gemini function calling
2. Check function definition format
3. Try Gemini format first (often compatible)

## Example: Converting a Workflow

### Original (Gemini):
```json
{
  "name": "AI Agent",
  "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
  "parameters": {
    "model": "gemini-1.5-flash",
    "temperature": 0.7
  }
}
```

### Updated (Gemini):
```json
{
  "name": "AI Agent",
  "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
  "parameters": {
    "model": "gemini-1.5-flash",
    "temperature": 0.7
  }
}
```

## Best Practices for Gemini

### 1. Start with Flash Model
Perfect for learning and most use cases.

### 2. Use Pro for Complex Tasks
Switch to `gemini-1.5-pro` when you need:
- Better reasoning
- Longer context (>100K tokens)
- More accurate responses

### 3. Monitor Usage
Check your usage at: [Google AI Studio](https://aistudio.google.com/)

### 4. Implement Caching
Cache common responses to save requests:
```javascript
const cache = new Map();
const cacheKey = JSON.stringify(userInput);

if (cache.has(cacheKey)) {
  return cache.get(cacheKey);
}

const response = await callGemini(userInput);
cache.set(cacheKey, response);
return response;
```

### 5. Batch Requests
Group multiple queries when possible.

## Getting Help

### Resources
- [Gemini API Docs](https://ai.google.dev/docs)
- [Google AI Studio](https://aistudio.google.com/)
- [n8n Community](https://community.n8n.io/)
- [Gemini API Pricing](https://ai.google.dev/pricing)

### Common Questions

**Q: Can I use Gemini for all tutorials?**
A: Yes! All tutorials work with Gemini after updating the LLM nodes.

**Q: Do I need a Google Cloud account?**
A: No! A regular Google account is sufficient.

**Q: What if I hit rate limits?**
A: Add delays between requests or upgrade to paid tier.

**Q: Is Gemini as good as Gemini Pro?**
A: Gemini 1.5 Pro is very comparable to Gemini Pro in most tasks.

## Quick Reference

### API Key Location
[https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

### Recommended Settings
```
Model: gemini-1.5-flash
Temperature: 0.7
Max Output Tokens: 2048
```

### Rate Limit Safe Delay
```javascript
await sleep(4000); // 4 seconds between requests
```

### Check Usage
[https://aistudio.google.com/](https://aistudio.google.com/) → View usage

---

**Ready to use Gemini?** Head back to the [main tutorials](../README.md) and start building with FREE AI! 🚀
