# 04 - MCP Agent (Model Context Protocol)

**Difficulty**: Intermediate-Advanced
**Time**: 60 minutes
**Prerequisites**: Completed 01-03, Node.js installed

## What You'll Build

An agent that integrates with the Model Context Protocol (MCP) to:
- Discover available tools dynamically from MCP servers
- Execute tool calls through standardized protocol
- Access file systems, databases, and APIs via MCP
- Use a standardized context-sharing mechanism

MCP is an open protocol that enables AI applications to securely connect to data sources and tools!

## What is MCP?

**Model Context Protocol** is a universal standard for:
- Connecting LLMs to external data and tools
- Providing context to AI models
- Standardizing tool definitions and execution
- Building interoperable AI agents

### MCP Architecture

```
┌─────────────┐
│   n8n Agent │
└──────┬──────┘
       │ MCP Protocol
       ├──────────┐
       ▼          ▼
┌──────────┐  ┌──────────┐
│  Server  │  │  Server  │
│   Files  │  │ Database │
└──────────┘  └──────────┘
```

### Benefits

1. **Standardization**: One protocol for all tools
2. **Discoverability**: Tools advertise capabilities
3. **Security**: Controlled access to resources
4. **Interoperability**: Works across platforms

## MCP Components

### MCP Server
Provides tools and resources:
```javascript
{
  "tools": [
    {
      "name": "read_file",
      "description": "Read contents of a file",
      "inputSchema": { ... }
    }
  ]
}
```

### MCP Client
Discovers and calls tools:
```javascript
// Discover tools
const tools = await mcpClient.listTools();

// Execute tool
const result = await mcpClient.executeTool("read_file", {
  path: "/path/to/file"
});
```

## Setup

### 1. Install MCP SDK

```bash
npm install @modelcontextprotocol/sdk
```

### 2. Create a Simple MCP Server

Create `mcp-server.js`:

```javascript
#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import fs from 'fs/promises';
import path from 'path';

// Create MCP server
const server = new Server(
  {
    name: 'filesystem-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tools
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'read_file',
        description: 'Read the contents of a file',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Path to the file to read'
            }
          },
          required: ['path']
        }
      },
      {
        name: 'list_directory',
        description: 'List files in a directory',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Directory path'
            }
          },
          required: ['path']
        }
      },
      {
        name: 'write_file',
        description: 'Write content to a file',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'File path'
            },
            content: {
              type: 'string',
              description: 'Content to write'
            }
          },
          required: ['path', 'content']
        }
      }
    ]
  };
});

// Handle tool execution
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'read_file': {
        const content = await fs.readFile(args.path, 'utf-8');
        return {
          content: [
            {
              type: 'text',
              text: content
            }
          ]
        };
      }

      case 'list_directory': {
        const files = await fs.readdir(args.path);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(files, null, 2)
            }
          ]
        };
      }

      case 'write_file': {
        await fs.writeFile(args.path, args.content, 'utf-8');
        return {
          content: [
            {
              type: 'text',
              text: `Successfully wrote to ${args.path}`
            }
          ]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`
        }
      ],
      isError: true
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP Filesystem Server running on stdio');
}

main().catch(console.error);
```

Make it executable:
```bash
chmod +x mcp-server.js
```

### 3. Test MCP Server

```bash
# Test the server
node mcp-server.js
```

### 4. Configure MCP in n8n

Currently, n8n doesn't have native MCP support, so we'll create a custom integration using HTTP and Code nodes.

## Workflow Architecture

```
User Request
    ↓
Parse Intent
    ↓
Discover Tools (MCP)
    ↓
Agent Selects Tool
    ↓
Execute via MCP
    ↓
Format Response
    ↓
Return to User
```

## Workflow Breakdown

### Node 1: Webhook
Receives requests with tool usage intent.

### Node 2: MCP Client (Code Node)

```javascript
// MCP Client Implementation
const { spawn } = require('child_process');

class MCPClient {
  constructor(serverPath) {
    this.server = spawn('node', [serverPath]);
    this.requestId = 0;
    this.pendingRequests = new Map();

    this.server.stdout.on('data', (data) => {
      this.handleResponse(data);
    });
  }

  async listTools() {
    return this.sendRequest('tools/list');
  }

  async executeTool(name, args) {
    return this.sendRequest('tools/call', {
      name,
      arguments: args
    });
  }

  sendRequest(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.requestId;
      const request = {
        jsonrpc: '2.0',
        id,
        method,
        params
      };

      this.pendingRequests.set(id, { resolve, reject });
      this.server.stdin.write(JSON.stringify(request) + '\n');
    });
  }

  handleResponse(data) {
    const response = JSON.parse(data.toString());
    const pending = this.pendingRequests.get(response.id);

    if (pending) {
      if (response.error) {
        pending.reject(new Error(response.error.message));
      } else {
        pending.resolve(response.result);
      }
      this.pendingRequests.delete(response.id);
    }
  }
}

// Usage in workflow
const client = new MCPClient('./mcp-server.js');
const tools = await client.listTools();
return [{ json: { tools } }];
```

### Node 3: Agent with MCP Tools

Uses discovered tools to process user requests.

### Node 4: Execute MCP Tool

Calls the selected tool via MCP protocol.

### Node 5: Format Response

Processes tool output and creates user-friendly response.

## Example Use Cases

### Use Case 1: File Operations

**User**: "Show me the contents of README.md"

**Flow**:
1. Agent identifies need to read file
2. Calls `read_file` tool via MCP
3. Returns file contents

```bash
curl -X POST http://localhost:5678/webhook-test/mcp-agent \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Read the file at ./docs/setup.md"
  }'
```

### Use Case 2: Directory Listing

**User**: "What files are in the src directory?"

```bash
curl -X POST http://localhost:5678/webhook-test/mcp-agent \
  -H "Content-Type: application/json" \
  -d '{
    "message": "List all files in ./src"
  }'
```

### Use Case 3: File Creation

**User**: "Create a new file called notes.txt with 'Hello World'"

```bash
curl -X POST http://localhost:5678/webhook-test/mcp-agent \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Write \"Hello World\" to notes.txt"
  }'
```

## Available MCP Servers

### Official Servers

1. **@modelcontextprotocol/server-filesystem**
   - File operations
   - Directory navigation

2. **@modelcontextprotocol/server-postgres**
   - Database queries
   - Schema inspection

3. **@modelcontextprotocol/server-sqlite**
   - SQLite operations

4. **@modelcontextprotocol/server-git**
   - Git operations
   - Repository management

### Installing Official Servers

```bash
npm install @modelcontextprotocol/server-filesystem
npm install @modelcontextprotocol/server-postgres
```

### Using Official Servers

```javascript
import { Server } from '@modelcontextprotocol/server-filesystem';

const server = new Server('/allowed/base/path');
```

## Building Custom MCP Servers

### Example: Weather MCP Server

```javascript
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'get_weather',
        description: 'Get weather for a location',
        inputSchema: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'City name'
            }
          },
          required: ['location']
        }
      }
    ]
  };
});

server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'get_weather') {
    const weather = await fetchWeather(args.location);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(weather)
        }
      ]
    };
  }
});
```

### Example: Database MCP Server

```javascript
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'query_database',
        description: 'Execute SQL query',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'SQL query to execute'
            }
          },
          required: ['query']
        }
      }
    ]
  };
});
```

## Security Considerations

### 1. Path Restrictions

```javascript
// Only allow access to specific directories
const ALLOWED_PATHS = ['/safe/directory'];

function isPathAllowed(requestedPath) {
  return ALLOWED_PATHS.some(allowed =>
    requestedPath.startsWith(allowed)
  );
}
```

### 2. Input Validation

```javascript
function validateInput(args, schema) {
  // Validate against JSON schema
  if (!validate(args, schema)) {
    throw new Error('Invalid input');
  }
}
```

### 3. Rate Limiting

```javascript
const rateLimiter = new Map();

function checkRateLimit(clientId) {
  const now = Date.now();
  const requests = rateLimiter.get(clientId) || [];
  const recent = requests.filter(t => now - t < 60000);

  if (recent.length > 100) {
    throw new Error('Rate limit exceeded');
  }

  recent.push(now);
  rateLimiter.set(clientId, recent);
}
```

## Testing MCP Integration

### Test Tool Discovery

```bash
curl -X POST http://localhost:5678/webhook-test/mcp-agent/tools \
  -H "Content-Type: application/json"
```

Expected: List of available tools from MCP server.

### Test Tool Execution

```bash
curl -X POST http://localhost:5678/webhook-test/mcp-agent \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "read_file",
    "arguments": {
      "path": "./README.md"
    }
  }'
```

## Advanced Features

### Resource Management

MCP also supports resources (not just tools):

```javascript
server.setRequestHandler('resources/list', async () => {
  return {
    resources: [
      {
        uri: 'file:///path/to/file',
        name: 'Configuration',
        mimeType: 'application/json'
      }
    ]
  };
});
```

### Prompts

MCP servers can provide prompt templates:

```javascript
server.setRequestHandler('prompts/list', async () => {
  return {
    prompts: [
      {
        name: 'analyze_code',
        description: 'Analyze code for issues'
      }
    ]
  };
});
```

### Sampling

Allow MCP servers to request LLM completions:

```javascript
server.setRequestHandler('sampling/createMessage', async (request) => {
  // Server can request AI completion
  const { messages } = request.params;
  return await getLLMCompletion(messages);
});
```

## Debugging

### Enable MCP Logging

```javascript
server.onerror = (error) => {
  console.error('[MCP Error]', error);
};

server.onclose = () => {
  console.log('[MCP] Server closed');
};
```

### Test with MCP Inspector

```bash
npm install -g @modelcontextprotocol/inspector

mcp-inspector node mcp-server.js
```

## Common Issues

### Server Not Starting
- Check Node.js version (18+)
- Verify script permissions
- Check for port conflicts

### Tools Not Discovered
- Ensure `tools/list` handler is implemented
- Verify JSON schema format
- Check server connection

### Tool Execution Fails
- Validate input arguments
- Check file permissions
- Review error messages

## Testing Checklist

- [ ] MCP server starts successfully
- [ ] Tools are discovered
- [ ] Tool execution works
- [ ] Errors are handled gracefully
- [ ] Security restrictions enforced
- [ ] Agent integrates with tools
- [ ] Responses are formatted correctly

## What's Next?

Now let's combine everything into a multi-agent system:

**[05-orchestration](../05-orchestration/README.md)**: Build coordinated multi-agent workflows

## Key Takeaways

✓ MCP standardizes tool integration
✓ Dynamic tool discovery
✓ Secure, controlled access
✓ Interoperable across platforms
✓ Extensible protocol

## Further Reading

- [MCP Official Documentation](https://modelcontextprotocol.io/)
- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [MCP SDK on GitHub](https://github.com/modelcontextprotocol/sdk)
- [Building MCP Servers Guide](https://modelcontextprotocol.io/docs/building-servers)
