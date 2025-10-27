# n8n AI Agents 101: From Basics to Advanced

A comprehensive tutorial series for building AI agents with n8n, progressing from simple chatbots to advanced multi-agent systems.

## What You'll Learn

This tutorial covers:
- **Basic Agent**: Simple conversational AI agent
- **API Integration**: Agent that interacts with external services
- **Memory-Enabled Agent**: Stateful agent that remembers conversation context
- **MCP Integration**: Agent using Model Context Protocol for tool use
- **Multi-Agent Orchestration**: Coordinated system with specialized agents

## Prerequisites

- n8n installed (local or cloud)
- **LLM API Key** - Choose one:
  - **Google Gemini API** (Recommended - FREE tier available!) - [Get key](https://aistudio.google.com/app/apikey)
  - **OpenAI API** (Paid) - [Get key](https://platform.openai.com/api-keys)
- Basic understanding of n8n workflows (see [n8n basics guide](docs/n8n-basics.md))

> **💡 New to n8n?** Check the [n8n Basics Guide](docs/n8n-basics.md) - we only assume you can click, drag, and copy/paste!

> **💡 Using Free Google Account?** This tutorial now supports **Google Gemini API** with a generous free tier! See [docs/setup.md](docs/setup.md) for setup instructions.

## Project Structure

```
ai-agent101/
├── README.md                          # This file
├── docs/                              # Documentation
│   ├── setup.md                       # Setup instructions
│   ├── concepts.md                    # Core concepts
│   └── troubleshooting.md            # Common issues
├── 01-basic-agent/                    # Level 1: Basic agent
│   ├── README.md
│   └── workflow.json
├── 02-api-integration/                # Level 2: API integration
│   ├── README.md
│   └── workflow.json
├── 03-memory-agent/                   # Level 3: Stateful agent
│   ├── README.md
│   └── workflow.json
├── 04-mcp-agent/                      # Level 4: MCP integration
│   ├── README.md
│   └── workflow.json
└── 05-orchestration/                  # Level 5: Multi-agent system
    ├── README.md
    └── workflow.json
```

## Quick Start

1. **Setup n8n**
   ```bash
   # Using npx (recommended for beginners)
   npx n8n

   # Or using Docker
   docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n
   ```

2. **Configure Credentials**
   - **Option A (FREE)**: Add your Google Gemini API key in n8n credentials
   - **Option B (Paid)**: Add your OpenAI API key in n8n credentials
   - Set up any additional services needed

3. **Import Workflows**
   - Navigate to each tutorial folder
   - Import the `workflow.json` file into n8n
   - **If using Gemini**: Update LLM nodes after import ([see how](docs/workflow-compatibility.md))
   - Follow the README in each folder

> **⚠️ Note**: Workflows are pre-configured for OpenAI. Gemini users need to swap LLM nodes (takes < 1 min). See [Workflow Compatibility Guide](docs/workflow-compatibility.md).

## Tutorial Progression

### [01 - Basic Agent](01-basic-agent/README.md)
**Difficulty**: Beginner
**Time**: 15 minutes

Learn to create a simple conversational AI agent that:
- Receives user input via webhook
- Processes queries with an LLM
- Returns responses

**Key Concepts**: Webhooks, LLM nodes, basic prompting

---

### [02 - API Integration Agent](02-api-integration/README.md)
**Difficulty**: Beginner-Intermediate
**Time**: 30 minutes

Build an agent that interacts with external APIs:
- Weather information lookup
- Function calling/tool use
- Response formatting

**Key Concepts**: HTTP requests, function calling, data transformation

---

### [03 - Memory-Enabled Agent](03-memory-agent/README.md)
**Difficulty**: Intermediate
**Time**: 45 minutes

Create a stateful agent with conversation memory:
- Session management
- Context retention across messages
- Redis/database integration

**Key Concepts**: State management, session storage, context windows

---

### [04 - MCP Agent](04-mcp-agent/README.md)
**Difficulty**: Intermediate-Advanced
**Time**: 60 minutes

Implement an agent using Model Context Protocol:
- MCP server integration
- Tool discovery and execution
- Standardized context sharing

**Key Concepts**: MCP protocol, tool servers, context management

---

### [05 - Multi-Agent Orchestration](05-orchestration/README.md)
**Difficulty**: Advanced
**Time**: 90 minutes

Build a coordinated multi-agent system:
- Specialized agents (research, writer, reviewer)
- Agent coordination and handoffs
- Complex workflow orchestration

**Key Concepts**: Agent roles, task delegation, workflow coordination

---

## Learning Path

We recommend following the tutorials in order:

```
Basic Agent → API Integration → Memory → MCP → Orchestration
    ↓              ↓               ↓       ↓          ↓
  Chat         Functions        State    Tools    Teamwork
```

## Additional Resources

- [n8n Documentation](https://docs.n8n.io/)
- [n8n Community](https://community.n8n.io/)
- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## Contributing

Found an issue or want to improve the tutorials? Contributions welcome!

## License

MIT License - Feel free to use these examples for learning and building your own agents.

---

**Ready to start?** Head to [01-basic-agent](01-basic-agent/README.md) to begin your journey!
