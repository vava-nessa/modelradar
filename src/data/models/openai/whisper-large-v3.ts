import type { ModelEntry } from "@/data/schema";

export const whisper_large_v3: ModelEntry = {
  model: {
    id: "whisper-large-v3",
    name: "Whisper Large V3",
    creator: "openai",
    family: "whisper",
    category: "mid",
    status: "active",
    modality_input: ["audio"],
    modality_output: ["text"],
    context_window: 448,
    max_output_tokens: 448,
    is_open_source: true,
    knowledge: "2023-09",
    release_date: "2023-09-01",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: false,
      function_calling: false,
      system_prompt: false,
      vision: false,
    },
    description:
      "OpenAI's Whisper Large V3 for speech recognition. Open-source ASR model with strong multilingual support.",
    url: "https://platform.openai.com/docs/models/whisper",
    supportedOn: ["api", "local"],
    cost: { input: 0, output: 0 },
  },
  offers: [
    {
      provider_id: "groq",
      provider_model_id: "whisper-large-v3",
      input_per_mtok: 0,
      output_per_mtok: 0,
      status: "ga",
      available_since: "2023-09-01",
    },
  ],
};