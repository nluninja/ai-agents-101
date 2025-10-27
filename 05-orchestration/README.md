# 05 - Multi-Agent Orchestration

**Difficulty**: Advanced
**Time**: 90 minutes
**Prerequisites**: Completed 01-04

## What You'll Build

A sophisticated multi-agent system featuring:
- **Orchestrator Agent**: Coordinates and delegates tasks
- **Research Agent**: Gathers information from APIs and web
- **Writer Agent**: Creates content based on research
- **Reviewer Agent**: Reviews and improves output
- **Shared Memory**: Context sharing between agents

This demonstrates how to build complex AI systems with specialized agents working together!

## Learning Objectives

- Multi-agent architecture patterns
- Agent coordination and handoffs
- Task decomposition and delegation
- Inter-agent communication
- Workflow orchestration
- Error handling in complex systems

## Architecture

```
User Request: "Write a blog post about AI agents"
    ↓
┌─────────────────────┐
│  Orchestrator Agent │
│  (Task Manager)     │
└──────────┬──────────┘
           │
           ├─→ Step 1: Research
           │   ┌──────────────────┐
           │   │ Research Agent   │
           │   │ - Web search     │
           │   │ - API calls      │
           │   │ - Data gathering │
           │   └────────┬─────────┘
           │            │
           │            ↓ [Research Results]
           │
           ├─→ Step 2: Write
           │   ┌──────────────────┐
           │   │  Writer Agent    │
           │   │ - Draft content  │
           │   │ - Structure info │
           │   │ - Apply style    │
           │   └────────┬─────────┘
           │            │
           │            ↓ [Draft Content]
           │
           └─→ Step 3: Review
               ┌──────────────────┐
               │  Reviewer Agent  │
               │ - Check quality  │
               │ - Suggest edits  │
               │ - Finalize       │
               └────────┬─────────┘
                        │
                        ↓ [Final Output]

                Return to User
```

## Multi-Agent Patterns

### 1. Sequential Pipeline
Agents process in order:
```
A → B → C → Output
```

**Use when**: Each step depends on previous

### 2. Parallel Processing
Agents work simultaneously:
```
    ┌→ A ─┐
Task┼→ B ─┼→ Merge → Output
    └→ C ─┘
```

**Use when**: Tasks are independent

### 3. Hierarchical
Manager delegates to workers:
```
    Manager
    ├→ Worker A
    ├→ Worker B
    └→ Worker C
```

**Use when**: Complex task decomposition needed

### 4. Collaborative
Agents discuss and iterate:
```
A ⇄ B ⇄ C → Consensus → Output
```

**Use when**: Multiple perspectives needed

## Workflow Breakdown

### Node 1: Webhook
Receives complex requests requiring multiple agents.

### Node 2: Orchestrator Agent

**Role**: Task manager and coordinator

**System Prompt**:
```
You are an orchestrator agent managing a team of specialized AI agents:

1. Research Agent - Gathers information and data
2. Writer Agent - Creates content and documentation
3. Reviewer Agent - Reviews and improves quality

Your job is to:
- Break down user requests into subtasks
- Determine which agents to use
- Coordinate the workflow
- Ensure quality output

Analyze the request and create a plan with steps.
```

**Output**:
```json
{
  "plan": [
    {
      "step": 1,
      "agent": "research",
      "task": "Research AI agents and their applications",
      "requirements": ["definitions", "examples", "use cases"]
    },
    {
      "step": 2,
      "agent": "writer",
      "task": "Write blog post using research",
      "requirements": ["engaging", "informative", "1000 words"]
    },
    {
      "step": 3,
      "agent": "reviewer",
      "task": "Review and polish the post",
      "requirements": ["accuracy", "readability", "SEO"]
    }
  ]
}
```

### Node 3: Parse Execution Plan

```javascript
const orchestratorOutput = $input.first().json.message;

// Extract JSON plan
const planMatch = orchestratorOutput.match(/\{[\s\S]*\}/);
const plan = JSON.parse(planMatch[0]);

// Initialize execution context
return [{
  json: {
    plan: plan.plan,
    currentStep: 0,
    context: {
      userRequest: $('Extract Message').first().json.message,
      startTime: new Date().toISOString()
    },
    results: []
  }
}];
```

### Node 4: Execute Agent Steps (Loop)

This uses n8n's loop functionality to execute each agent in sequence.

```javascript
// Get current step
const execution = $input.first().json;
const currentStep = execution.plan[execution.currentStep];

if (!currentStep) {
  // All steps complete
  return [{
    json: {
      complete: true,
      results: execution.results
    }
  }];
}

// Prepare agent execution
return [{
  json: {
    agentType: currentStep.agent,
    task: currentStep.task,
    requirements: currentStep.requirements,
    context: execution.context,
    previousResults: execution.results
  }
}];
```

### Node 5: Research Agent

**System Prompt**:
```
You are a research agent specialized in gathering and synthesizing information.

Your capabilities:
- Search the web for information
- Access APIs for data
- Extract key insights
- Organize findings clearly

Task: {{ $json.task }}
Requirements: {{ $json.requirements }}

Provide comprehensive research findings in a structured format.
```

**Tools**:
- Web search (via API)
- Wikipedia access
- News APIs
- Data aggregation

### Node 6: Writer Agent

**System Prompt**:
```
You are a professional content writer.

Your capabilities:
- Create engaging, well-structured content
- Adapt tone and style to audience
- Use research effectively
- Write clearly and concisely

Task: {{ $json.task }}
Requirements: {{ $json.requirements }}

Research context:
{{ $json.previousResults }}

Create high-quality content based on the research.
```

**Style Parameters**:
- Tone: Professional, friendly, technical
- Length: Short, medium, long
- Format: Blog, article, documentation

### Node 7: Reviewer Agent

**System Prompt**:
```
You are a content reviewer and editor.

Your capabilities:
- Assess content quality
- Check accuracy and coherence
- Suggest improvements
- Ensure requirements are met

Task: {{ $json.task }}
Requirements: {{ $json.requirements }}

Content to review:
{{ $json.previousResults }}

Provide reviewed content with any necessary improvements.
```

**Review Criteria**:
- Accuracy
- Clarity
- Completeness
- Grammar and style
- Requirements compliance

### Node 8: Store Results & Continue Loop

```javascript
const execution = $('Parse Execution Plan').first().json;
const result = $input.first().json;

// Store result
execution.results.push({
  step: execution.currentStep + 1,
  agent: execution.plan[execution.currentStep].agent,
  output: result.output,
  timestamp: new Date().toISOString()
});

// Move to next step
execution.currentStep++;

// Check if more steps
if (execution.currentStep < execution.plan.length) {
  // Continue loop
  return [{
    json: execution
  }];
} else {
  // Complete
  return [{
    json: {
      complete: true,
      results: execution.results,
      finalOutput: execution.results[execution.results.length - 1].output
    }
  }];
}
```

### Node 9: Format Final Output

```javascript
const results = $input.first().json;

return [{
  json: {
    success: true,
    output: results.finalOutput,
    metadata: {
      steps: results.results.length,
      agents: results.results.map(r => r.agent),
      totalTime: calculateDuration(results.results[0].timestamp, results.results[results.results.length - 1].timestamp)
    }
  }
}];
```

## Testing the System

### Test 1: Simple Content Creation

```bash
curl -X POST http://localhost:5678/webhook-test/orchestration \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Write a short article about renewable energy"
  }'
```

Expected flow:
1. Research agent gathers renewable energy information
2. Writer creates article
3. Reviewer polishes it

### Test 2: Complex Analysis

```bash
curl -X POST http://localhost:5678/webhook-test/orchestration \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Analyze the pros and cons of remote work and create a comprehensive report"
  }'
```

### Test 3: Technical Documentation

```bash
curl -X POST http://localhost:5678/webhook-test/orchestration \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Create API documentation for a REST API that manages user accounts"
  }'
```

## Advanced Features

### 1. Agent Communication Protocol

Define structured messages between agents:

```javascript
{
  "from": "research_agent",
  "to": "writer_agent",
  "type": "data_handoff",
  "payload": {
    "findings": [...],
    "sources": [...],
    "recommendations": [...]
  },
  "metadata": {
    "timestamp": "...",
    "confidence": 0.95
  }
}
```

### 2. Dynamic Agent Selection

Orchestrator chooses agents based on task:

```javascript
function selectAgents(task) {
  const requirements = analyzeTask(task);

  const agents = [];

  if (requirements.needsResearch) {
    agents.push('research_agent');
  }

  if (requirements.needsData) {
    agents.push('data_agent');
  }

  if (requirements.needsCreation) {
    agents.push('writer_agent');
  }

  if (requirements.needsReview) {
    agents.push('reviewer_agent');
  }

  return agents;
}
```

### 3. Parallel Agent Execution

Run independent agents simultaneously:

```javascript
// Execute research and data gathering in parallel
const [researchResult, dataResult] = await Promise.all([
  executeAgent('research', task),
  executeAgent('data', task)
]);

// Merge results
const combined = mergeResults(researchResult, dataResult);

// Continue with writer
const draft = await executeAgent('writer', combined);
```

### 4. Agent Feedback Loops

Allow agents to request refinements:

```
Writer → Reviewer → Writer (revise) → Reviewer → Done
```

```javascript
let draft = await writerAgent.create(task);
let review = await reviewerAgent.review(draft);

while (review.needsRevision && iterations < maxIterations) {
  draft = await writerAgent.revise(draft, review.feedback);
  review = await reviewerAgent.review(draft);
  iterations++;
}

return draft;
```

### 5. Consensus Building

Multiple agents vote or agree on decisions:

```javascript
const agents = ['agent_a', 'agent_b', 'agent_c'];

const opinions = await Promise.all(
  agents.map(agent => agent.evaluate(proposal))
);

const consensus = buildConsensus(opinions);

if (consensus.agreement > 0.7) {
  proceed(proposal);
} else {
  refine(proposal, consensus.concerns);
}
```

### 6. Shared Knowledge Base

Agents access common memory:

```javascript
class SharedKnowledge {
  async store(key, value) {
    await redis.set(`shared:${key}`, JSON.stringify(value));
  }

  async retrieve(key) {
    const data = await redis.get(`shared:${key}`);
    return JSON.parse(data);
  }

  async search(query) {
    // Vector search for relevant information
    return await vectorDB.search(query);
  }
}
```

### 7. Agent Specialization

Create highly specialized agents:

**SEO Agent**:
```
Optimizes content for search engines
- Keyword analysis
- Meta tag generation
- Readability scoring
```

**Fact-Checker Agent**:
```
Verifies information accuracy
- Cross-references sources
- Checks data validity
- Flags uncertain claims
```

**Translator Agent**:
```
Handles multiple languages
- Translation
- Localization
- Cultural adaptation
```

## Monitoring and Debugging

### Execution Trace

Track agent execution:

```javascript
{
  "executionId": "exec-123",
  "trace": [
    {
      "timestamp": "2024-01-27T10:00:00Z",
      "agent": "orchestrator",
      "action": "plan_created",
      "duration": 500
    },
    {
      "timestamp": "2024-01-27T10:00:01Z",
      "agent": "research",
      "action": "research_complete",
      "duration": 3000
    },
    {
      "timestamp": "2024-01-27T10:00:04Z",
      "agent": "writer",
      "action": "content_created",
      "duration": 5000
    }
  ],
  "totalDuration": 8500
}
```

### Agent Performance Metrics

```javascript
{
  "agent": "research_agent",
  "metrics": {
    "avgDuration": 2500,
    "successRate": 0.95,
    "errorRate": 0.05,
    "totalExecutions": 1000
  }
}
```

### Error Recovery

Handle agent failures gracefully:

```javascript
async function executeWithRetry(agent, task, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await agent.execute(task);
    } catch (error) {
      console.error(`Agent ${agent.name} failed (attempt ${i + 1}):`, error);

      if (i === maxRetries - 1) {
        // Last attempt failed, use fallback
        return await fallbackAgent.execute(task);
      }

      // Wait before retry
      await sleep(1000 * (i + 1));
    }
  }
}
```

## Best Practices

### 1. Clear Agent Responsibilities
Each agent should have a well-defined role and purpose.

### 2. Effective Communication
Use structured data formats for agent handoffs.

### 3. Context Management
Share relevant context, avoid overloading with unnecessary data.

### 4. Error Handling
Implement retries, fallbacks, and graceful degradation.

### 5. Performance Optimization
- Cache common results
- Run independent tasks in parallel
- Use appropriate models for each agent

### 6. Testing
Test each agent individually and the full orchestration.

### 7. Monitoring
Track execution, performance, and errors.

## Common Issues

### Agents Not Coordinating
- Check inter-agent communication format
- Verify context is being passed correctly
- Review orchestrator logic

### Performance Issues
- Identify bottlenecks in agent execution
- Implement parallel processing where possible
- Cache repeated operations

### Inconsistent Results
- Review agent prompts for clarity
- Lower temperature for consistency
- Add validation steps

## Testing Checklist

- [ ] Orchestrator creates valid execution plans
- [ ] Research agent gathers relevant information
- [ ] Writer agent produces quality content
- [ ] Reviewer agent provides useful feedback
- [ ] Context flows correctly between agents
- [ ] Error handling works properly
- [ ] Final output meets requirements
- [ ] Performance is acceptable

## Real-World Applications

### 1. Content Creation Pipeline
Research → Write → Edit → Publish

### 2. Customer Support System
Triage → Route → Resolve → Follow-up

### 3. Data Analysis Pipeline
Collect → Clean → Analyze → Report

### 4. Code Review System
Analyze → Review → Suggest → Verify

### 5. Report Generation
Gather Data → Analyze → Write → Format

## Key Takeaways

✓ Multiple specialized agents > one general agent
✓ Clear coordination is essential
✓ Structured communication between agents
✓ Error handling and retries are critical
✓ Monitor and optimize performance
✓ Test thoroughly at each level

## Further Reading

- [AutoGPT Architecture](https://github.com/Significant-Gravitas/AutoGPT)
- [Microsoft AutoGen](https://microsoft.github.io/autogen/)
- [LangGraph Multi-Agent Systems](https://langchain-ai.github.io/langgraph/)
- [CrewAI Framework](https://github.com/joaomdmoura/crewAI)

## Congratulations!

You've completed the n8n AI Agents 101 course! You now understand:
- Basic agent architecture
- Tool use and API integration
- Memory and state management
- MCP integration
- Multi-agent orchestration

You're ready to build sophisticated AI agent systems! 🎉
