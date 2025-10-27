# n8n Basics: What You Need to Know

**Before starting the AI agent tutorials, here's what you need to understand about n8n.**

## TL;DR - Required Knowledge Level

**Absolute Minimum:**
- ✅ Know what a workflow is (steps that run in order)
- ✅ Understand click and drag
- ✅ Can follow step-by-step instructions

**Ideal Level:**
- ✅ Have created 1-2 simple n8n workflows
- ✅ Understand nodes and connections
- ✅ Know how data flows through workflows

**NOT Required:**
- ❌ JavaScript/programming expertise
- ❌ Deep n8n experience
- ❌ API or webhook knowledge
- ❌ Database experience

---

## Core Concepts You Need

### 1. What is n8n?

**Simple Answer:** n8n is a visual workflow automation tool.

**Think of it like:**
- Legos for automation
- IFTTT but more powerful
- Zapier but self-hosted and visual

**What you do:**
```
Drag boxes → Connect them → Configure → Run
```

**Example:**
```
[Webhook] → [Process Data] → [Send Email] → Done!
```

---

### 2. Nodes (The Building Blocks)

**What is a Node?**
A node is a box that does ONE thing.

**Types You'll Use:**

#### **Trigger Nodes** (Start the workflow)
```
🔔 Webhook - Receives HTTP requests
⏰ Schedule - Runs at specific times
📧 Email - Triggers on new email
```

**For our tutorials:** We use **Webhook** (receives API calls)

#### **Action Nodes** (Do something)
```
🤖 AI/LLM - Calls ChatGPT/Gemini
📊 Set - Transforms data
💾 Database - Stores/retrieves data
🌐 HTTP - Calls APIs
```

**For our tutorials:** We use all of these!

#### **Logic Nodes** (Make decisions)
```
🔀 IF - Choose path based on condition
🔄 Switch - Multiple paths
➰ Loop - Repeat actions
```

**For our tutorials:** Used in advanced examples

---

### 3. Connections (How Data Flows)

**The Arrow Between Nodes:**

```
[Node A] ──→ [Node B]
```

This means: "Send data from A to B"

**Key Rules:**
1. Data flows LEFT to RIGHT
2. Each node processes data from previous node
3. You can see data by clicking on nodes

**Visual Example:**
```
[Webhook]           [Extract Name]      [AI Response]
   |                      |                    |
   | {"name": "Alice"}    | name: "Alice"      | "Hello Alice!"
   |                      |                    |
   └──────────────────────┴────────────────────┘
```

---

### 4. Executing Workflows

**Two Ways to Run:**

#### **Test Mode** (While building)
```
1. Click "Execute Workflow" button
2. Workflow waits for input
3. Send test request
4. See results immediately
```

#### **Production Mode** (Live)
```
1. Toggle "Inactive" → "Active"
2. Workflow runs automatically
3. Triggered by real events
4. Logs all executions
```

**For tutorials:** We start in Test Mode

---

### 5. Data & Expressions

**How Data Looks in n8n:**

Every node receives JSON data:
```json
{
  "name": "Alice",
  "age": 30,
  "city": "Paris"
}
```

**Accessing Data (Expressions):**

To use data from previous nodes:
```
{{ $json.name }}        → "Alice"
{{ $json.age }}         → 30
{{ $json.city }}        → "Paris"
```

**Common Expressions:**
```
{{ $json.fieldName }}              - Get a field
{{ $now }}                         - Current timestamp
{{ $('Node Name').first().json }}  - Get data from specific node
```

**For tutorials:** We provide all expressions - just copy/paste!

---

## What You'll Actually Do

### Tutorial Flow (What to Expect)

#### **Step 1: Import**
```
1. Download workflow.json
2. Open n8n
3. Click "Import from File"
4. Select the file
```
**Skill needed:** Basic file navigation

#### **Step 2: Configure Credentials**
```
1. Click on AI node (has red warning)
2. Click "Credential to connect with"
3. Select your API credential
4. Save
```
**Skill needed:** Following instructions

#### **Step 3: Test**
```
1. Click "Execute Workflow"
2. Copy webhook URL
3. Open terminal
4. Paste curl command (provided)
5. See result!
```
**Skill needed:** Copy/paste, basic terminal

#### **Step 4: Activate**
```
1. Toggle switch to "Active"
2. Done!
```
**Skill needed:** Clicking a toggle

---

## Essential Skills Breakdown

### Level 1: Absolute Beginner (Tutorial 01)

**What you need to know:**
1. How to click and drag
2. How to copy/paste
3. How to use a terminal (for curl commands)

**What we teach you:**
- What webhooks are
- How LLM nodes work
- How to test workflows

**Time to learn:** 15 minutes

---

### Level 2: Basic (Tutorials 02-03)

**What you need to know:**
1. How nodes connect
2. Where to find node settings
3. How to read JSON data

**What we teach you:**
- API integration
- Data transformation
- Memory/state management

**Time to learn:** 1-2 hours

---

### Level 3: Intermediate (Tutorials 04-05)

**What you need to know:**
1. Basic JavaScript (helpful but not required)
2. How to debug errors
3. How to read execution logs

**What we teach you:**
- Advanced integrations
- Multi-agent patterns
- Complex orchestration

**Time to learn:** 3-4 hours

---

## The n8n Interface

### Main Areas You'll Use:

```
┌─────────────────────────────────────────┐
│  [Workflow Name]  [Execute] [Active ▼]  │  ← Top Bar
├─────────────────────────────────────────┤
│ + Add Node                               │  ← Node Panel
│   Trigger Nodes                          │
│   Action Nodes                           │
│   Logic Nodes                            │
├──────────────┬──────────────────────────┤
│              │                           │
│   Node List  │     Canvas               │  ← Work Area
│              │  (Drag nodes here)        │
│              │                           │
└──────────────┴──────────────────────────┘
```

**What you click:**
1. **"+ Add Node"** - Add new functionality
2. **Nodes on canvas** - Configure settings
3. **"Execute Workflow"** - Test your work
4. **Active toggle** - Turn on/off

---

## Common n8n Tasks

### Task 1: Add a Node

```
1. Click "+ Add Node"
2. Search for node type (e.g., "Webhook")
3. Click on it
4. It appears on canvas
```

**Frequency in tutorials:** Every workflow

---

### Task 2: Connect Nodes

```
1. Hover over node (you'll see a dot)
2. Click and drag from dot
3. Drop on target node
4. Arrow appears
```

**Frequency in tutorials:** Every workflow

---

### Task 3: Configure a Node

```
1. Click on the node
2. Panel opens on right
3. Fill in fields
4. Click away to save
```

**Frequency in tutorials:** Every node

---

### Task 4: View Data

```
1. Execute workflow
2. Click on any node
3. See "INPUT" and "OUTPUT" tabs
4. Inspect JSON data
```

**Frequency in tutorials:** When debugging

---

### Task 5: Handle Errors

```
1. Red error appears on node
2. Click the node
3. Read error message
4. Fix the issue (usually credentials)
```

**Frequency in tutorials:** Occasionally

---

## JavaScript in n8n (Optional)

### Do You Need JavaScript?

**Short answer:** Not for basic tutorials!

**What we provide:**
- ✅ All code snippets ready to copy
- ✅ Explanations of what code does
- ✅ No need to write from scratch

**When JavaScript appears:**

#### **Code Node Example:**
```javascript
// This is provided in tutorials - just copy it!
const message = $json.userInput;
return [{
  json: {
    processed: message.toUpperCase()
  }
}];
```

**What you need to know:**
- ❌ Don't need to write this
- ✅ Just copy/paste it
- ✅ We explain what it does
- ✅ Can modify later if you want

**JavaScript skill level needed:**
- Tutorial 01-02: **0%** (no code nodes)
- Tutorial 03: **5%** (simple copy/paste)
- Tutorial 04-05: **10%** (some customization helpful)

---

## Pre-Tutorial Practice (Optional)

### Want to get comfortable with n8n first?

**5-Minute Exercise:**

1. **Create a Simple Workflow**
   ```
   Install n8n → Open it → Create new workflow
   ```

2. **Add Two Nodes**
   ```
   Add "Manual Trigger" → Add "Set" node → Connect them
   ```

3. **Configure Set Node**
   ```
   Click Set node → Add: name="Test", value="Hello"
   ```

4. **Execute**
   ```
   Click "Execute Workflow" → See output
   ```

**That's it!** You now know 80% of what you need.

---

## Common Beginner Questions

### Q: "What if I break something?"

**A:** You can't!
- n8n workflows are sandboxed
- Just delete and re-import
- No permanent damage possible

---

### Q: "I don't understand JSON. Is that a problem?"

**A:** Not really!
- JSON is just data in `{"key": "value"}` format
- We show you what it looks like
- You'll learn by doing

**Quick JSON primer:**
```json
{
  "name": "Alice",           ← Text value
  "age": 30,                 ← Number value
  "isStudent": false,        ← Boolean value
  "hobbies": ["reading"]     ← List value
}
```

Access with: `{{ $json.name }}`

---

### Q: "Do I need to understand APIs?"

**A:** Not deeply!

**What you need to know:**
- API = way for programs to talk to each other
- We send requests, get responses
- Webhooks are "incoming APIs"

**What we teach you:**
- How to use webhooks
- How to call APIs
- How to handle responses

---

### Q: "Can I use the n8n UI instead of terminal?"

**A:** Yes!

Instead of curl commands, you can:
1. Use Postman (GUI tool)
2. Use n8n's "HTTP Request" node
3. Use browser extensions

**We provide curl because:**
- ✅ Works everywhere
- ✅ Easy to copy/paste
- ✅ No extra tools needed

---

## Recommended Learning Path

### Before Tutorial 01:

**Option A: Jump Right In** (Recommended)
```
→ Start Tutorial 01
→ Learn n8n as you go
→ 15 minutes to first agent
```

**Option B: Learn n8n First**
```
1. Watch: "n8n in 5 minutes" (YouTube)
2. Create: Simple workflow (Manual → Set → HTTP)
3. Start: Tutorial 01
→ 30 minutes total
```

**Option C: Full n8n Course**
```
1. Complete n8n.io getting started
2. Build 3-5 simple workflows
3. Start tutorials
→ 2-3 hours
```

---

## Key n8n Resources

### Official Documentation
- [n8n Quickstart](https://docs.n8n.io/try-it-out/)
- [n8n Nodes Library](https://docs.n8n.io/integrations/)
- [n8n Expressions](https://docs.n8n.io/code-examples/expressions/)

### Video Tutorials
- [n8n YouTube Channel](https://www.youtube.com/c/n8n-io)
- Search: "n8n tutorial for beginners"

### Community
- [n8n Community Forum](https://community.n8n.io/)
- Active Discord server
- Helpful community

---

## What You'll Learn in Tutorials

### Tutorial 01 (Basic Agent)
**n8n concepts:**
- ✅ Webhooks
- ✅ LLM nodes
- ✅ Basic connections

**After this:** You can build simple AI chatbots

---

### Tutorial 02 (API Integration)
**n8n concepts:**
- ✅ HTTP Request nodes
- ✅ Data transformation
- ✅ Function calling

**After this:** You can integrate external APIs

---

### Tutorial 03 (Memory)
**n8n concepts:**
- ✅ Redis nodes
- ✅ State management
- ✅ Code nodes (basic)

**After this:** You can build stateful apps

---

### Tutorial 04 (MCP)
**n8n concepts:**
- ✅ Advanced integrations
- ✅ Custom tools
- ✅ Code nodes (intermediate)

**After this:** You understand MCP protocol

---

### Tutorial 05 (Orchestration)
**n8n concepts:**
- ✅ Complex workflows
- ✅ Multiple agents
- ✅ Logic nodes
- ✅ Loops and conditions

**After this:** You can build production systems

---

## The Honest Truth

### What n8n knowledge you ACTUALLY need:

**To start tutorials:**
```
Basic computer skills ───────────→ You can begin!
   ↓
Willingness to learn ───────────→ You'll succeed!
   ↓
Ability to follow instructions ─→ You'll finish!
```

**What you DON'T need:**
- ❌ Programming background
- ❌ API expertise
- ❌ Database knowledge
- ❌ Previous n8n experience

**What helps (but not required):**
- ⭐ Basic JSON understanding
- ⭐ Comfort with terminal/command line
- ⭐ General tech curiosity

---

## Bottom Line

### Required n8n Knowledge: **MINIMAL**

**If you can:**
1. ✅ Use a computer
2. ✅ Follow step-by-step instructions
3. ✅ Copy and paste
4. ✅ Click and drag

**Then you can:**
✅ Complete all tutorials
✅ Build AI agents
✅ Learn n8n along the way

### We Assume You're a Beginner

**Our tutorials include:**
- ✅ Screenshots of what to click
- ✅ Complete code (no writing needed)
- ✅ Explanations of every step
- ✅ Troubleshooting help
- ✅ No assumed knowledge

---

## Quick Self-Assessment

### Can you:

- [ ] Open a web browser? → You can use n8n
- [ ] Copy text and paste it? → You can configure nodes
- [ ] Follow a recipe? → You can complete tutorials
- [ ] Click and drag items? → You can build workflows

**If you checked all boxes: You're ready!** 🚀

---

## Next Steps

1. **Don't stress about n8n knowledge**
   - You'll learn as you go

2. **Start with Tutorial 01**
   - It teaches you the basics

3. **Use this guide as reference**
   - Come back when you need clarification

4. **Ask questions**
   - n8n community is very helpful

**Ready?** Head to [01-basic-agent](../01-basic-agent/README.md) and start building! 🎯
