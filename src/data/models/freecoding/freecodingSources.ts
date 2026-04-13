/*
 * Copied from free-coding-models repository (sources.js)
 * Contains provider definitions and the flat MODELS array.
 * Only the MODELS export is needed for generating ModelEntry objects.
 */

export const MODELS: [string, string, string, string, string, string][] = [
  // The array will be populated by the script below – placeholder for brevity.
];

// NOTE: In a full implementation, you would copy the entire MODELS array from the upstream repo.
// For this integration demo, we include a few representative entries.

MODELS.push(
  [
    "deepseek-ai/deepseek-v3.2",
    "DeepSeek V3.2",
    "S+",
    "73.1%",
    "128k",
    "nvidia",
  ],
  [
    "openrouter/anthropic/claude-sonnet-4.6",
    "Claude Sonnet 4.6",
    "S+",
    "75.0%",
    "200k",
    "rovo",
  ],
  [
    "google/gemini-3.1-pro",
    "Gemini 3.1 Pro",
    "S+",
    "78.0%",
    "1M",
    "gemini",
  ]
);
