#!/usr/bin/env node

/**
 * Simple MCP Filesystem Server
 *
 * This is a basic Model Context Protocol server that provides filesystem tools.
 * It demonstrates how to build MCP servers for use with AI agents.
 *
 * Usage: node mcp-server.js
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configure allowed base directory (security)
const ALLOWED_BASE = process.env.MCP_BASE_DIR || __dirname;

/**
 * Check if a path is within allowed directory
 */
function isPathAllowed(requestedPath) {
  const resolved = path.resolve(ALLOWED_BASE, requestedPath);
  return resolved.startsWith(ALLOWED_BASE);
}

/**
 * Create MCP server instance
 */
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

/**
 * Define available tools
 */
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'read_file',
        description: 'Read the complete contents of a file from the filesystem. Use this when you need to examine file contents.',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Path to the file to read (relative to base directory)'
            }
          },
          required: ['path']
        }
      },
      {
        name: 'list_directory',
        description: 'List all files and directories in a specified path. Returns names and types (file/directory).',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Directory path to list (relative to base directory, use "." for current)'
            }
          },
          required: ['path']
        }
      },
      {
        name: 'write_file',
        description: 'Write content to a file. Creates the file if it doesn\'t exist, overwrites if it does.',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Path to the file to write'
            },
            content: {
              type: 'string',
              description: 'Content to write to the file'
            }
          },
          required: ['path', 'content']
        }
      },
      {
        name: 'create_directory',
        description: 'Create a new directory at the specified path.',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Path of the directory to create'
            }
          },
          required: ['path']
        }
      },
      {
        name: 'file_info',
        description: 'Get metadata about a file or directory (size, modified time, type).',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Path to the file or directory'
            }
          },
          required: ['path']
        }
      }
    ]
  };
});

/**
 * Handle tool execution requests
 */
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // Validate path
    if (!isPathAllowed(args.path)) {
      throw new Error(`Access denied: Path outside allowed directory`);
    }

    const fullPath = path.resolve(ALLOWED_BASE, args.path);

    switch (name) {
      case 'read_file': {
        const content = await fs.readFile(fullPath, 'utf-8');
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
        const entries = await fs.readdir(fullPath, { withFileTypes: true });
        const formatted = entries.map(entry => ({
          name: entry.name,
          type: entry.isDirectory() ? 'directory' : 'file'
        }));

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(formatted, null, 2)
            }
          ]
        };
      }

      case 'write_file': {
        await fs.writeFile(fullPath, args.content, 'utf-8');
        return {
          content: [
            {
              type: 'text',
              text: `Successfully wrote ${args.content.length} characters to ${args.path}`
            }
          ]
        };
      }

      case 'create_directory': {
        await fs.mkdir(fullPath, { recursive: true });
        return {
          content: [
            {
              type: 'text',
              text: `Successfully created directory: ${args.path}`
            }
          ]
        };
      }

      case 'file_info': {
        const stats = await fs.stat(fullPath);
        const info = {
          path: args.path,
          type: stats.isDirectory() ? 'directory' : 'file',
          size: stats.size,
          modified: stats.mtime.toISOString(),
          created: stats.birthtime.toISOString()
        };

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(info, null, 2)
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

/**
 * Start the MCP server
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('MCP Filesystem Server started');
  console.error(`Base directory: ${ALLOWED_BASE}`);
  console.error('Waiting for requests...');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
