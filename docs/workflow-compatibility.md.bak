# Workflow Compatibility Notes

## Important: Workflow JSON Files

⚠️ **The workflow JSON files in this repository are currently configured for OpenAI by default.**

### Why?

The workflow JSON files include specific node types:
- `@n8n/n8n-nodes-langchain.lmChatOpenAi` (OpenAI nodes)

To use **Google Gemini**, you'll need to make a small adjustment after importing.

## How to Use Workflows with Gemini

### Option 1: Modify After Import (Easiest)

1. **Import the workflow** as normal
2. **Click on each LLM node** (usually called "OpenAI Chat Model" or similar)
3. **Replace the node:**
   - Delete the OpenAI node
   - Add a new "Google Gemini Chat Model" node
   - Copy the system prompt from the old node
   - Connect it the same way
4. **Configure:**
   - Model: `gemini-1.5-flash`
   - Temperature: Same as original (usually 0.7)
   - System Message: Same as original

### Option 2: Edit JSON Before Import (Advanced)

If you're comfortable with JSON:

1. Open `workflow.json` in a text editor
2. Find all instances of:
   ```json
   "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi"
   ```
3. Replace with:
   ```json
   "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini"
   ```
4. Find all instances of:
   ```json
   "model": "gpt-4o-mini"
   ```
5. Replace with:
   ```json
   "model": "gemini-1.5-flash"
   ```
6. Update credentials references from `openAiApi` to `googleGeminiApi`
7. Save and import

### Option 3: Use Both (Recommended for Learning)

You can keep both providers configured:
- Use OpenAI for some workflows
- Use Gemini for others
- Compare results!

## Node Type Mapping

| OpenAI Node | Gemini Equivalent |
|-------------|-------------------|
| `lmChatOpenAi` | `lmChatGoogleGemini` |
| Credential: `openAiApi` | Credential: `googleGeminiApi` |
| Model: `gpt-4o-mini` | Model: `gemini-1.5-flash` |
| Model: `gpt-4o` | Model: `gemini-1.5-pro` |

## What Needs to Change?

### ✅ Works Without Changes
- Webhook triggers
- Data transformation nodes
- HTTP request nodes
- Code nodes
- Logic nodes (IF, Switch, etc.)
- Memory/Redis nodes

### ⚠️ Needs Credential Update
- All LLM/Chat Model nodes
- Any AI agent nodes

### 📝 May Need Adjustment
- Function calling format (minor differences)
- Response parsing (field names might differ)
- Token limits (Gemini has different limits)

## Example Conversion

### Before (OpenAI):
```json
{
  "parameters": {
    "model": "gpt-4o-mini",
    "options": {
      "temperature": 0.7
    },
    "systemMessage": "You are a helpful assistant"
  },
  "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
  "credentials": {
    "openAiApi": {
      "id": "openai-credentials",
      "name": "OpenAI API"
    }
  }
}
```

### After (Gemini):
```json
{
  "parameters": {
    "model": "gemini-1.5-flash",
    "options": {
      "temperature": 0.7
    },
    "systemMessage": "You are a helpful assistant"
  },
  "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
  "credentials": {
    "googleGeminiApi": {
      "id": "gemini-credentials",
      "name": "Google Gemini API"
    }
  }
}
```

## Will Everything Run Smoothly?

### ✅ Yes, if you:
1. Update the LLM nodes after import
2. Configure Gemini credentials properly
3. Use compatible models (`gemini-1.5-flash` or `gemini-1.5-pro`)
4. Respect rate limits (15 RPM on free tier)

### ⚠️ Potential Issues:

**Issue: "Could not find credential type"**
- Solution: Make sure n8n has Google Gemini integration installed
- Update n8n to latest version if needed

**Issue: Rate limit errors**
- Solution: Add delays between requests (see [gemini-guide.md](gemini-guide.md))

**Issue: Function calling format differences**
- Solution: Check response structure, adjust parsing if needed

**Issue: Different response fields**
- Solution: Gemini might use `text` instead of `message` - adjust accordingly

## Testing Your Setup

### Quick Test Workflow

After updating to Gemini, test with:

```bash
curl -X POST http://localhost:5678/webhook-test/basic-agent \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello! Are you using Gemini?"}'
```

Expected: You should get a response from the Gemini model.

### Debugging Tips

1. **Check node connections**
   - Ensure all nodes are connected properly

2. **Review execution log**
   - Look for errors in the workflow execution

3. **Test credentials**
   - Go to Settings → Credentials
   - Click "Test" on your Gemini credential

4. **Check model name**
   - Verify you're using `gemini-1.5-flash` or `gemini-1.5-pro`

5. **Inspect API calls**
   - Use the execution viewer to see requests/responses

## Future Updates

We're working on providing **dual workflow files**:
- `workflow-openai.json` - Pre-configured for OpenAI
- `workflow-gemini.json` - Pre-configured for Gemini

For now, the manual update process takes < 1 minute per workflow.

## Need Help?

- See [gemini-guide.md](gemini-guide.md) for detailed Gemini setup
- Check [troubleshooting.md](troubleshooting.md) for common issues
- Visit [n8n Community](https://community.n8n.io/) for support

---

**Summary:** The workflows will run smoothly with Gemini after updating the LLM nodes. It's a simple node replacement that takes less than a minute! 🚀
