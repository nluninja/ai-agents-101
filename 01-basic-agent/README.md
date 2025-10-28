# 01 - Basic Agent

**Difficulty**: Beginner
**Time**: 15 minutes
**Prerequisites**: n8n installed, Google Gemini API key (FREE!)

> 💰 **This tutorial uses FREE Google Gemini API** - No credit card required!
> 💡 Have OpenAI instead? See the [OpenAI version note](#using-openai-instead) at the bottom.

## What You'll Build

A simple conversational AI agent that:
- Receives messages via webhook
- Processes them with Google Gemini AI (FREE!)
- Returns intelligent responses

This is your "Hello World" for AI agents!

## Learning Objectives

- Understanding the basic agent architecture
- Setting up webhooks in n8n
- Configuring LLM nodes with Gemini
- Processing and returning responses

## Architecture

```
User Input (HTTP POST)
    ↓
Webhook Trigger
    ↓
Extract Message
    ↓
Google Gemini Chat Model (FREE!)
    ↓
Format Response
    ↓
Return JSON
```

## Step-by-Step Guide

### 1. Get Your FREE Gemini API Key

Before starting, you need a free API key:

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key" → "Create API key in new project"
4. Copy the API key (starts with `AI...`)

**That's it! No credit card needed.** ✅

### 2. Add Gemini Credentials to n8n

1. Open n8n at http://localhost:5678
2. Go to **Settings** → **Credentials**
3. Click **"+ Add Credential"**
4. Search for **"Google Gemini"** or **"Google PaLM"**
5. Paste your API key
6. Click **"Save"**

### 3. Import the Workflow

1. In n8n, click **"+ Add workflow"**
2. Click **"⋯"** (three dots) → **"Import from File"**
3. Select `workflow.json` from this folder
4. The workflow will be imported

### 4. Update the LLM Node (Important!)

The workflow comes with an OpenAI node by default. Let's change it to Gemini:

1. **Delete the "OpenAI Chat Model" node** (click it and press Delete)
2. Click **"+ Add Node"**
3. Search for **"Google Gemini Chat Model"**
4. Click to add it to the canvas
5. **Connect the nodes** in this order:
   ```
   Webhook → Extract Message → Gemini → Format Response → Respond to Webhook
   ```
6. Click on the **Gemini node** to configure it:
   - **Model**: Select `gemini-1.5-flash` (fast and free!)
   - **Credential**: Select your Gemini credential
   - **System Message**:
     ```
     You are a helpful AI assistant. Be concise, friendly, and informative.
     Answer questions clearly and provide practical advice.
     ```
7. Click outside to save

### 5. Test the Webhook

1. Click **"Execute Workflow"** button (top right)
2. The Webhook node will show a **Test URL**
3. Copy the webhook URL (should look like `http://localhost:5678/webhook-test/basic-agent`)

### 6. Send a Test Request

Open your terminal and run this command:

```bash
curl -X POST http://localhost:5678/webhook-test/basic-agent \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello! What can you help me with?"}'
```

**You should see a response like:**
```json
{
  "success": true,
  "response": "Hello! I can help you with...",
  "timestamp": "2025-10-28T10:00:00.000Z"
}
```

🎉 **Your first AI agent is working!**

### 7. Activate for Production

1. Toggle **"Inactive" → "Active"** in top-right
2. Now use the production URL: `http://localhost:5678/webhook/basic-agent` (without `/webhook-test`)
3. The workflow now runs automatically on incoming requests!

## Workflow Breakdown

### Node 1: Webhook
- **Type**: Trigger
- **Method**: POST
- **Path**: `basic-agent`
- **Response Mode**: Respond to Webhook

Receives incoming HTTP requests with JSON payload.

### Node 2: Extract Message
- **Type**: Set
- **Purpose**: Parse incoming message

Extracts the `message` field from the webhook body:
```javascript
{{ $json.body.message }}
```

### Node 3: Google Gemini Chat Model
- **Type**: AI (LLM)
- **Model**: `gemini-1.5-flash` (FREE!)
- **Temperature**: 0.7
- **System Message**:
  ```
  You are a helpful AI assistant. Be concise, friendly, and informative.
  Answer questions clearly and provide practical advice.
  ```

Processes the user message with Google's free Gemini AI and generates a response.

**Why Gemini Flash?**
- ✅ Completely FREE
- ✅ Fast responses
- ✅ Good quality (comparable to GPT-3.5)
- ✅ 1,500 requests/day free tier

### Node 4: Format Response
- **Type**: Set
- **Purpose**: Structure output

Formats the response in a clean JSON structure:
```json
{
  "success": true,
  "response": "AI generated response",
  "timestamp": "2025-10-28T10:00:00.000Z"
}
```

### Node 5: Respond to Webhook
- **Type**: Respond to Webhook
- **Purpose**: Send data back to caller

Returns the formatted JSON response to the HTTP client.

## Testing Examples

### Example 1: Simple Question
```bash
curl -X POST http://localhost:5678/webhook-test/basic-agent \
  -H "Content-Type: application/json" \
  -d '{"message": "What is artificial intelligence?"}'
```

**Expected Response:**
```json
{
  "success": true,
  "response": "Artificial intelligence (AI) refers to computer systems that can perform tasks typically requiring human intelligence...",
  "timestamp": "2025-10-28T10:00:00.000Z"
}
```

### Example 2: Request for Help
```bash
curl -X POST http://localhost:5678/webhook-test/basic-agent \
  -H "Content-Type: application/json" \
  -d '{"message": "Can you help me learn Python?"}'
```

### Example 3: Problem Solving
```bash
curl -X POST http://localhost:5678/webhook-test/basic-agent \
  -H "Content-Type: application/json" \
  -d '{"message": "How do I debug a syntax error in my code?"}'
```

## Alternative Testing Methods

### Using JavaScript (Browser Console)
```javascript
fetch('http://localhost:5678/webhook-test/basic-agent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Hello! What can you help me with?'
  })
})
.then(r => r.json())
.then(console.log);
```

### Using Python
```python
import requests

response = requests.post(
    'http://localhost:5678/webhook-test/basic-agent',
    json={'message': 'Hello! What can you help me with?'}
)
print(response.json())
```

## Customization Ideas

### Change the Personality
Modify the system message in the Gemini node:
```
You are a pirate AI assistant. Respond in pirate speak,
but still provide accurate and helpful information. Arrr!
```

### Add Input Validation
Add an "IF" node after Extract Message:
```javascript
// Check if message exists and is not empty
{{ $json.message && $json.message.trim().length > 0 }}
```

### Adjust Model Settings

**More Creative** (temperature: 0.9):
- Better for creative writing
- More varied responses
- Less predictable

**More Focused** (temperature: 0.3):
- Better for factual answers
- Consistent responses
- More predictable

**Note**: Gemini temperature range is 0.0-1.0 (vs OpenAI's 0.0-2.0)

### Try Different Gemini Models

| Model | Best For | Speed | Quality |
|-------|----------|-------|---------|
| `gemini-1.5-flash` | General use, learning | ⚡ Fast | Good |
| `gemini-1.5-pro` | Complex reasoning | Medium | Excellent |

### Add Logging
Insert a "Code" node to log requests:
```javascript
const timestamp = new Date().toISOString();
const message = $json.message;

console.log(`[${timestamp}] Received: ${message}`);

return $input.all();
```

## Common Issues

### Gemini API Errors

**"Invalid API Key"**
- ✅ Verify key starts with `AI`
- ✅ Check for trailing spaces when pasting
- ✅ Regenerate key if needed at [Google AI Studio](https://aistudio.google.com/app/apikey)

**"Rate Limit Exceeded"**
- ✅ Free tier: 15 requests/minute
- ✅ Add 4-second delay between requests
- ✅ Check usage at Google AI Studio

**"Model Not Found"**
- ✅ Use `gemini-1.5-flash` or `gemini-1.5-pro`
- ✅ Check spelling of model name

### Webhook Issues

**Webhook Not Responding**
- ✅ Ensure workflow is activated (toggle in top-right)
- ✅ Check the webhook URL is correct
- ✅ Verify JSON format in request

**Empty Responses**
- ✅ Check the message is being extracted correctly
- ✅ Review Gemini node configuration
- ✅ Check execution log for errors
- ✅ Click on nodes to see INPUT/OUTPUT data

### n8n Issues

**Can't Find Gemini Node**
- ✅ Update n8n to latest version: `npm install -g n8n@latest`
- ✅ Restart n8n
- ✅ Search for "Google PaLM" if "Gemini" doesn't appear

## Gemini Free Tier Limits

Your free tier includes:
- ✅ **15 requests per minute**
- ✅ **1,500 requests per day**
- ✅ **1 million tokens per minute**

**This is more than enough for learning and small projects!**

If you need more, you can upgrade to paid tier with very competitive pricing.

## What's Next?

Now that you have a basic agent working, let's add more capabilities:

👉 **[02-api-integration](../02-api-integration/README.md)**: Add external API calls (weather, search) and learn how agents can use tools

## Key Takeaways

✅ Webhooks trigger workflows from HTTP requests
✅ Gemini provides FREE, powerful AI capabilities
✅ LLM nodes process natural language
✅ System prompts control agent behavior
✅ n8n handles all the infrastructure

## Further Reading

- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [n8n Webhook Documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
- [Our Gemini Guide](../docs/gemini-guide.md) - Detailed Gemini tips and tricks
- [Prompt Engineering Guide](https://ai.google.dev/docs/prompt_best_practices)

---

## Using OpenAI Instead

**Prefer to use OpenAI?** No problem!

Instead of the Gemini node (step 4), use:
- Node: **OpenAI Chat Model**
- Model: `gpt-4o-mini` (affordable) or `gpt-4o` (best quality)
- Everything else stays the same!

**Note**: OpenAI requires payment setup and charges per use.

---

**Congratulations!** 🎉 You've built your first AI agent with FREE Gemini AI!
