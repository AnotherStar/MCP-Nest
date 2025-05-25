import { ServerCapabilities } from '@modelcontextprotocol/sdk/types.js';
import { McpRegistryService } from '../services/mcp-registry.service';
import { McpOptions } from '../interfaces';

/**
 * Utility function to build MCP server capabilities dynamically based on
 * discovered tools, resources, and prompts
 */
export function buildMcpCapabilities(
  registry: McpRegistryService,
  options: McpOptions,
): ServerCapabilities {
  // Start with user-provided capabilities or empty object
  const baseCapabilities = options.capabilities || {};

  const capabilities: ServerCapabilities = { ...baseCapabilities };

  // Add tools capability if tools are discovered
  if (registry.getTools().length > 0) {
    capabilities.tools = capabilities.tools || {
      listChanged: true,
    };
  }

  // Removed those from the if condition because of Bug on the MCP TS SDK
  capabilities.resources = capabilities.resources || {
    listChanged: true,
  };

  capabilities.resourceTemplates = capabilities.resourceTemplates || {
    listChanged: true,
  };

  // Add prompts capability if prompts are discovered
  if (registry.getPrompts().length > 0) {
    capabilities.prompts = capabilities.prompts || {
      listChanged: true,
    };
  }

  return capabilities;
}
