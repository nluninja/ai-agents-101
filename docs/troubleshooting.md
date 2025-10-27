# Troubleshooting Guide

## Common Issues and Solutions

### Installation Issues

#### n8n Won't Start
```bash
# Check if port 5678 is in use
lsof -i :5678

# Kill the process if needed
kill -9 <PID>

# Try a different port
N8N_PORT=5679 npx n8n
```

#### Docker Container Issues
```bash
# Check container logs
docker logs n8n

# Restart container
docker restart n8n

# Remove and recreate
docker rm -f n8n
docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n
```

### Workflow Issues

#### Webhook Not Responding
1. Check if workflow is activated (toggle in top-right)
2. Verify webhook URL (test URL vs production URL)
3. Check webhook settings (authentication, methods)
4. Test with curl:
   ```bash
   curl -X POST http://localhost:5678/webhook-test/your-path \
     -H "Content-Type: application/json" \
     -d '{"message": "test"}'
   ```

#### Workflow Not Executing
1. Check node connections (all nodes properly linked?)
2. Review error messages in execution log
3. Test each node individually
4. Verify credentials are set correctly

#### Data Not Flowing Between Nodes
1. Check data transformation nodes (Set, Code)
2. Verify JSON structure matches expected format
3. Use "Run Node" to test individual nodes
4. Check expression syntax in fields

### AI/LLM Issues

#### OpenAI API Errors

**Error: Invalid API Key**
```
Solution:
1. Verify key at platform.openai.com
2. Re-enter in n8n credentials
3. Check for trailing spaces
```

**Error: Rate Limit Exceeded**
```
Solution:
1. Add rate limiting to workflow
2. Implement retry logic
3. Use delay nodes between calls
4. Consider upgrading OpenAI plan
```

**Error: Context Length Exceeded**
```
Solution:
1. Reduce conversation history
2. Summarize older messages
3. Use a model with larger context
4. Implement sliding window
```

#### LLM Not Following Instructions

**Problem**: Agent ignoring prompts
```
Solution:
1. Be more explicit in system prompt
2. Use examples in prompt
3. Increase temperature for creativity
4. Decrease temperature for consistency
5. Try different model (GPT-4 vs GPT-3.5)
```

**Problem**: Inconsistent outputs
```
Solution:
1. Lower temperature (0.1-0.3)
2. Add output format constraints
3. Use JSON mode if available
4. Validate outputs with code node
```

### Memory/Redis Issues

#### Can't Connect to Redis
```bash
# Check if Redis is running
redis-cli ping
# Should return: PONG

# Start Redis
# macOS
brew services start redis

# Linux
sudo systemctl start redis

# Docker
docker run -d -p 6379:6379 redis
```

#### Memory Not Persisting
1. Check Redis credentials in n8n
2. Verify session key format
3. Check Redis data:
   ```bash
   redis-cli
   KEYS *
   GET your-session-key
   ```

#### Session Expiring Too Quickly
```bash
# Set longer TTL in Redis
redis-cli
EXPIRE your-session-key 86400  # 24 hours
```

### MCP Issues

#### MCP Server Not Connecting
1. Verify MCP server is running
2. Check server URL and port
3. Review server logs
4. Test connection:
   ```bash
   curl http://localhost:3000/health
   ```

#### Tools Not Discovered
1. Check MCP server tool definitions
2. Verify JSON schema format
3. Review n8n MCP node configuration
4. Check server response format

### Performance Issues

#### Workflow Running Slowly
1. Reduce LLM calls
2. Implement caching
3. Optimize data transformations
4. Use appropriate context window size
5. Check external API response times

#### High Token Usage
1. Reduce system prompt length
2. Limit conversation history
3. Summarize older messages
4. Use cheaper models for simple tasks

### Debugging Strategies

#### Enable Debug Mode
```bash
# Set environment variable
N8N_LOG_LEVEL=debug n8n
```

#### Check Execution Data
1. Click on executed node
2. View INPUT and OUTPUT tabs
3. Check JSON data structure
4. Look for error messages

#### Test Components Separately
```
1. Test webhook → Return static response
2. Test LLM → Use fixed input
3. Test tools → Call directly
4. Combine once each works
```

#### Use Code Node for Debugging
```javascript
// Add this to see what data is flowing
console.log('Input:', JSON.stringify($input.all(), null, 2));
return $input.all();
```

### Error Messages

#### "Node has no input data"
- Ensure node is connected to previous node
- Check if previous node executed successfully
- Verify workflow activation

#### "Expression could not be resolved"
- Check syntax: `{{ $json.field }}`
- Verify field exists in input data
- Use expression editor (Ctrl+E)

#### "Workflow could not be started"
- Check for circular dependencies
- Verify all required nodes are configured
- Review workflow settings

### Getting Help

If you're still stuck:

1. **n8n Community Forum**
   - https://community.n8n.io/
   - Search existing topics
   - Post with workflow export and error details

2. **n8n Documentation**
   - https://docs.n8n.io/
   - Check node-specific docs
   - Review tutorials

3. **GitHub Issues**
   - https://github.com/n8n-io/n8n
   - Check if issue is already reported
   - Provide minimal reproduction

4. **Share Workflow**
   - Export workflow (without credentials)
   - Share JSON for debugging
   - Describe expected vs actual behavior

### Useful Commands

```bash
# Check n8n version
n8n --version

# Clear n8n cache
rm -rf ~/.n8n/cache

# Reset n8n database (WARNING: deletes all data)
rm ~/.n8n/database.sqlite

# Export workflow
# Go to workflow → ⋯ → Download

# Check logs
tail -f ~/.n8n/logs/n8n.log
```

### Quick Fixes Checklist

- [ ] Workflow activated?
- [ ] All nodes connected?
- [ ] Credentials configured?
- [ ] Webhook URL correct?
- [ ] API keys valid?
- [ ] Redis running (if using memory)?
- [ ] External services accessible?
- [ ] No rate limits hit?
- [ ] Input data correct format?
- [ ] n8n up to date?
