# Step-by-Step: Building the Basic Agent in n8n

This guide walks you through creating the **01 - Basic Agent** workflow directly in the n8n interface.

## Prerequisites

- ✅ n8n installed and running (http://localhost:5678)
- ✅ Google Gemini API key ready ([Get one here](https://aistudio.google.com/app/apikey))

---

## Step 1: Create Your Gemini Credential (One-Time Setup)

Before building the workflow, set up your Gemini API credential:

1. **Open n8n** in your browser: http://localhost:5678
2. Click the **Settings** icon (⚙️) in the left sidebar
3. Click **"Credentials"**
4. Click **"Add Credential"** button (top right)
5. In the search box, type: **"Google Gemini"**
6. Select **"Google Gemini API"**
7. **Enter your API key**:
   - Paste your key (starts with `AI...`)
   - Give it a name: **"My Gemini API"** (or any name you prefer)
8. Click **"Save"**

✅ Done! You'll use this credential in all workflows.

---

## Step 2: Create a New Workflow

1. Click **"Workflows"** in the left sidebar
2. Click **"Add Workflow"** button (top right)
3. You'll see a blank canvas with a single node

---

## Step 3: Add the Webhook Trigger

The workflow needs a way to receive messages. We'll use a Webhook.

### 3.1: Configure the Webhook Node

1. **Delete the default node** if there's one on the canvas
2. Click the **"+"** button on the canvas
3. Search for: **"Webhook"**
4. Click **"Webhook"** to add it
5. **Configure the Webhook node**:
   - Click on the node to open its settings
   - **HTTP Method**: Select **POST**
   - **Path**: Enter `basic-agent` (or any path you want)
   - **Respond**: Select **"Using 'Respond to Webhook' Node"**
   - Click outside to close settings

✅ Your webhook is now configured!

**Your webhook URL will be**: `http://localhost:5678/webhook/basic-agent`

---

## Step 4: Add Edit Fields Node to Extract Message

We'll use an Edit Fields node to pass through the webhook data.

### 4.1: Add the Edit Fields Node

1. **Hover over the Webhook node**
2. Click the **"+"** button that appears on the right side
3. Search for: **"Edit Fields"** or **"Set"**
4. Select **"Edit Fields (Set)"**

### 4.2: Configure the Node

1. Click on the node to open it
2. **Rename the node**:
   - At the top, change name to: **"Extract Message"**
3. **Leave the fields empty** for now (we'll use the webhook body directly in the next step)
4. Click outside to close

✅ Message extraction node ready!

**Note**: This node serves as a clean separation point in the workflow. The actual message extraction happens in the next node using `{{ $json.body.message }}`.

---

## Step 5: Add Google Gemini Message a Model Node

This is the AI brain of your agent!

### 5.1: Add the Gemini Node

1. **Hover over the "Extract Message" node**
2. Click the **"+"** button on the right
3. In the search box, type: **"Message a model"** or **"Google Gemini"**
4. Click **"Message a model"** to add it

### 5.2: Configure the Gemini Node

1. Click on the **Gemini node** to open settings
2. **Rename it**: **"Message a model"** (at the top)
3. **Configure the parameters**:

   **Credential to connect with**:
   - Click the dropdown
   - Select **"My Gemini API"** (or whatever you named it in Step 1)
   - **Note**: The credential type will be "Google PaLM API" - this is correct for Gemini!

   **Model**:
   - Click the dropdown under "Model ID"
   - Select: **models/gemini-2.0-flash** (the newest, fastest Gemini model!)
   - If not available, use **models/gemini-1.5-flash**

   **Messages** (scroll down):
   - Click **"Add Message"**

   **Message 1** (User message):
   - **Content**: `={{ $json.body.message }}`
   - **Role**: Leave as default (user)

   **Message 2** (System instruction):
   - Click **"Add Message"** again
   - **Content**:
     ```
     You are a helpful AI assistant. Provide clear, concise, and friendly responses to user queries. If you're unsure about something, acknowledge it honestly.
     ```
   - **Role**: Select **"model"** or **"system"**

4. Click outside to close

✅ Your AI agent is configured!

---

## Step 6: Add Format Response Node

Let's structure the response nicely.

### 6.1: Add Edit Fields Node

1. **Hover over the "Message a model" node**
2. Click the **"+"** button
3. Search for: **"Edit Fields"** (or "Set")
4. Click **"Edit Fields (Set)"**

### 6.2: Configure the Edit Fields Node

1. Click on the node to open it
2. **Rename it**: **"Format Response"**
3. **Leave empty for now** or add your custom response fields:

   **Optional: Add custom fields** by clicking **"Add Assignment"**:

   **Field 1** (Success indicator):
   - **Name**: `success`
   - **Type**: `Boolean`
   - **Value**: `true`

   **Field 2** (AI Response):
   - Click **"Add Assignment"** again
   - **Name**: `response`
   - **Type**: `String`
   - **Value**: `={{ $json.candidates[0].content.parts[0].text }}`
   - Or simply pass through: `={{ $json }}`

   **Field 3** (Timestamp):
   - Click **"Add Assignment"** again
   - **Name**: `timestamp`
   - **Type**: `String`
   - **Value**: `={{ $now }}`

4. Toggle **"Keep Only Set"** to **ON** if you added fields (this removes other fields)
5. Click outside to close

✅ Response formatted!

**Note**: The "Message a model" node returns a complex response structure. You can either pass it through directly or extract specific parts as shown above.

---

## Step 7: Add Respond to Webhook Node

Now we send the response back.

### 7.1: Add the Node

1. **Hover over "Format Response" node**
2. Click the **"+"** button
3. Search for: **"Respond to Webhook"**
4. Click **"Respond to Webhook"**

### 7.2: Configure It

1. Click on the node
2. **Respond With**: Select **"JSON"**
3. **Response Body**: Enter `={{ $json }}`
4. Click outside to close

✅ Webhook response configured!

---

## Step 8: Connect All Nodes (If Not Auto-Connected)

Make sure all nodes are connected in this order:

```
Webhook → Extract Message → AI Agent → Format Response → Respond to Webhook
```

If any connection is missing:
1. Click and drag from the **dot on the right** of one node
2. Drop it on the **target node**

---

## Step 9: Save Your Workflow

1. Click **"Save"** button (top right)
2. Give it a name: **"01 - Basic Agent"**
3. Click **"Save"**

✅ Workflow saved!

---

## Step 10: Test Your Agent!

### 10.1: Get Your Webhook URL

1. Click on the **Webhook node**
2. Look for **"Test URL"** or **"Production URL"**
3. Copy it (should be something like: `http://localhost:5678/webhook/basic-agent`)

### 10.2: Test with curl

Open a terminal and run:

```bash
curl -X POST http://localhost:5678/webhook/basic-agent \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello! What can you help me with?"}'
```

### 10.3: Expected Response

You should see:

```json
{
  "success": true,
  "response": "Hello! I'm an AI assistant and I can help you with...",
  "timestamp": "2025-01-28T12:34:56.789Z"
}
```

🎉 **It works!**

---

## Step 11: Activate the Workflow (For Production)

To make your webhook work 24/7:

1. Toggle the **"Active"** switch at the top (next to the workflow name)
2. Switch from **"Test URL"** to **"Production URL"**
3. Your workflow is now live!

---

## Troubleshooting

### ❌ "Missing credential" error

**Solution:**
- Make sure you selected your Gemini credential in the **Message a model** node
- Go back to Step 5.2 and check the "Credential to connect with" dropdown
- The credential type should be "Google PaLM API" - this is correct for Gemini!

### ❌ "Message is required" error

**Solution:**
- Make sure your request includes `{"message": "your text here"}`
- Check the curl command format in Step 10.2

### ❌ "Invalid API key" error

**Solution:**
- Your Gemini API key may be wrong
- Go to Settings → Credentials → Edit your Gemini credential
- Get a new key from: https://aistudio.google.com/app/apikey

### ❌ Gemini node shows red warning (⚠️)

**Solution:**
- This means you need to select a credential
- Click the node → Select your credential from the dropdown
- The warning should disappear

### ❌ "Rate limit exceeded"

**Solution:**
- You've hit Gemini's free tier limit (15 requests/min)
- Wait 1 minute and try again
- Or add a delay between requests

---

## What You Built

Congratulations! You just built your first AI agent with:

- ✅ **HTTP endpoint** to receive messages
- ✅ **Message validation** and extraction
- ✅ **AI processing** with Google Gemini
- ✅ **Structured JSON responses**
- ✅ **Error handling**

---

## Next Steps

Now that you have a basic agent working:

1. **Try different prompts** - Test various questions
2. **Customize the system message** - Change the agent's personality
3. **Try different models** - Switch to `gemini-1.5-pro` for more power
4. **Move to Tutorial 02** - Learn to integrate external APIs!

---

## Quick Reference: Node Configuration Summary

| Node | Type | Key Settings |
|------|------|--------------|
| Webhook | Trigger | POST, path: `basic-agent`, respond: via node |
| Extract Message | Edit Fields (Set) | Pass-through (empty fields) |
| Message a model | Google Gemini | Model: `gemini-2.0-flash`, messages: user + system |
| Format Response | Edit Fields (Set) | Optional: success, response, timestamp fields |
| Respond to Webhook | Action | JSON response with `={{ $json }}` |

---

## Need Help?

- **n8n Documentation**: https://docs.n8n.io
- **Gemini API Docs**: https://ai.google.dev/docs
- **n8n Community**: https://community.n8n.io

---

**Ready for more?** → [Tutorial 02: API Integration Agent](../02-api-integration/README.md)
