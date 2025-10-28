# 02 - API Integration Agent

**Difficulty**: Beginner-Intermediate
**Time**: 30 minutes
**Prerequisites**: Completed 01-basic-agent, OpenWeatherMap API key (free)

## What You'll Build

An intelligent weather assistant that:
- Understands natural language requests
- Extracts location from user queries
- Calls external weather API
- Returns formatted, conversational responses

This introduces **function calling** - the ability for agents to use tools!

## Learning Objectives

- Understanding function calling / tool use
- Integrating external APIs
- Parsing and transforming API responses
- Building agents that take actions

## Architecture

```
User: "What's the weather in Paris?"
    ↓
Webhook Trigger
    ↓
Agent (with Tools)
    ├─→ Decide: Need weather info
    ├─→ Extract: location="Paris"
    ├─→ Call: Weather API Tool
    ├─→ Receive: Weather data
    └─→ Respond: "It's 18°C and sunny in Paris"
```

## Setup

### 1. Get OpenWeatherMap API Key

1. Sign up at https://openweathermap.org/api (free tier)
2. Navigate to API keys section
3. Copy your API key

### 2. Import Workflow

1. Open n8n
2. Import `workflow.json` from this folder

### 3. Configure Credentials

**OpenAI**:
- Set up as in previous tutorial

**HTTP Request** (for Weather API):
- The workflow uses direct HTTP - no credentials needed
- API key is passed as query parameter

### 4. Update Weather API Key

1. Click on "Get Weather Data" node
2. Find the `appid` parameter
3. Replace `YOUR_OPENWEATHER_API_KEY` with your actual key

## Step-by-Step Guide

### Understanding Function Calling

Function calling allows LLMs to:
1. Recognize when they need external data
2. Format tool requests properly
3. Process tool results
4. Incorporate results into responses

**Example Flow**:
```
User: "What's the weather in Tokyo?"

LLM Thinks:
- Need weather information
- Location: Tokyo
- Action: Call get_weather function

Function Call:
{
  "name": "get_weather",
  "arguments": {
    "location": "Tokyo"
  }
}

API Returns:
{
  "temperature": 15,
  "condition": "Cloudy",
  "humidity": 65
}

LLM Responds:
"The weather in Tokyo is currently 15°C and cloudy,
with 65% humidity."
```

### Testing the Agent

#### Test 1: Basic Weather Query
```bash
curl -X POST http://localhost:5678/webhook-test/weather-agent \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is the weather in London?"
  }'
```

#### Test 2: Multiple Cities
```bash
curl -X POST http://localhost:5678/webhook-test/weather-agent \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Compare the weather in New York and Los Angeles"
  }'
```

#### Test 3: Conversational Query
```bash
curl -X POST http://localhost:5678/webhook-test/weather-agent \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Is it a good day for a picnic in Paris?"
  }'
```

#### Test 4: Non-Weather Query
```bash
curl -X POST http://localhost:5678/webhook-test/weather-agent \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is the capital of France?"
  }'
```

The agent should handle this gracefully without calling the weather API.

## Workflow Breakdown

### Node 1: Webhook
Same as basic agent - receives POST requests.

### Node 2: AI Agent
- **Type**: LangChain AI Agent
- **Agent Type**: OpenAI Functions Agent
- **Tools**: Connected to Weather Tool

This is the brain that decides when to use tools.

**System Prompt**:
```
You are a helpful weather assistant. When users ask about weather,
use the get_weather tool to fetch current conditions. Provide
friendly, conversational responses.

If asked about non-weather topics, answer helpfully but mention
your specialty is weather information.
```

### Node 3: Weather Tool (Sub-workflow)

#### Extract Location
```javascript
// Parse location from function arguments
const args = JSON.parse($json.arguments);
return [{ json: { location: args.location } }];
```

#### Get Weather Data
```
GET https://api.openweathermap.org/data/2.5/weather
Parameters:
  - q: {{ $json.location }}
  - appid: YOUR_API_KEY
  - units: metric
```

#### Format Weather Response
```javascript
const data = $json;
return [{
  json: {
    location: data.name,
    temperature: data.main.temp,
    feels_like: data.main.feels_like,
    condition: data.weather[0].description,
    humidity: data.main.humidity,
    wind_speed: data.wind.speed
  }
}];
```

### Node 4: Respond to Webhook
Returns the agent's final response.

## Advanced Concepts

### Function Definitions

The agent knows about the weather tool through this definition:

```json
{
  "name": "get_weather",
  "description": "Get current weather information for a specific location",
  "parameters": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "City name or location (e.g., 'London', 'New York')"
      }
    },
    "required": ["location"]
  }
}
```

This tells the LLM:
- What the tool does
- What parameters it needs
- What format to use

### Error Handling

Add error handling for:

**Invalid Location**:
```javascript
if ($json.cod === "404") {
  return [{
    json: {
      error: "Location not found",
      message: "Please check the city name and try again"
    }
  }];
}
```

**API Rate Limit**:
```javascript
if ($json.cod === 429) {
  return [{
    json: {
      error: "Rate limit exceeded",
      message: "Too many requests. Please try again later."
    }
  }];
}
```

### Response Formatting

Make responses more conversational:

```javascript
const temp = Math.round($json.temperature);
const condition = $json.condition;

let message = `It's ${temp}°C and ${condition} in ${$json.location}`;

// Add context
if (temp > 25) {
  message += ". It's quite warm!";
} else if (temp < 10) {
  message += ". It's pretty cold!";
}

if ($json.humidity > 80) {
  message += " It's also quite humid.";
}

return [{ json: { response: message } }];
```

## Customization Ideas

### Add More Weather Details
Modify the format node to include:
- UV index
- Precipitation probability
- Sunrise/sunset times
- Air quality

### Multiple Tools
Add additional tools:

**Get Forecast**:
```javascript
// 5-day forecast
GET https://api.openweathermap.org/data/2.5/forecast
```

**Search Location**:
```javascript
// For ambiguous locations
GET https://api.openweathermap.org/geo/1.0/direct
```

**Get Air Quality**:
```javascript
GET https://api.openweathermap.org/data/2.5/air_pollution
```

### Different APIs

Replace weather with other APIs:

**News API**:
```javascript
{
  "name": "get_news",
  "description": "Get latest news on a topic"
}
```

**Stock Prices**:
```javascript
{
  "name": "get_stock_price",
  "description": "Get current stock price"
}
```

**Wikipedia**:
```javascript
{
  "name": "search_wikipedia",
  "description": "Search Wikipedia for information"
}
```

## Common Issues

### Agent Not Calling Function
- Check function definition is valid JSON
- Ensure description is clear
- Verify agent type is "OpenAI Functions Agent"
- Try being more explicit in system prompt

### Weather API Errors
- Verify API key is correct
- Check location spelling
- Ensure units parameter is set (metric/imperial)
- Review API quota limits

### Incorrect Responses
- Check data transformation in Format node
- Verify API response structure
- Add error handling for missing fields

## Testing Checklist

- [ ] Simple weather query works
- [ ] Multiple cities work
- [ ] Conversational queries work
- [ ] Non-weather queries handled gracefully
- [ ] Invalid locations return helpful errors
- [ ] Temperature units are correct
- [ ] Response is conversational and helpful

## What's Next?

Great! Your agent can now use tools. Next step is adding memory:

**[03-memory-agent](../03-memory-agent/README.md)**: Build an agent that remembers conversation context

## Key Takeaways

✓ Function calling enables agents to use external tools
✓ Clear function definitions are crucial
✓ Agents can decide when to use tools
✓ API integration expands agent capabilities
✓ Error handling improves user experience

## Further Reading

- [OpenAI Function Calling](https://platform.openai.com/docs/guides/function-calling)
- [LangChain Tools](https://python.langchain.com/docs/modules/agents/tools/)
- [n8n HTTP Request Node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/)
