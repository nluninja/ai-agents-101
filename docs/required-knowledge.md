# Required Knowledge - Quick Reference

## TL;DR - Can I Do This?

### ✅ YES, if you can:
- Use a computer and web browser
- Copy and paste text
- Follow step-by-step instructions
- Type commands in a terminal (we provide them!)

### ❌ NO special knowledge required:
- Programming/coding
- API development
- Database administration
- Previous n8n experience

---

## Knowledge Levels by Tutorial

| Tutorial | Computer Skills | n8n Skills | Coding Skills |
|----------|----------------|------------|---------------|
| **01 - Basic** | Beginner | None | None |
| **02 - API** | Beginner | Basic | None |
| **03 - Memory** | Beginner | Basic | 5% (copy/paste) |
| **04 - MCP** | Intermediate | Intermediate | 10% (copy/paste) |
| **05 - Orchestration** | Intermediate | Intermediate | 10% (copy/paste) |

**Scale:**
- None = Not needed at all
- Basic = Can click around the interface
- Intermediate = Comfortable with the tool
- Coding % = How much you need to understand code (not write!)

---

## Specific Skills Breakdown

### Computer Skills

#### ✅ Required:
- Navigate files and folders
- Use a web browser
- Copy and paste text
- Download files
- Open a terminal/command prompt

#### ❌ NOT Required:
- System administration
- Network configuration
- Server management

---

### n8n Skills

#### ✅ Required:
- Click and drag nodes
- Connect nodes with arrows
- Fill in form fields
- Click "Execute" button

#### ⭐ Helpful (we'll teach you):
- Understanding node types
- Reading JSON data
- Using expressions like `{{ $json.field }}`

#### ❌ NOT Required:
- Building complex workflows
- Custom node development
- n8n cloud deployment

**➡️ See [n8n Basics Guide](n8n-basics.md) for full details**

---

### Coding Skills

#### ✅ Required:
- Ability to copy/paste code snippets
- Willingness to read code explanations

#### ⭐ Helpful (but not required):
- Basic JavaScript understanding
- JSON format familiarity
- API concepts

#### ❌ NOT Required:
- Writing code from scratch
- Debugging complex programs
- Understanding algorithms

**➡️ All code is provided - just copy and paste!**

---

### Terminal/Command Line

#### ✅ Required:
- Open terminal (Terminal on Mac/Linux, CMD on Windows)
- Paste commands
- Press Enter

#### Example of what you'll do:
```bash
# We provide this - you just copy/paste and press Enter
curl -X POST http://localhost:5678/webhook-test/basic-agent \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'
```

#### ❌ NOT Required:
- Writing bash scripts
- Understanding command syntax
- System commands knowledge

---

### API/Web Concepts

#### ✅ Required:
- Understanding that APIs let programs talk to each other
- Knowing a URL is a web address

#### ⭐ We'll teach you:
- What webhooks are
- How HTTP requests work
- JSON data format
- API authentication

#### ❌ NOT Required:
- REST API design
- HTTP protocol details
- OAuth implementation

---

### LLM/AI Concepts

#### ✅ Required:
- Know that AI can understand and generate text
- Understand you need an API key

#### ⭐ We'll teach you:
- How prompts work
- Temperature and parameters
- Function calling
- Memory management
- Multi-agent systems

#### ❌ NOT Required:
- Machine learning theory
- Model training
- Neural networks
- Embeddings and vectors (until advanced topics)

---

## Learning Curve

### Time to Comfort Level

```
Day 1: "What is n8n?"
       ↓
Day 1-2: First agent working (Tutorial 01)
         ↓
Week 1: Comfortable with basics (Tutorials 01-02)
        ↓
Week 2: Building real projects (Tutorials 03-04)
        ↓
Week 3+: Advanced patterns (Tutorial 05)
```

### Skill Progression

```
Tutorial 01: Learn n8n basics + webhooks
             ↓
Tutorial 02: Add API integration skills
             ↓
Tutorial 03: Add state management skills
             ↓
Tutorial 04: Add protocol integration skills
             ↓
Tutorial 05: Add orchestration skills
```

---

## "Can I Start?" Checklist

### Ask yourself:

- [ ] Can I install software on my computer?
- [ ] Am I comfortable clicking around new interfaces?
- [ ] Can I follow a recipe or instruction manual?
- [ ] Am I willing to learn new concepts?
- [ ] Do I have 15 minutes to try Tutorial 01?

**If you checked all 5: START NOW!** 🚀

**If you checked 3-4: You'll do fine, just might need extra time**

**If you checked 1-2: Do the [n8n 5-minute quickstart](https://docs.n8n.io/try-it-out/) first**

---

## Common Concerns Addressed

### "I'm not a programmer"
✅ **Perfect!** These tutorials are designed for non-programmers.

### "I've never used n8n before"
✅ **Great!** Tutorial 01 teaches you everything needed.

### "I don't understand APIs"
✅ **No problem!** We explain APIs as we use them.

### "I'm scared of the terminal"
✅ **Don't be!** You just copy/paste commands we provide.

### "I don't know what JSON is"
✅ **You'll learn!** We show examples of all JSON you need.

### "I'm not technical"
✅ **That's okay!** The tutorials guide you step-by-step.

---

## What You'll Learn

### By End of Tutorial 01:
- ✅ How to use n8n interface
- ✅ What webhooks do
- ✅ How AI agents work
- ✅ How to test workflows

### By End of Tutorial 02:
- ✅ How to call APIs
- ✅ What function calling is
- ✅ How to transform data
- ✅ How to build tool-using agents

### By End of Tutorial 03:
- ✅ How to manage state
- ✅ What Redis does
- ✅ How conversation memory works
- ✅ Session management

### By End of Tutorial 04:
- ✅ What MCP protocol is
- ✅ How to integrate tools
- ✅ Advanced agent patterns
- ✅ Security considerations

### By End of Tutorial 05:
- ✅ Multi-agent architectures
- ✅ Task orchestration
- ✅ Complex workflows
- ✅ Production considerations

---

## Recommended Preparation

### Option 1: Jump Right In (Recommended)
```
1. Install n8n
2. Get Gemini API key
3. Start Tutorial 01
4. Learn as you go

Time: 15 minutes to first agent
```

### Option 2: Quick n8n Intro
```
1. Read: n8n Basics Guide (this repo)
2. Watch: "n8n in 5 minutes" on YouTube
3. Try: Create one simple workflow
4. Start: Tutorial 01

Time: 30 minutes to first agent
```

### Option 3: Full Prep
```
1. Complete: n8n official quickstart
2. Build: 2-3 simple workflows
3. Read: All our docs/ guides
4. Start: Tutorial 01

Time: 2 hours to first agent
```

**Most people choose Option 1!**

---

## Quick Skill Test

### Can you do this? Then you can complete Tutorial 01:

**Task:** Create a text file, save it, and open it again.
- ✅ Yes → You have enough computer skills

**Task:** Click around a new website and find the settings.
- ✅ Yes → You can navigate n8n

**Task:** Copy this text and paste it somewhere: `{"test": "value"}`
- ✅ Yes → You can handle n8n configurations

**Task:** Open terminal/command prompt on your computer.
- ✅ Yes → You can test webhooks

---

## Bottom Line

### Required Knowledge Level: **BEGINNER**

**If you can:**
- Use a computer for everyday tasks
- Follow instructions carefully
- Be patient when learning
- Google errors when you see them

**Then you have:**
- ✅ 100% of required knowledge
- ✅ Everything needed to succeed
- ✅ The skills to complete all tutorials

### The Secret:
**You learn BY DOING, not before doing!**

---

## Next Steps

1. **Don't overthink it** - You're ready!
2. **Start Tutorial 01** - [01-basic-agent](../01-basic-agent/README.md)
3. **Learn as you go** - Best way to learn
4. **Ask for help** - Community is friendly

**See you in Tutorial 01!** 🎯

---

## Related Guides

- [n8n Basics Guide](n8n-basics.md) - Detailed n8n concepts
- [Setup Guide](setup.md) - Installation and configuration
- [Gemini Guide](gemini-guide.md) - Using free Google AI
- [Troubleshooting](troubleshooting.md) - Fix common issues
