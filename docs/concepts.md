# Core Concepts

## What is an AI Agent?

An AI agent is an autonomous system that:
- Perceives its environment (receives inputs)
- Reasons about actions (uses LLM/logic)
- Takes actions (calls tools, APIs, returns responses)
- Learns or adapts (maintains memory/state)

## n8n Agent Architecture

### Basic Components

```
Input → Processing → LLM → Tools → Output
  ↓         ↓         ↓      ↓       ↓
Webhook   Transform  GPT   API    Response
```

### Agent Types

#### 1. Reactive Agent
- Responds to immediate input
- No memory between interactions
- Example: Simple Q&A bot

#### 2. Stateful Agent
- Maintains conversation history
- Uses context from previous messages
- Example: Customer support chatbot

#### 3. Tool-Using Agent
- Can execute external functions
- Decides when to use tools
- Example: Weather assistant

#### 4. Multi-Agent System
- Multiple specialized agents
- Coordinated task execution
- Example: Content creation pipeline

## Key n8n Concepts

### Nodes
- **Trigger Nodes**: Start workflows (Webhook, Schedule)
- **Action Nodes**: Perform operations (HTTP, Code, AI)
- **Logic Nodes**: Control flow (IF, Switch, Merge)

### Workflows
- Connected nodes forming execution paths
- Can be triggered manually or automatically
- Support branching and parallel execution

### Credentials
- Secure storage for API keys
- Reusable across workflows
- Encrypted at rest

## AI/LLM Concepts

### Prompts
The instructions given to the LLM:

```
System: You are a helpful assistant
User: What is the weather?
Assistant: I'll check that for you
```

### Function Calling
LLMs can request tool execution:

```json
{
  "function": "get_weather",
  "arguments": {
    "location": "San Francisco"
  }
}
```

### Context Window
- Limited memory the LLM can process
- Typically measured in tokens
- GPT-4: 8k-128k tokens
- Important for conversation history

### Temperature
- Controls randomness (0.0 - 2.0)
- Low (0.1-0.3): Focused, deterministic
- Medium (0.7): Balanced
- High (1.0+): Creative, varied

## Memory Strategies

### Stateless
- Each request is independent
- No history retained
- Pros: Simple, fast
- Cons: No context

### Session Memory
- Stores conversation per user/session
- Cleared after timeout
- Pros: Context-aware
- Cons: Limited history

### Long-Term Memory
- Persistent storage (database)
- Retrievable past interactions
- Pros: Full history
- Cons: More complex, slower

### Vector Memory
- Embeddings-based retrieval
- Semantic search of past conversations
- Pros: Relevant context
- Cons: Requires vector DB

## Best Practices

### Prompt Engineering
1. Be specific and clear
2. Provide examples
3. Define constraints
4. Specify output format

### Error Handling
1. Validate inputs
2. Handle API failures
3. Provide fallback responses
4. Log errors for debugging

### Performance
1. Minimize LLM calls
2. Cache common responses
3. Use appropriate context window
4. Implement timeouts

### Security
1. Validate webhook inputs
2. Rate limit requests
3. Sanitize user inputs
4. Secure credential storage

## Common Patterns

### ReAct (Reasoning + Acting)
```
1. Thought: What do I need to do?
2. Action: Call weather API
3. Observation: Weather is sunny
4. Thought: I have the answer
5. Response: It's sunny today
```

### Chain of Thought
```
Let me break this down:
1. First, identify the location
2. Then, fetch weather data
3. Finally, format the response
```

### Tool Selection
```
Available tools:
- calculator: For math
- weather: For weather info
- search: For general queries

User asks about weather → Select weather tool
```

## Debugging Tips

1. **Check Node Execution**
   - View input/output data
   - Check for errors in execution log

2. **Test Components Individually**
   - Run single nodes
   - Verify data transformations

3. **Monitor API Calls**
   - Check rate limits
   - Verify response formats

4. **Review Prompts**
   - Test in OpenAI playground first
   - Iterate based on outputs

## Resources

- [n8n AI Documentation](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.ai-agent/)
- [OpenAI Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)
- [LangChain Concepts](https://python.langchain.com/docs/get_started/introduction)
