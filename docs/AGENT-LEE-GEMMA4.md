# Agent Lee — Gemma 4 Local Runtime

Agent Lee is the LeeWay Logistics AI assistant.

## Default model

```text
gemma4:e4b
```

This is the default small/edge-oriented Gemma 4 profile for LeeWay Transit World.

Optional workstation profiles can use larger Gemma 4 variants after hardware qualification.

## Local-first architecture

```text
GitHub Pages / local Transit World UI
        ↓
Agent Lee panel
        ↓
local browser connection
        ↓
Ollama on 127.0.0.1:11434
        ↓
gemma4:e4b
```

GitHub Pages does not host the model and does not send prompts to a paid cloud API by default.

## Windows setup

```powershell
ollama pull gemma4:e4b
[Environment]::SetEnvironmentVariable(
  'OLLAMA_ORIGINS',
  'https://4citeb4u.github.io',
  'User'
)
```

Restart Ollama after changing `OLLAMA_ORIGINS`.

The LeeWay Pages origin is:

```text
https://4citeb4u.github.io
```

The default browser endpoint is:

```text
http://127.0.0.1:11435
```

## Governance

Agent Lee must:
- preserve human authority;
- never call a visual OSRM car route truck-safe;
- never convert TRAINING_DEMO data into a live-data claim;
- distinguish verified facts from inference;
- use the current spatial camera context only as context, not proof;
- fail visibly when the local model is unavailable rather than fabricate an answer.

## Public-site behavior

When Ollama is unavailable, the panel states:

```text
LOCAL MODEL: DISCONNECTED
```

No synthetic AI response is substituted.

When a valid local Gemma response is returned, the panel reports the connected model.

## Attribution

Gemma is an open model family from Google DeepMind. Ollama provides the local runtime integration used by LeeWay.

LeeWay's product layer, Agent Lee prompt/governance, logistics context, CRM/Transit Hub integration, UI, and execution policy remain LeeWay product components.