# 01 - Basic Agent

**Difficulty**: Beginner
**Time**: 15 minutes
**Prerequisites**: n8n installed, OpenAI API key

## What You'll Build

A simple conversational AI agent that:
- Receives messages via webhook
- Processes them with GPT-4
- Returns intelligent responses

This is your "Hello World" for AI agents!

## Learning Objectives

- Understanding the basic agent architecture
- Setting up webhooks in n8n
- Configuring LLM nodes
- Processing and returning responses

## Architecture

```
User Input (HTTP POST)
    ↓
Webhook Trigger
    ↓
Extract Message
    ↓
OpenAI Chat Model
    ↓
Format Response
    ↓
Return JSON
```

## Step-by-Step Guide

### 1. Import the Workflow

1. Open n8n (http://localhost:5678)
2. Click "+ Add workflow"
3. Click "⋯" (three dots) → "Import from File"
4. Select `workflow.json` from this folder

### 2. Configure OpenAI Credentials

1. Click on the "OpenAI Chat Model" node
2. Click "Credential to connect with" dropdown
3. Select existing credentials or "Create New Credential"
4. Enter your OpenAI API key
5. Click "Save"

### 3. Test the Webhook

1. Click "Execute Workflow" button
2. The Webhook node will show a Test URL
3. Copy the webhook URL

### 4. Send a Test Request

Using curl:
```bash
curl -X POST http://localhost:5678/webhook-test/basic-agent \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello! What can you help me with?"
  }'
```

Using JavaScript:
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

Using Python:
```python
import requests

response = requests.post(
    'http://localhost:5678/webhook-test/basic-agent',
    json={'message': 'Hello! What can you help me with?'}
)
print(response.json())
```

### 5. Activate for Production

1. Toggle "Inactive" → "Active" in top-right
2. Use the production URL (without `/webhook-test`)
3. The workflow now runs automatically on incoming requests

## Workflow Breakdown

### Node 1: Webhook
- **Type**: Trigger
- **Method**: POST
- **Path**: `basic-agent`
- **Response**: Immediately (return response)

Receives incoming HTTP requests with JSON payload.

### Node 2: Extract Data
- **Type**: Set
- **Purpose**: Parse incoming message

Extracts the `message` field from the webhook body.

### Node 3: OpenAI Chat Model
- **Type**: AI (LLM)
- **Model**: gpt-4o-mini
- **System Prompt**:
  ```
  You are a helpful AI assistant. Be concise, friendly, and informative.
  Answer questions clearly and provide practical advice.
  ```

Processes the user message and generates a response.

### Node 4: Format Response
- **Type**: Set
- **Purpose**: Structure output

Formats the response in a clean JSON structure:
```json
{
  "success": true,
  "response": "AI generated response",
  "timestamp": "2024-01-27T12:00:00Z"
}
```

### Node 5: Respond to Webhook
- **Type**: Return Response
- **Purpose**: Send data back to caller

Returns the formatted JSON response to the HTTP client.

## Testing Examples

### Example 1: Simple Question
```bash
curl -X POST http://localhost:5678/webhook-test/basic-agent \
  -H "Content-Type: application/json" \
  -d '{"message": "What is artificial intelligence?"}'
```

Expected Response:
```json
{
  "success": true,
  "response": "Artificial intelligence (AI) is the simulation of human intelligence in machines...",
  "timestamp": "2024-01-27T12:00:00Z"
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

## Customization Ideas

### Change the Personality
Modify the system prompt in the OpenAI node:
```
You are a pirate AI assistant. Respond in pirate speak,
but still provide accurate and helpful information. Arrr!
```

### Add Input Validation
Add a "IF" node after Extract Data:
```javascript
// Check if message exists and is not empty
{{ $json.message && $json.message.trim().length > 0 }}
```

### Adjust Model Settings

**More Creative** (temperature: 0.9):
- Better for creative writing
- More varied responses
- Less predictable

**More Focused** (temperature: 0.1):
- Better for factual answers
- Consistent responses
- More predictable

### Add Logging
Insert a "Code" node to log requests:
```javascript
const timestamp = new Date().toISOString();
const message = $json.message;

console.log(`[${timestamp}] Received: ${message}`);

return $input.all();
```

## Common Issues

### Webhook Not Responding
- Ensure workflow is activated
- Check the webhook URL is correct
- Verify JSON format in request

### OpenAI Errors
- Check API key is valid
- Ensure you have credits/quota
- Verify model name is correct

### Empty Responses
- Check the message is being extracted correctly
- Review OpenAI node configuration
- Check execution log for errors

## What's Next?

Now that you have a basic agent working, let's add more capabilities:

- **[02-api-integration](../02-api-integration/README.md)**: Add external API calls (weather, search)
- Learn how agents can use tools and make decisions

## Key Takeaways

✓ Webhooks trigger workflows from HTTP requests
✓ LLM nodes process natural language
✓ System prompts control agent behavior
✓ n8n handles all the infrastructure

## Further Reading

- [n8n Webhook Documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
- [OpenAI Chat Models](https://platform.openai.com/docs/models)
- [Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
