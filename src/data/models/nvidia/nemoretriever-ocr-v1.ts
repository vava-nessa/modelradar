import type { ModelEntry } from "@/data/schema";

export const nemoretrieverOcrV1: ModelEntry = {
  model: {
    id: "nemoretriever-ocr-v1",
    name: "NeMo Retriever OCR v1",
    creator: "nvidia",
    family: "nemoretriever",
    category: "small",
    status: "active",
    modality_input: ["image"],
    modality_output: ["text"],
    context_window: 0,
    max_output_tokens: 4096,
    is_open_source: false,
    release_date: "2024-01-01",
    temperature: false,
    knowledge: "2024-01",
    capabilities: {
      streaming: true,
      function_calling: false,
      vision: true,
    },
    description: "NVIDIA's NeMo Retriever OCR model for document understanding.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "nvidia/nemoretriever-ocr-v1",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};