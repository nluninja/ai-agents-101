# 03 - Memory-Enabled Agent

**Difficulty**: Intermediate
**Time**: 45 minutes
**Prerequisites**: Completed 01 & 02, Redis installed (optional)

## What You'll Build

A stateful conversational agent that:
- Remembers previous messages in a conversation
- Maintains context across multiple requests
- Provides personalized, contextual responses
- Manages conversation sessions

This is crucial for building chatbots that feel natural!

## Learning Objectives

- Understanding conversation memory
- Session management strategies
- Working with Redis for state storage
- Context window management
- Memory retrieval and formatting

## Architecture

```
User: "My name is Alice"
    ↓
Load Session Memory
    ↓
Agent (with Context)
    ↓
Save to Memory
    ↓
Response: "Nice to meet you, Alice!"

---

User: "What's my name?"
    ↓
Load Session Memory (finds "My name is Alice")
    ↓
Agent (with Context)
    ↓
Response: "Your name is Alice!"
```

## Memory Strategies

### 1. Buffer Memory (Simple)
Stores all messages in a list.

**Pros**: Simple, complete history
**Cons**: Context window limits, slower

```javascript
memory = [
  {role: "user", content: "Hi"},
  {role: "assistant", content: "Hello!"},
  {role: "user", content: "How are you?"}
]
```

### 2. Sliding Window
Keeps only the last N messages.

**Pros**: Fixed size, fast
**Cons**: Loses older context

```javascript
memory = messages.slice(-10); // Last 10 messages
```

### 3. Summary Memory
Summarizes older messages.

**Pros**: Retains important info, compact
**Cons**: Loses details, requires LLM calls

```javascript
memory = {
  summary: "User's name is Alice, discussing weather",
  recent: [last 5 messages]
}
```

### 4. Vector Memory (Advanced)
Stores embeddings, retrieves relevant messages.

**Pros**: Semantic search, scalable
**Cons**: Complex, requires vector DB

## Setup

### Option 1: In-Memory Storage (Simplest)

No additional setup needed! Uses n8n's static data to store conversations temporarily.

**Limitations**:
- Lost on workflow restart
- Not suitable for production
- Limited to single n8n instance

### Option 2: Redis (Recommended)

**Install Redis**:

```bash
# macOS
brew install redis
brew services start redis

# Ubuntu/Debian
sudo apt-get install redis-server
sudo systemctl start redis

# Docker
docker run -d --name redis -p 6379:6379 redis

# Windows (WSL)
sudo apt-get install redis-server
sudo service redis-server start
```

**Verify Redis**:
```bash
redis-cli ping
# Should return: PONG
```

**Configure in n8n**:
1. Go to Settings → Credentials
2. Add "Redis" credential
3. Host: `localhost`, Port: `6379`, Database: `0`

### Option 3: Database (PostgreSQL, MySQL)

Use n8n's database nodes for persistent storage.

## Import and Configure

1. Import `workflow.json`
2. Choose memory backend (in-memory or Redis)
3. Update OpenAI credentials

## Workflow Breakdown

### Node 1: Webhook
Receives messages with `sessionId` and `message`:

```json
{
  "sessionId": "user-123",
  "message": "What's my name?"
}
```

### Node 2: Extract Session Data
```javascript
const sessionId = $json.body.sessionId || 'default';
const message = $json.body.message;

return [{
  json: {
    sessionId,
    message
  }
}];
```

### Node 3: Load Memory (Redis)
```
GET memory:{sessionId}
```

Returns conversation history or empty array if new session.

### Node 4: Format Context
```javascript
// Parse stored memory
const history = $json.memory ? JSON.parse($json.memory) : [];
const currentMessage = $('Extract Session Data').first().json.message;

// Add current message to history
history.push({
  role: 'user',
  content: currentMessage
});

return [{
  json: {
    messages: history,
    sessionId: $('Extract Session Data').first().json.sessionId
  }
}];
```

### Node 5: AI Agent with Memory
```
System: You are a helpful assistant with memory of past conversations.

Messages: [conversation history]
```

### Node 6: Save Memory
```javascript
const sessionId = $json.sessionId;
const messages = $json.messages;
const response = $json.response;

// Add assistant response to history
messages.push({
  role: 'assistant',
  content: response
});

// Keep only last 20 messages (sliding window)
const trimmed = messages.slice(-20);

// Save to Redis
return [{
  json: {
    key: `memory:${sessionId}`,
    value: JSON.stringify(trimmed),
    expire: 3600 // 1 hour
  }
}];
```

### Node 7: Store in Redis
```
SET {key} {value} EX {expire}
```

### Node 8: Respond to Webhook
Returns the response to user.

## Testing the Agent

### Test 1: Introduce Yourself
```bash
curl -X POST http://localhost:5678/webhook-test/memory-agent \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "alice-session",
    "message": "Hi! My name is Alice and I love painting."
  }'
```

Expected: Greeting acknowledging the introduction.

### Test 2: Ask About Name
```bash
curl -X POST http://localhost:5678/webhook-test/memory-agent \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "alice-session",
    "message": "What is my name?"
  }'
```

Expected: "Your name is Alice!"

### Test 3: Ask About Hobby
```bash
curl -X POST http://localhost:5678/webhook-test/memory-agent \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "alice-session",
    "message": "What do I like to do?"
  }'
```

Expected: "You mentioned you love painting!"

### Test 4: Different Session
```bash
curl -X POST http://localhost:5678/webhook-test/memory-agent \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "bob-session",
    "message": "What is my name?"
  }'
```

Expected: Agent doesn't know (different session).

### Test 5: Contextual Conversation
```bash
# Message 1
curl -X POST http://localhost:5678/webhook-test/memory-agent \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test-123",
    "message": "I need help planning a trip to Japan."
  }'

# Message 2
curl -X POST http://localhost:5678/webhook-test/memory-agent \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test-123",
    "message": "What are the best months to visit?"
  }'

# Message 3
curl -X POST http://localhost:5678/webhook-test/memory-agent \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test-123",
    "message": "And what about accommodation?"
  }'
```

The agent should maintain context about the Japan trip throughout.

## Inspect Memory (Redis)

```bash
# List all session keys
redis-cli KEYS "memory:*"

# View a specific session
redis-cli GET "memory:alice-session"

# Check time to live
redis-cli TTL "memory:alice-session"

# Delete a session
redis-cli DEL "memory:alice-session"

# Clear all sessions
redis-cli FLUSHDB
```

## Advanced Features

### Implement Summary Memory

Add a "Summarize" node that runs every 10 messages:

```javascript
const messages = $json.messages;

if (messages.length > 10) {
  // Extract older messages
  const toSummarize = messages.slice(0, -5);
  const recent = messages.slice(-5);

  // Call LLM to summarize
  const summary = await summarizeMessages(toSummarize);

  return [{
    json: {
      summary: summary,
      messages: recent
    }
  }];
}

return [{ json: $json }];
```

### Add User Profiles

Store user information separately:

```javascript
// User profile
{
  "userId": "alice-123",
  "name": "Alice",
  "preferences": {
    "topics": ["art", "travel"],
    "tone": "casual"
  },
  "facts": [
    "Loves painting",
    "Planning trip to Japan"
  ]
}
```

### Implement Memory Search

For long conversations, search for relevant past messages:

```javascript
// Simple keyword search
function searchMemory(messages, query) {
  return messages.filter(msg =>
    msg.content.toLowerCase().includes(query.toLowerCase())
  );
}

// Usage
const relevantMessages = searchMemory(history, "painting");
```

### Add Memory Analytics

Track conversation metrics:

```javascript
{
  "sessionId": "alice-session",
  "messageCount": 15,
  "startTime": "2024-01-27T10:00:00Z",
  "lastActivity": "2024-01-27T10:30:00Z",
  "topics": ["art", "japan", "travel"]
}
```

## Session Management

### Session Expiration

**Short Sessions** (30 min):
```javascript
expire: 1800 // seconds
```

**Long Sessions** (24 hours):
```javascript
expire: 86400
```

**Permanent** (until manually deleted):
```javascript
// Don't set expiration
```

### Session Reset

Add an endpoint to clear session:

```bash
curl -X POST http://localhost:5678/webhook/memory-agent/reset \
  -H "Content-Type: application/json" \
  -d '{"sessionId": "alice-session"}'
```

### Multi-User Support

Generate unique session IDs:

```javascript
// Option 1: User ID based
sessionId = `user-${userId}`;

// Option 2: UUID
sessionId = generateUUID();

// Option 3: Combination
sessionId = `${userId}-${timestamp}`;
```

## Performance Optimization

### Lazy Loading
Only load memory when needed:
```javascript
if (requiresContext(message)) {
  loadMemory();
} else {
  processWithoutMemory();
}
```

### Caching
Cache frequently accessed sessions in-memory.

### Compression
Compress large conversation histories:
```javascript
const compressed = gzip(JSON.stringify(messages));
```

## Common Issues

### Memory Not Persisting
- Check Redis connection
- Verify session ID is consistent
- Ensure expiration isn't too short

### Context Too Long
- Implement sliding window
- Use summary memory
- Reduce system prompt length

### Responses Lack Context
- Check memory is being loaded
- Verify messages format
- Ensure session ID is passed correctly

## Testing Checklist

- [ ] New session starts with no memory
- [ ] Agent remembers information from previous messages
- [ ] Multiple sessions are isolated
- [ ] Sessions expire correctly
- [ ] Memory survives workflow restarts (if using Redis)
- [ ] Context window doesn't overflow
- [ ] Session reset works

## What's Next?

Now that you have memory, let's integrate with MCP:

**[04-mcp-agent](../04-mcp-agent/README.md)**: Build an agent with Model Context Protocol

## Key Takeaways

✓ Memory enables contextual conversations
✓ Session management isolates users
✓ Sliding windows prevent context overflow
✓ Redis provides persistent storage
✓ Proper expiration saves resources

## Further Reading

- [LangChain Memory Types](https://python.langchain.com/docs/modules/memory/)
- [Redis Documentation](https://redis.io/docs/)
- [Conversation Design Best Practices](https://developers.google.com/assistant/conversation-design/)
- [Managing Context in Chatbots](https://www.rasa.com/docs/rasa/conversation-driven-development/)
