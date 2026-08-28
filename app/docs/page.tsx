import type { Metadata } from "next"
import { CopyCommand } from "@/components/copy-command"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsNav, DocsNavMobile, type NavGroup } from "@/components/docs/docs-nav"
import { Endpoint, EndpointRow } from "@/components/docs/endpoint"
import { DataTable, ParamTable, TableShell } from "@/components/docs/param-table"
import { Body, Bullets, C, Callout, GroupDivider, Note, Section, SubHeading } from "@/components/docs/section"

export const metadata: Metadata = {
  title: "Docs | Nylla API Reference",
  description:
    "Documentação da API do Nylla: gateway de LLM compatível com OpenAI. Endpoints, autenticação, streaming, roteamento, cache, tool calling, observabilidade e SDKs.",
}

const navGroups: NavGroup[] = [
  {
    label: "início",
    items: [
      { id: "sobre", label: "sobre o nylla" },
      { id: "quickstart", label: "quickstart" },
      { id: "autenticacao", label: "autenticação" },
      { id: "compatibilidade", label: "compatibilidade" },
    ],
  },
  {
    label: "api reference",
    items: [
      { id: "endpoints", label: "visão geral" },
      { id: "chat-completions", label: "chat completions" },
      { id: "responses", label: "responses" },
      { id: "embeddings", label: "embeddings" },
      { id: "rerank", label: "rerank" },
      { id: "images", label: "images" },
      { id: "audio", label: "audio" },
      { id: "moderations", label: "moderations" },
      { id: "files", label: "files" },
      { id: "batches", label: "batches" },
      { id: "models", label: "models" },
      { id: "usage", label: "usage" },
      { id: "keys", label: "api keys" },
      { id: "health", label: "health" },
    ],
  },
  {
    label: "conceitos",
    items: [
      { id: "streaming", label: "streaming" },
      { id: "roteamento", label: "roteamento" },
      { id: "fallbacks", label: "fallback e balanceamento" },
      { id: "cache", label: "cache" },
      { id: "reasoning", label: "reasoning" },
      { id: "multimodal", label: "multimodal" },
      { id: "tool-calling", label: "tool calling" },
      { id: "structured-outputs", label: "structured outputs" },
      { id: "byok", label: "byok" },
    ],
  },
  {
    label: "operação",
    items: [
      { id: "erros", label: "erros" },
      { id: "retries", label: "retries e idempotência" },
      { id: "rate-limits", label: "rate limits" },
      { id: "paginacao", label: "paginação" },
      { id: "webhooks", label: "webhooks" },
      { id: "observabilidade", label: "observabilidade" },
      { id: "privacidade", label: "privacidade" },
      { id: "versionamento", label: "versionamento" },
    ],
  },
  {
    label: "integração",
    items: [
      { id: "sdks", label: "sdks" },
      { id: "harnesses", label: "harnesses" },
      { id: "configuracao", label: "configuração" },
      { id: "recursos", label: "recursos" },
    ],
  },
]

const META_LINKS = [
  { label: "openapi 3.1", href: "/openapi.json" },
  { label: "llms.txt", href: "/llms.txt" },
  { label: "status", href: "https://status.nylla.ai" },
  { label: "changelog", href: "/changelog" },
]

export default function DocsPage() {
  return (
    <main>
      <section className="pb-10 pt-6 md:pb-14 md:pt-8" aria-labelledby="docs-title">
        <div
          className="photo-grain mx-auto flex h-52 w-[calc(100%-2rem)] max-w-[1464px] items-center justify-center overflow-hidden rounded-xl bg-cover bg-center px-6 text-center text-canvas-ink sm:h-60 md:h-72 md:w-[calc(100%-4.5rem)]"
          style={{ backgroundImage: "url('/images/docs-hero.png')" }}
        >
          <h1 id="docs-title" className="type-title text-balance md:text-5xl">
            Documentação
          </h1>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-screen-2xl gap-14 px-4 pb-20 md:px-9">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="docs-scrollbar sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-10 pr-3">
            <DocsNav groups={navGroups} />
          </div>
        </aside>

        <div className="min-w-0 flex-1 space-y-16 lg:max-w-3xl xl:max-w-4xl">
          {/* 01 · INÍCIO */}
          <Section
            id="sobre"
            title="API do Nylla"
          lead="O Nylla é um gateway de LLM: uma única API, compatível com o padrão OpenAI, na frente de todos os provedores e modelos. Você troca a base URL, mantém seu código, e ganha roteamento inteligente, fallback automático, cache, observabilidade e controle de custo."
        >
          <div className="type-label mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-muted-foreground">
            <span className="text-foreground">v1</span>
            {META_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="transition-colors hover:text-foreground">
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>

          <div className="mt-10 grid gap-px border border-border/60 bg-border/60 sm:grid-cols-3">
            {[
              ["1 API", "Um contrato OpenAI-compatible para todos os provedores. Zero lock-in."],
              ["40+ modelos", "OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek, xAI e open-source."],
              ["99.9% uptime", "Fallback entre provedores em milissegundos quando um deles falha."],
            ].map(([stat, desc]) => (
              <div key={stat} className="bg-background p-5">
                <div className="type-subheading text-foreground">{stat}</div>
                <p className="type-caption mt-2 text-pretty text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <SubHeading>Base URL</SubHeading>
          <Body>
            Todos os endpoints são servidos sob a mesma base. Se seu código já fala com a API da OpenAI, aponte
            para cá e nada mais muda:
          </Body>
          <div className="mt-4">
            <CodeBlock title="base url" lang="text" code="https://api.nylla.ai/v1" />
          </div>

          <div className="mt-8 lg:hidden">
            <DocsNavMobile groups={navGroups} />
          </div>
        </Section>

        <Section
          id="quickstart"
          eyebrow="quickstart"
          title="Primeira requisição em um minuto"
          lead="Duas formas de começar: pelo CLI, que detecta e configura seu harness automaticamente, ou direto pela API com sua chave."
        >
          <SubHeading>1. Via CLI (recomendado)</SubHeading>
          <div className="mt-4">
            <CopyCommand command="npx nylla connect" />
          </div>

          <SubHeading>2. Via API</SubHeading>
          <Body>Crie uma chave no dashboard e chame o gateway com o SDK que você já usa:</Body>
          <div className="mt-4">
            <CodeBlock
              tabs={[
                {
                  label: "curl",
                  lang: "bash",
                  code: `curl https://api.nylla.ai/v1/chat/completions \\
  -H "Authorization: Bearer $NYLLA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "anthropic/claude-sonnet-4.5",
    "messages": [
      { "role": "user", "content": "Explique o que é um gateway de LLM." }
    ]
  }'`,
                },
                {
                  label: "typescript",
                  lang: "ts",
                  code: `import OpenAI from "openai"

const client = new OpenAI({
  baseURL: "https://api.nylla.ai/v1",
  apiKey: process.env.NYLLA_API_KEY,
})

const completion = await client.chat.completions.create({
  model: "anthropic/claude-sonnet-4.5",
  messages: [
    { role: "user", content: "Explique o que é um gateway de LLM." },
  ],
})

console.log(completion.choices[0].message.content)`,
                },
                {
                  label: "python",
                  lang: "python",
                  code: `import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.nylla.ai/v1",
    api_key=os.environ["NYLLA_API_KEY"],
)

completion = client.chat.completions.create(
    model="anthropic/claude-sonnet-4.5",
    messages=[
        {"role": "user", "content": "Explique o que é um gateway de LLM."}
    ],
)

print(completion.choices[0].message.content)`,
                },
              ]}
            />
          </div>
        </Section>

        <Section
          id="autenticacao"
          eyebrow="autenticação"
          title="Autenticação"
          lead={
            <>
              Toda requisição precisa do header <C>Authorization</C> com uma Bearer key. Chaves são criadas e
              revogadas no dashboard ou via API, e têm o prefixo <C>nyl-</C>.
            </>
          }
        >
          <div className="mt-6">
            <CodeBlock title="header" lang="text" code="Authorization: Bearer nyl-xxxxxxxxxxxxxxxxxxxxxxxx" />
          </div>

          <SubHeading>Escopos</SubHeading>
          <Body>Cada chave carrega escopos que limitam quais endpoints ela alcança:</Body>
          <div className="mt-4">
            <DataTable
              caption="Escopos de chave"
              head={["escopo", "permite"]}
              mono={[0]}
              minWidth={440}
              rows={[
                ["chat", "/v1/chat/completions, /v1/responses, /v1/completions"],
                ["embeddings", "/v1/embeddings, /v1/rerank"],
                ["media", "/v1/images, /v1/audio"],
                ["batch", "/v1/files, /v1/batches"],
                ["read", "/v1/models, /v1/usage, /v1/health"],
                ["admin", "tudo acima, incluindo /v1/keys e webhooks"],
              ]}
            />
          </div>

          <SubHeading>Boas práticas</SubHeading>
          <Bullets
            items={[
              "Nunca exponha a chave no client. Chame a API sempre do servidor.",
              "Use uma chave por ambiente (dev, staging, produção) e por serviço.",
              "Conceda o menor escopo suficiente; reserve admin para automações de infraestrutura.",
              "Defina limite de gasto por chave para conter incidentes.",
              "Rotacione chaves periodicamente; a revogação tem efeito imediato.",
            ]}
          />
        </Section>

        <Section
          id="compatibilidade"
          eyebrow="compatibilidade"
          title="Compatibilidade OpenAI"
          lead="O contrato é o mesmo da OpenAI, campo por campo. O que o provedor de destino não suporta nativamente, o gateway emula ou normaliza, de modo que você nunca escreve código específico de provedor."
        >
          <div className="mt-6">
            <DataTable
              caption="Matriz de compatibilidade"
              head={["recurso", "suporte", "observação"]}
              minWidth={600}
              rows={[
                ["Chat completions", "nativo", "Contrato idêntico, incluindo streaming SSE"],
                ["Responses API", "nativo", "Formato de itens e eventos tipados"],
                ["Tool / function calling", "normalizado", "Mesma definição em Claude, GPT, Gemini e Llama"],
                ["Structured outputs", "normalizado", "JSON Schema validado no gateway"],
                ["Vision / multimodal", "nativo", "image_url e input de base64"],
                ["Reasoning tokens", "nativo", "reasoning_effort unificado entre provedores"],
                ["Embeddings", "nativo", "Inclui batch e dimensions"],
                ["Prompt caching", "nativo", "Explícito e semântico"],
                ["Logprobs", "parcial", "Somente em provedores que expõem o campo"],
                ["Fine-tuning", "não", "Use o provedor diretamente e traga o modelo via BYOK"],
              ]}
            />
          </div>
          <Callout>
            A única diferença visível é o formato do <C>model</C>: sempre <C>provider/model</C>, para que a
            mesma chave alcance qualquer provedor sem ambiguidade.
          </Callout>
        </Section>

        {/* ────────────────────── 02 · API REFERENCE ────────────────────── */}
        <GroupDivider index="02" label="api reference" />

        <Section
          id="endpoints"
          eyebrow="visão geral"
          title="Todos os endpoints"
          lead="A superfície da API segue o padrão OpenAI-compatible. Qualquer SDK, framework ou harness que fale esse contrato funciona sem adaptação."
        >
          <div className="docs-scrollbar mt-6 overflow-x-auto border border-border/60">
            <table className="w-full min-w-[660px]">
              <caption className="sr-only">Lista de todos os endpoints da API</caption>
              <thead>
                <tr className="type-micro border-b border-border/60 bg-secondary text-left text-subtle-foreground">
                  <th scope="col" className="px-4 py-2.5 font-medium">
                    método
                  </th>
                  <th scope="col" className="px-4 py-2.5 font-medium">
                    endpoint
                  </th>
                  <th scope="col" className="px-4 py-2.5 font-medium">
                    descrição
                  </th>
                </tr>
              </thead>
              <tbody>
                <EndpointRow method="POST" path="/v1/chat/completions" desc="Gera respostas de chat, com streaming" />
                <EndpointRow method="POST" path="/v1/responses" desc="API de respostas com estado e itens tipados" />
                <EndpointRow method="POST" path="/v1/completions" desc="Completions de texto (legado)" />
                <EndpointRow method="POST" path="/v1/embeddings" desc="Gera vetores de embedding" />
                <EndpointRow method="POST" path="/v1/rerank" desc="Reordena documentos por relevância" />
                <EndpointRow method="POST" path="/v1/images/generations" desc="Gera imagens a partir de prompt" />
                <EndpointRow method="POST" path="/v1/audio/transcriptions" desc="Transcreve áudio para texto" />
                <EndpointRow method="POST" path="/v1/audio/speech" desc="Sintetiza fala a partir de texto" />
                <EndpointRow method="POST" path="/v1/moderations" desc="Classifica conteúdo sensível" />
                <EndpointRow method="POST" path="/v1/files" desc="Envia arquivos para batch e RAG" />
                <EndpointRow method="GET" path="/v1/files" desc="Lista arquivos enviados" />
                <EndpointRow method="POST" path="/v1/batches" desc="Cria um job em lote assíncrono" />
                <EndpointRow method="GET" path="/v1/batches/{id}" desc="Consulta o status de um lote" />
                <EndpointRow method="GET" path="/v1/models" desc="Lista modelos disponíveis" />
                <EndpointRow method="GET" path="/v1/models/{id}" desc="Detalhes de um modelo" />
                <EndpointRow method="GET" path="/v1/usage" desc="Consumo de créditos e tokens" />
                <EndpointRow method="GET" path="/v1/keys" desc="Lista chaves de API" />
                <EndpointRow method="POST" path="/v1/keys" desc="Cria uma chave de API" />
                <EndpointRow method="DELETE" path="/v1/keys/{id}" desc="Revoga uma chave de API" />
                <EndpointRow method="GET" path="/v1/health" desc="Estado do gateway e dos provedores" />
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          id="chat-completions"
          eyebrow="chat completions"
          title="Chat completions"
          lead={
            <>
              O endpoint principal do gateway. Aceita o mesmo corpo do endpoint da OpenAI, com extensões
              opcionais de roteamento sob o campo <C>route</C>.
            </>
          }
        >
          <div className="mt-6">
            <Endpoint method="POST" path="/v1/chat/completions" note="stream · tools · vision" />
          </div>

          <SubHeading>Parâmetros do corpo</SubHeading>
          <div className="mt-4">
            <ParamTable
              caption="Parâmetros do corpo de chat completions"
              params={[
                {
                  name: "model",
                  type: "string",
                  required: true,
                  desc: 'ID no formato provider/model, ex.: "anthropic/claude-sonnet-4.5". Aceita "nylla/auto" para roteamento automático.',
                },
                {
                  name: "messages",
                  type: "array",
                  required: true,
                  desc: "Histórico da conversa: objetos com role (system, user, assistant, tool) e content.",
                },
                { name: "stream", type: "boolean", default: "false", desc: "Responde via Server-Sent Events, token a token." },
                { name: "temperature", type: "number", default: "1", desc: "Aleatoriedade da amostragem, de 0 a 2." },
                { name: "max_tokens", type: "integer", desc: "Limite de tokens gerados na resposta." },
                { name: "top_p", type: "number", default: "1", desc: "Amostragem por núcleo. Alternativa a temperature." },
                { name: "stop", type: "string | array", desc: "Até 4 sequências que interrompem a geração." },
                { name: "tools", type: "array", desc: "Ferramentas que o modelo pode invocar. Ver tool calling." },
                {
                  name: "tool_choice",
                  type: "string | object",
                  default: '"auto"',
                  desc: '"auto", "none", "required" ou uma função específica.',
                },
                {
                  name: "response_format",
                  type: "object",
                  desc: 'Formato da saída: { "type": "json_schema", ... } para structured outputs.',
                },
                { name: "reasoning_effort", type: "string", desc: '"minimal", "low", "medium" ou "high" em modelos de raciocínio.' },
                { name: "frequency_penalty", type: "number", default: "0", desc: "Penaliza repetição de tokens, de -2 a 2." },
                { name: "presence_penalty", type: "number", default: "0", desc: "Penaliza tokens já presentes, de -2 a 2." },
                { name: "logprobs", type: "boolean", default: "false", desc: "Retorna probabilidades por token, quando o provedor expõe." },
                { name: "seed", type: "integer", desc: "Best-effort para saídas determinísticas." },
                { name: "user", type: "string", desc: "ID do usuário final, para rastreio de abuso e analytics." },
                { name: "metadata", type: "object", desc: "Até 16 pares chave-valor propagados para logs e webhooks." },
                { name: "route", type: "object", desc: "Extensão Nylla: estratégia, fallbacks, cache e teto de custo." },
              ]}
            />
          </div>

          <SubHeading>Resposta</SubHeading>
          <div className="mt-4">
            <CodeBlock
              title="200 OK"
              lang="json"
              code={`{
  "id": "chatcmpl-9f2a1b3c",
  "object": "chat.completion",
  "created": 1767225600,
  "model": "anthropic/claude-sonnet-4.5",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Um gateway de LLM é uma camada única de API..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 18,
    "completion_tokens": 142,
    "total_tokens": 160,
    "cached_tokens": 0,
    "reasoning_tokens": 0
  },
  "nylla": {
    "provider": "anthropic",
    "routed_by": "quality",
    "latency_ms": 412,
    "cached": false,
    "attempts": 1,
    "cost_credits": 0.0031,
    "request_id": "req_8k2m4x"
  }
}`}
            />
          </div>
          <Note>
            O objeto <C>nylla</C> é uma extensão de metadados do gateway: provedor usado, motivo da rota,
            latência, cache hit, tentativas e custo. SDKs padrão o ignoram sem erro.
          </Note>
        </Section>

        <Section
          id="responses"
          eyebrow="responses"
          title="Responses"
          lead="A API de respostas com estado: um único objeto acumula entradas, saídas de ferramenta e raciocínio ao longo dos turnos, sem você remontar o array de mensagens a cada chamada."
        >
          <div className="mt-6">
            <Endpoint method="POST" path="/v1/responses" note="stateful · eventos tipados" />
          </div>
          <div className="mt-4">
            <CodeBlock
              tabs={[
                {
                  label: "request",
                  lang: "json",
                  code: `{
  "model": "nylla/auto",
  "input": "Resuma este relatório em 3 pontos.",
  "instructions": "Responda sempre em português.",
  "store": true,
  "previous_response_id": "resp_7a1c",
  "tools": [{ "type": "web_search" }]
}`,
                },
                {
                  label: "response",
                  lang: "json",
                  code: `{
  "id": "resp_9b2d",
  "object": "response",
  "status": "completed",
  "model": "openai/gpt-5.1",
  "output": [
    {
      "type": "message",
      "role": "assistant",
      "content": [{ "type": "output_text", "text": "1. ..." }]
    }
  ],
  "usage": { "input_tokens": 512, "output_tokens": 96, "total_tokens": 608 }
}`,
                },
              ]}
            />
          </div>
          <Note>
            Com <C>store: true</C> o gateway persiste o encadeamento e você referencia turnos anteriores por{" "}
            <C>previous_response_id</C>. Com <C>store: false</C> nada é retido.
          </Note>
        </Section>

        <Section
          id="embeddings"
          eyebrow="embeddings"
          title="Embeddings"
          lead="Gera vetores para busca semântica, RAG e clustering. Aceita string única ou batch de até 2048 entradas por requisição."
        >
          <div className="mt-6">
            <Endpoint method="POST" path="/v1/embeddings" note="batch até 2048" />
          </div>
          <div className="mt-4">
            <ParamTable
              caption="Parâmetros do corpo de embeddings"
              params={[
                { name: "model", type: "string", required: true, desc: 'Ex.: "openai/text-embedding-3-large".' },
                { name: "input", type: "string | array", required: true, desc: "Texto ou lista de textos a vetorizar." },
                { name: "dimensions", type: "integer", desc: "Reduz a dimensionalidade do vetor, quando o modelo suporta." },
                { name: "encoding_format", type: "string", default: '"float"', desc: '"float" ou "base64".' },
              ]}
            />
          </div>
          <div className="mt-6">
            <CodeBlock
              title="200 OK"
              lang="json"
              code={`{
  "object": "list",
  "model": "openai/text-embedding-3-large",
  "data": [
    { "object": "embedding", "index": 0, "embedding": [0.0132, -0.0247] }
  ],
  "usage": { "prompt_tokens": 8, "total_tokens": 8 }
}`}
            />
          </div>
        </Section>

        <Section
          id="rerank"
          eyebrow="rerank"
          title="Rerank"
          lead="Reordena um conjunto de documentos por relev��ncia em relação a uma query. É o segundo estágio de um RAG: recupere amplo por embedding, depois refine aqui."
        >
          <div className="mt-6">
            <Endpoint method="POST" path="/v1/rerank" />
          </div>
          <div className="mt-4">
            <CodeBlock
              title="request body"
              lang="json"
              code={`{
  "model": "cohere/rerank-3.5",
  "query": "como configurar fallback entre provedores",
  "documents": [
    "O campo route.fallbacks aceita uma lista ordenada...",
    "Embeddings convertem texto em vetores...",
    "O cache semântico responde em 30ms..."
  ],
  "top_n": 2
}`}
            />
          </div>
          <div className="mt-4">
            <CodeBlock
              title="200 OK"
              lang="json"
              code={`{
  "object": "list",
  "results": [
    { "index": 0, "relevance_score": 0.982 },
    { "index": 2, "relevance_score": 0.311 }
  ]
}`}
            />
          </div>
        </Section>

        <Section
          id="images"
          eyebrow="images"
          title="Images"
          lead="Geração e edição de imagens sob o mesmo contrato, com roteamento entre provedores de imagem."
        >
          <div className="mt-6 space-y-3">
            <Endpoint method="POST" path="/v1/images/generations" />
            <Endpoint method="POST" path="/v1/images/edits" />
          </div>
          <div className="mt-4">
            <CodeBlock
              title="request body"
              lang="json"
              code={`{
  "model": "openai/gpt-image-1",
  "prompt": "Um diagrama isométrico de um gateway de API, traço fino",
  "size": "1024x1024",
  "quality": "high",
  "n": 1,
  "response_format": "url"
}`}
            />
          </div>
        </Section>

        <Section
          id="audio"
          eyebrow="audio"
          title="Audio"
          lead="Transcrição (speech-to-text) e síntese (text-to-speech) com os mesmos parâmetros da OpenAI, aceitando multipart/form-data."
        >
          <div className="mt-6 space-y-3">
            <Endpoint method="POST" path="/v1/audio/transcriptions" note="multipart" />
            <Endpoint method="POST" path="/v1/audio/translations" note="multipart" />
            <Endpoint method="POST" path="/v1/audio/speech" />
          </div>
          <div className="mt-4">
            <CodeBlock
              tabs={[
                {
                  label: "transcrição",
                  lang: "bash",
                  code: `curl https://api.nylla.ai/v1/audio/transcriptions \\
  -H "Authorization: Bearer $NYLLA_API_KEY" \\
  -F file="@reuniao.mp3" \\
  -F model="openai/whisper-large-v3" \\
  -F response_format="verbose_json"`,
                },
                {
                  label: "síntese",
                  lang: "bash",
                  code: `curl https://api.nylla.ai/v1/audio/speech \\
  -H "Authorization: Bearer $NYLLA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "openai/tts-1-hd",
    "voice": "alloy",
    "input": "O gateway está operacional."
  }' --output fala.mp3`,
                },
              ]}
            />
          </div>
        </Section>

        <Section
          id="moderations"
          eyebrow="moderations"
          title="Moderations"
          lead="Classifica texto e imagem em categorias de risco antes de você enviar ao modelo ou publicar a saída. Use como guardrail de entrada e de saída."
        >
          <div className="mt-6">
            <Endpoint method="POST" path="/v1/moderations" />
          </div>
          <div className="mt-4">
            <CodeBlock
              title="200 OK"
              lang="json"
              code={`{
  "id": "modr-3f1a",
  "model": "openai/omni-moderation-latest",
  "results": [
    {
      "flagged": false,
      "categories": { "violence": false, "self_harm": false, "hate": false },
      "category_scores": { "violence": 0.0004, "self_harm": 0.0001, "hate": 0.0002 }
    }
  ]
}`}
            />
          </div>
          <Callout>
            Para aplicar moderação automaticamente em toda requisição, ative <C>guardrails</C> nas
            configurações do projeto. O gateway passa a rejeitar com <C>400 content_policy_violation</C>{" "}
            antes de gastar tokens.
          </Callout>
        </Section>

        <Section
          id="files"
          eyebrow="files"
          title="Files"
          lead="Armazena arquivos usados por jobs em lote e por pipelines de RAG. Limite de 512 MB por arquivo."
        >
          <div className="mt-6 space-y-3">
            <Endpoint method="POST" path="/v1/files" note="multipart" />
            <Endpoint method="GET" path="/v1/files" />
            <Endpoint method="GET" path="/v1/files/{id}/content" />
            <Endpoint method="DELETE" path="/v1/files/{id}" />
          </div>
          <div className="mt-4">
            <CodeBlock
              title="201 Created"
              lang="json"
              code={`{
  "id": "file_2k9x",
  "object": "file",
  "bytes": 184320,
  "filename": "lote.jsonl",
  "purpose": "batch",
  "created_at": 1767225600
}`}
            />
          </div>
        </Section>

        <Section
          id="batches"
          eyebrow="batches"
          title="Batches"
          lead="Processamento assíncrono de grandes volumes com desconto de 50% sobre o preço por token. Envie um JSONL de requisições e colete o resultado quando o job concluir."
        >
          <div className="mt-6 space-y-3">
            <Endpoint method="POST" path="/v1/batches" />
            <Endpoint method="GET" path="/v1/batches/{id}" />
            <Endpoint method="POST" path="/v1/batches/{id}/cancel" />
          </div>
          <div className="mt-4">
            <CodeBlock
              tabs={[
                {
                  label: "request",
                  lang: "json",
                  code: `{
  "input_file_id": "file_2k9x",
  "endpoint": "/v1/chat/completions",
  "completion_window": "24h"
}`,
                },
                {
                  label: "status",
                  lang: "json",
                  code: `{
  "id": "batch_5m1p",
  "object": "batch",
  "status": "in_progress",
  "request_counts": { "total": 12000, "completed": 8420, "failed": 3 },
  "output_file_id": null,
  "expires_at": 1767312000
}`,
                },
              ]}
            />
          </div>
          <Note>
            Estados possíveis: <C>validating</C>, <C>in_progress</C>, <C>finalizing</C>, <C>completed</C>,{" "}
            <C>failed</C>, <C>expired</C> e <C>cancelled</C>.
          </Note>
        </Section>

        <Section
          id="models"
          eyebrow="models"
          title="Models"
          lead={
            <>
              Lista o catálogo disponível no seu plano, com preço, contexto e capacidades de cada modelo. IDs
              seguem sempre o formato <C>provider/model</C>.
            </>
          }
        >
          <div className="mt-6 space-y-3">
            <Endpoint method="GET" path="/v1/models" />
            <Endpoint method="GET" path="/v1/models/{id}" />
          </div>
          <div className="mt-4">
            <CodeBlock
              title="200 OK · /v1/models"
              lang="json"
              code={`{
  "object": "list",
  "data": [
    {
      "id": "anthropic/claude-sonnet-4.5",
      "object": "model",
      "context_length": 200000,
      "max_output_tokens": 64000,
      "capabilities": ["chat", "tools", "vision", "json_schema", "caching"],
      "pricing": { "input": 3.0, "output": 15.0, "unit": "usd_per_1m_tokens" },
      "tier": "frontier"
    },
    {
      "id": "deepseek/deepseek-v3.2",
      "object": "model",
      "context_length": 128000,
      "max_output_tokens": 32000,
      "capabilities": ["chat", "tools", "json_schema"],
      "pricing": { "input": 0.27, "output": 1.10, "unit": "usd_per_1m_tokens" },
      "tier": "included"
    }
  ]
}`}
            />
          </div>
          <Note>
            <C>tier: included</C> não consome créditos de usage; <C>tier: frontier</C> consome do orçamento
            frontier do plano. Filtre por capacidade com <C>?capability=vision</C>.
          </Note>
        </Section>

        <Section
          id="usage"
          eyebrow="usage"
          title="Usage"
          lead="Consulta o consumo agregado de tokens e créditos por período, chave e modelo, na mesma fonte de dados que alimenta o dashboard."
        >
          <div className="mt-6">
            <Endpoint method="GET" path="/v1/usage" />
          </div>
          <div className="mt-4">
            <ParamTable
              caption="Query params de usage"
              params={[
                { name: "start", type: "string (date)", required: true, desc: "Início do período, ISO 8601." },
                { name: "end", type: "string (date)", default: "hoje", desc: "Fim do período." },
                { name: "group_by", type: "string", default: '"day"', desc: '"day", "model", "key" ou "provider".' },
                { name: "key_id", type: "string", desc: "Restringe o resultado a uma chave específica." },
              ]}
            />
          </div>
          <div className="mt-6">
            <CodeBlock
              title="200 OK"
              lang="json"
              code={`{
  "object": "list",
  "period": { "start": "2026-08-01", "end": "2026-08-27" },
  "data": [
    {
      "group": "anthropic/claude-sonnet-4.5",
      "requests": 18402,
      "input_tokens": 7412000,
      "output_tokens": 1980400,
      "cached_tokens": 2104000,
      "cost_usd": 51.72
    }
  ],
  "totals": { "requests": 42918, "cost_usd": 88.14 }
}`}
            />
          </div>
        </Section>

        <Section
          id="keys"
          eyebrow="api keys"
          title="API keys"
          lead={
            <>
              Gerencie chaves programaticamente. Requer uma chave com escopo <C>admin</C>. O valor completo só
              é retornado uma vez, na criação.
            </>
          }
        >
          <div className="mt-6 space-y-3">
            <Endpoint method="GET" path="/v1/keys" />
            <Endpoint method="POST" path="/v1/keys" />
            <Endpoint method="PATCH" path="/v1/keys/{id}" />
            <Endpoint method="DELETE" path="/v1/keys/{id}" />
          </div>
          <div className="mt-4">
            <CodeBlock
              tabs={[
                {
                  label: "request",
                  lang: "json",
                  code: `{
  "name": "producao-backend",
  "scopes": ["chat", "embeddings"],
  "monthly_limit_usd": 200,
  "allowed_models": ["anthropic/*", "openai/gpt-5-mini"]
}`,
                },
                {
                  label: "201 created",
                  lang: "json",
                  code: `{
  "id": "key_7d3f9a",
  "name": "producao-backend",
  "key": "nyl-xxxxxxxxxxxxxxxxxxxxxxxx",
  "scopes": ["chat", "embeddings"],
  "monthly_limit_usd": 200,
  "created_at": "2026-08-27T12:00:00Z"
}`,
                },
              ]}
            />
          </div>
        </Section>

        <Section
          id="health"
          eyebrow="health"
          title="Health"
          lead="Estado do gateway e de cada provedor upstream. Não exige autenticação e não conta para rate limit, então pode ser usado em health checks e dashboards."
        >
          <div className="mt-6">
            <Endpoint method="GET" path="/v1/health" note="público" />
          </div>
          <div className="mt-4">
            <CodeBlock
              title="200 OK"
              lang="json"
              code={`{
  "status": "operational",
  "region": "gru1",
  "providers": [
    { "name": "anthropic", "status": "operational", "p50_ms": 380 },
    { "name": "openai", "status": "degraded", "p50_ms": 1420 },
    { "name": "google", "status": "operational", "p50_ms": 290 }
  ]
}`}
            />
          </div>
          <Note>
            Quando um provedor entra em <C>degraded</C>, o roteador reduz automaticamente o peso dele no
            balanceamento antes de qualquer erro chegar ao seu código.
          </Note>
        </Section>

        {/* ─────────────────────── 03 · CONCEITOS ─────────────────────── */}
        <GroupDivider index="03" label="conceitos" />

        <Section
          id="streaming"
          eyebrow="streaming"
          title="Streaming"
          lead={
            <>
              Com <C>stream: true</C>, a resposta chega via Server-Sent Events, um chunk por token, no mesmo
              formato de delta da OpenAI. O stream termina com <C>data: [DONE]</C>.
            </>
          }
        >
          <div className="mt-6">
            <CodeBlock
              tabs={[
                {
                  label: "sse",
                  lang: "json",
                  code: `data: {"id":"chatcmpl-9f2a","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"role":"assistant","content":""}}]}

data: {"id":"chatcmpl-9f2a","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"Um"}}]}

data: {"id":"chatcmpl-9f2a","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":" gateway"}}]}

data: {"id":"chatcmpl-9f2a","object":"chat.completion.chunk","choices":[{"index":0,"delta":{},"finish_reason":"stop"}],"usage":{"prompt_tokens":18,"completion_tokens":142,"total_tokens":160}}

data: [DONE]`,
                },
                {
                  label: "typescript",
                  lang: "ts",
                  code: `const stream = await client.chat.completions.create({
  model: "nylla/auto",
  messages: [{ role: "user", content: "Olá" }],
  stream: true,
  stream_options: { include_usage: true },
})

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? "")
}`,
                },
              ]}
            />
          </div>
          <Note>
            Se um provedor cair no meio do stream, o gateway reconecta em outro provedor de forma
            transparente. O cliente continua recebendo o mesmo stream SSE, sem duplicar tokens já emitidos.
          </Note>
        </Section>

        <Section
          id="roteamento"
          eyebrow="roteamento"
          title="Roteamento"
          lead={
            <>
              O núcleo do gateway. Use <C>model: nylla/auto</C> para deixar o roteador escolher o melhor modelo
              por tarefa, ou controle explicitamente com o campo <C>route</C>.
            </>
          }
        >
          <div className="mt-6">
            <CodeBlock
              title="request body"
              lang="json"
              code={`{
  "model": "nylla/auto",
  "messages": [],
  "route": {
    "strategy": "latency",
    "fallbacks": [
      "anthropic/claude-sonnet-4.5",
      "openai/gpt-5-mini",
      "deepseek/deepseek-v3.2"
    ],
    "require": ["tools", "json_schema"],
    "max_cost_usd": 0.05,
    "providers": { "allow": ["anthropic", "openai"], "deny": [] },
    "cache": { "enabled": true, "ttl_seconds": 3600 }
  }
}`}
            />
          </div>
          <div className="mt-6">
            <ParamTable
              caption="Campos do objeto route"
              params={[
                {
                  name: "strategy",
                  type: "string",
                  default: '"quality"',
                  desc: '"latency" (mais rápido), "cost" (mais barato) ou "quality" (melhor benchmark para a tarefa).',
                },
                { name: "fallbacks", type: "array", desc: "Modelos tentados em ordem se o primário falhar ou exceder o timeout." },
                { name: "require", type: "array", desc: 'Capacidades obrigatórias, ex.: ["tools", "vision"]. Filtra os candidatos.' },
                { name: "max_cost_usd", type: "number", desc: "Teto de custo da requisição; acima disso o roteador troca para um modelo mais barato." },
                { name: "providers", type: "object", desc: "Listas allow e deny por provedor, para atender requisitos de residência de dados." },
                { name: "cache", type: "object", desc: "Cache de respostas. Hits retornam em ~30ms e não consomem créditos." },
                { name: "timeout_ms", type: "integer", default: "30000", desc: "Prazo por tentativa antes de acionar o próximo fallback." },
              ]}
            />
          </div>
        </Section>

        <Section
          id="fallbacks"
          eyebrow="fallback e balanceamento"
          title="Fallback e balanceamento"
          lead="Cada modelo pode ser servido por mais de um provedor. O gateway distribui carga entre eles por latência observada e desvia de instâncias degradadas antes que o erro chegue ao seu código."
        >
          <Bullets
            items={[
              <>
                <span className="text-foreground">Retry no mesmo provedor</span> para falhas transitórias (429 e
                5xx), com backoff exponencial e jitter.
              </>,
              <>
                <span className="text-foreground">Troca de provedor</span> quando o modelo existe em mais de um
                upstream, devolvendo a mesma resposta e cobrando pelo que foi efetivamente usado.
              </>,
              <>
                <span className="text-foreground">Troca de modelo</span> seguindo <C>route.fallbacks</C> quando
                nenhum provedor do modelo primário responde.
              </>,
              <>
                <span className="text-foreground">Circuit breaker</span> por provedor: após falhas
                consecutivas, o peso cai a zero e volta gradualmente.
              </>,
            ]}
          />
          <div className="mt-6">
            <CodeBlock
              title="cabeçalhos de diagnóstico"
              lang="text"
              code={`x-nylla-request-id: req_8k2m4x
x-nylla-provider: anthropic
x-nylla-model: anthropic/claude-sonnet-4.5
x-nylla-attempts: 2
x-nylla-fallback-from: openai/gpt-5.1
x-nylla-cache: miss
x-nylla-latency-ms: 412`}
            />
          </div>
        </Section>

        <Section
          id="cache"
          eyebrow="cache"
          title="Cache"
          lead="Dois mecanismos independentes e combináveis: cache de prompt, que desconta tokens de contexto repetido, e cache de resposta, que devolve a saída inteira sem chamar o modelo."
        >
          <SubHeading>Prompt caching</SubHeading>
          <Body>
            Marque os blocos estáveis do contexto, como instruções longas, documentos e definições de tools. O
            gateway reaproveita o prefixo entre requisições e cobra a fração de leitura de cache.
          </Body>
          <div className="mt-4">
            <CodeBlock
              title="request body"
              lang="json"
              code={`{
  "model": "anthropic/claude-sonnet-4.5",
  "messages": [
    {
      "role": "system",
      "content": "Manual de 40 mil tokens...",
      "cache_control": { "type": "ephemeral" }
    },
    { "role": "user", "content": "Qual a política de reembolso?" }
  ]
}`}
            />
          </div>
          <Note>
            Tokens lidos do cache aparecem em <C>usage.cached_tokens</C> e custam a partir de 10% do preço de
            entrada, conforme o provedor.
          </Note>

          <SubHeading>Cache de resposta</SubHeading>
          <Body>
            Ativado por <C>route.cache</C>. Em modo <C>exact</C> a chave é o hash do corpo; em{" "}
            <C>semantic</C>, prompts equivalentes acima do limiar de similaridade também acertam o cache.
          </Body>
          <div className="mt-4">
            <ParamTable
              caption="Campos do objeto route.cache"
              params={[
                { name: "enabled", type: "boolean", default: "false", desc: "Liga o cache de resposta." },
                { name: "mode", type: "string", default: '"exact"', desc: '"exact" ou "semantic".' },
                { name: "ttl_seconds", type: "integer", default: "3600", desc: "Validade da entrada, até 30 dias." },
                { name: "similarity", type: "number", default: "0.95", desc: "Limiar de similaridade no modo semantic." },
                { name: "namespace", type: "string", desc: "Isola o cache por tenant, projeto ou usuário." },
              ]}
            />
          </div>
        </Section>

        <Section
          id="reasoning"
          eyebrow="reasoning"
          title="Reasoning"
          lead={
            <>
              Modelos de raciocínio gastam tokens internos antes de responder. O gateway unifica o controle em{" "}
              <C>reasoning_effort</C> e reporta o consumo separadamente.
            </>
          }
        >
          <div className="mt-6">
            <CodeBlock
              tabs={[
                {
                  label: "request",
                  lang: "json",
                  code: `{
  "model": "openai/gpt-5.1",
  "messages": [{ "role": "user", "content": "Prove que raiz de 2 é irracional." }],
  "reasoning_effort": "high",
  "reasoning": { "summary": "auto" }
}`,
                },
                {
                  label: "usage",
                  lang: "json",
                  code: `{
  "usage": {
    "prompt_tokens": 24,
    "completion_tokens": 512,
    "reasoning_tokens": 3840,
    "total_tokens": 4376
  }
}`,
                },
              ]}
            />
          </div>
          <Callout>
            Tokens de raciocínio são cobrados como saída. Em modelos sem raciocínio nativo o campo é ignorado,
            então a mesma requisição continua válida ao trocar de modelo.
          </Callout>
        </Section>

        <Section
          id="multimodal"
          eyebrow="multimodal"
          title="Multimodal"
          lead="Imagens, PDFs e áudio entram no mesmo array de mensagens, por URL ou base64. O gateway converte para o formato nativo de cada provedor."
        >
          <div className="mt-6">
            <CodeBlock
              title="request body"
              lang="json"
              code={`{
  "model": "nylla/auto",
  "route": { "require": ["vision"] },
  "messages": [
    {
      "role": "user",
      "content": [
        { "type": "text", "text": "O que há de errado neste gráfico?" },
        {
          "type": "image_url",
          "image_url": { "url": "https://exemplo.com/grafico.png", "detail": "high" }
        }
      ]
    }
  ]
}`}
            />
          </div>
          <Note>
            Use <C>route.require: ["vision"]</C> para garantir que o roteador só considere modelos capazes de
            ler a imagem.
          </Note>
        </Section>

        <Section
          id="tool-calling"
          eyebrow="tool calling"
          title="Tool calling"
          lead="Function calling no formato padrão OpenAI, normalizado entre todos os provedores. A mesma definição de tool funciona em Claude, GPT, Gemini ou Llama."
        >
          <div className="mt-6">
            <CodeBlock
              tabs={[
                {
                  label: "definição",
                  lang: "json",
                  code: `{
  "model": "nylla/auto",
  "messages": [{ "role": "user", "content": "Qual o clima em São Paulo?" }],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_weather",
        "description": "Retorna o clima atual de uma cidade",
        "parameters": {
          "type": "object",
          "properties": {
            "city": { "type": "string", "description": "Nome da cidade" }
          },
          "required": ["city"]
        }
      }
    }
  ],
  "tool_choice": "auto"
}`,
                },
                {
                  label: "chamada",
                  lang: "json",
                  code: `{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "tool_calls": [
          {
            "id": "call_x81k",
            "type": "function",
            "function": { "name": "get_weather", "arguments": "{ city: São Paulo }" }
          }
        ]
      },
      "finish_reason": "tool_calls"
    }
  ]
}`,
                },
                {
                  label: "retorno",
                  lang: "json",
                  code: `{
  "model": "nylla/auto",
  "messages": [
    { "role": "user", "content": "Qual o clima em São Paulo?" },
    { "role": "assistant", "tool_calls": [] },
    {
      "role": "tool",
      "tool_call_id": "call_x81k",
      "content": "{ temp_c: 24, condition: parcialmente nublado }"
    }
  ]
}`,
                },
              ]}
            />
          </div>
          <Note>
            Execute a função no seu servidor e devolva o resultado numa mensagem <C>role: tool</C> com o mesmo{" "}
            <C>tool_call_id</C>. Chamadas paralelas vêm como múltiplos itens em <C>tool_calls</C>.
          </Note>
        </Section>

        <Section
          id="structured-outputs"
          eyebrow="structured outputs"
          title="Structured outputs"
          lead={
            <>
              Force a saída a obedecer um JSON Schema com <C>response_format</C>. O gateway valida o schema e
              reencaminha para um modelo compatível quando necessário.
            </>
          }
        >
          <div className="mt-6">
            <CodeBlock
              title="request body"
              lang="json"
              code={`{
  "model": "nylla/auto",
  "messages": [{ "role": "user", "content": "Extraia os dados: João, 34 anos, SP" }],
  "response_format": {
    "type": "json_schema",
    "json_schema": {
      "name": "pessoa",
      "strict": true,
      "schema": {
        "type": "object",
        "properties": {
          "nome": { "type": "string" },
          "idade": { "type": "integer" },
          "uf": { "type": "string" }
        },
        "required": ["nome", "idade", "uf"],
        "additionalProperties": false
      }
    }
  }
}`}
            />
          </div>
          <Note>
            Com <C>strict: true</C>, uma saída que não valide gera novo attempt automático antes de retornar
            erro. Schemas inválidos falham na entrada com <C>400 invalid_request_error</C>.
          </Note>
        </Section>

        <Section
          id="byok"
          eyebrow="byok"
          title="BYOK: traga sua chave"
          lead="Cadastre suas próprias chaves de provedor para usar créditos, descontos negociados ou modelos fine-tuned. O gateway continua entregando roteamento, cache e observabilidade, e não cobra tokens sobre tráfego BYOK."
        >
          <div className="mt-6">
            <CodeBlock
              title="POST /v1/providers"
              lang="json"
              code={`{
  "provider": "openai",
  "api_key": "sk-proj-...",
  "priority": "prefer",
  "models": ["openai/ft:gpt-5-mini:acme:2026-07"]
}`}
            />
          </div>
          <Note>
            <C>priority: prefer</C> usa sua chave primeiro e cai para os créditos do Nylla se ela falhar;{" "}
            <C>only</C> nunca sai da sua chave. As credenciais são cifradas com envelope encryption e nunca
            retornam em leitura.
          </Note>
        </Section>

        {/* ─────────────────────── 04 · OPERAÇÃO ─────────────────────── */}
        <GroupDivider index="04" label="operação" />

        <Section
          id="erros"
          eyebrow="erros"
          title="Erros"
          lead={
            <>
              Erros seguem o envelope padrão OpenAI: HTTP status mais um objeto <C>error</C> com <C>type</C>,{" "}
              <C>code</C> e mensagem legível.
            </>
          }
        >
          <div className="mt-6">
            <CodeBlock
              title="429 Too Many Requests"
              lang="json"
              code={`{
  "error": {
    "type": "rate_limit_error",
    "code": "rate_limit_exceeded",
    "message": "Limite de 500 RPM excedido. Tente novamente em 12s.",
    "param": null,
    "request_id": "req_8k2m4x"
  }
}`}
            />
          </div>
          <div className="mt-6">
            <DataTable
              caption="Códigos de erro da API"
              head={["status", "type", "quando ocorre"]}
              mono={[0, 1]}
              minWidth={620}
              rows={[
                ["400", "invalid_request_error", "Corpo malformado, parâmetro inválido ou schema rejeitado"],
                ["401", "authentication_error", "Chave ausente, inválida ou revogada"],
                ["402", "insufficient_credits", "Créditos ou orçamento frontier esgotados"],
                ["403", "permission_error", "Chave sem escopo para o endpoint ou modelo"],
                ["404", "not_found_error", "Modelo ou recurso inexistente"],
                ["408", "timeout_error", "Provedor excedeu o timeout e não havia fallback"],
                ["409", "idempotency_conflict", "Mesma chave de idempotência com corpo diferente"],
                ["413", "payload_too_large", "Contexto acima do limite do modelo escolhido"],
                ["422", "content_policy_violation", "Bloqueado por guardrail de entrada ou saída"],
                ["429", "rate_limit_error", "Limite de requisições ou tokens por minuto excedido"],
                ["500", "api_error", "Erro interno do gateway"],
                ["502", "upstream_error", "Todos os provedores da cadeia de fallback falharam"],
                ["503", "overloaded_error", "Capacidade temporariamente esgotada; tente novamente"],
              ]}
            />
          </div>
          <Note>
            Sempre registre o <C>request_id</C>: com ele o suporte reconstrói a rota completa da requisição,
            incluindo tentativas e provedores.
          </Note>
        </Section>

        <Section
          id="retries"
          eyebrow="retries e idempotência"
          title="Retries e idempotência"
          lead={
            <>
              O gateway já faz retry interno de falhas transitórias. Para retries do seu lado, envie{" "}
              <C>Idempotency-Key</C> e uma repetição nunca cobra nem gera duas vezes.
            </>
          }
        >
          <div className="mt-6">
            <CodeBlock
              title="request headers"
              lang="text"
              code={`Idempotency-Key: 5f1c9a2e-7b31-4d0a-9c88-1a2b3c4d5e6f
X-Nylla-Timeout-Ms: 20000`}
            />
          </div>
          <Bullets
            items={[
              "A chave de idempotência vale 24h; requisições repetidas recebem a resposta original com x-nylla-idempotent-replay: true.",
              "Repita apenas 408, 429, 500, 502 e 503; os demais são determinísticos e vão falhar igual.",
              "Use backoff exponencial com jitter, começando em 500ms e limitado a ~8s.",
              "Respeite retry-after quando presente; ele vem calculado pela janela real do rate limit.",
            ]}
          />
        </Section>

        <Section
          id="rate-limits"
          eyebrow="rate limits"
          title="Rate limits"
          lead={
            <>
              Limites são por chave e retornados em headers a cada resposta. Ao receber 429, respeite{" "}
              <C>retry-after</C> e use backoff exponencial.
            </>
          }
        >
          <div className="mt-6">
            <DataTable
              caption="Limites por plano"
              head={["plano", "req/min", "tokens/min", "concorrência"]}
              minWidth={520}
              rows={[
                [<span key="f" className="text-foreground">Free</span>, "60", "100k", "5"],
                [<span key="p" className="text-foreground">Pro</span>, "500", "1M", "50"],
                [<span key="s" className="text-foreground">Scale</span>, "2 000", "10M", "500"],
                [<span key="e" className="text-foreground">Enterprise</span>, "custom", "custom", "custom"],
              ]}
            />
          </div>
          <div className="mt-4">
            <CodeBlock
              title="response headers"
              lang="text"
              code={`x-ratelimit-limit-requests: 500
x-ratelimit-remaining-requests: 483
x-ratelimit-reset-requests: 12s
x-ratelimit-limit-tokens: 1000000
x-ratelimit-remaining-tokens: 962144
retry-after: 12`}
            />
          </div>
        </Section>

        <Section
          id="paginacao"
          eyebrow="paginação"
          title="Paginação"
          lead={
            <>
              Coleções usam paginação por cursor. Passe <C>limit</C> e <C>after</C>, e siga enquanto{" "}
              <C>has_more</C> for verdadeiro.
            </>
          }
        >
          <div className="mt-6">
            <CodeBlock
              title="GET /v1/files?limit=2&after=file_2k9x"
              lang="json"
              code={`{
  "object": "list",
  "data": [
    { "id": "file_3p1m", "object": "file" },
    { "id": "file_4q7z", "object": "file" }
  ],
  "first_id": "file_3p1m",
  "last_id": "file_4q7z",
  "has_more": true
}`}
            />
          </div>
          <Note>
            <C>limit</C> aceita de 1 a 100, com padrão 20. Cursores são opacos: não derive significado deles
            nem os construa manualmente.
          </Note>
        </Section>

        <Section
          id="webhooks"
          eyebrow="webhooks"
          title="Webhooks"
          lead="Receba eventos de orçamento, lote e incidente de provedor no seu endpoint, assinados com HMAC-SHA256."
        >
          <div className="mt-6">
            <DataTable
              caption="Eventos de webhook"
              head={["evento", "disparado quando"]}
              mono={[0]}
              minWidth={520}
              rows={[
                ["budget.threshold_reached", "O gasto da chave cruza 50%, 80% ou 100% do limite"],
                ["credits.exhausted", "Os créditos frontier do período acabam"],
                ["batch.completed", "Um job em lote termina, com ou sem falhas"],
                ["key.revoked", "Uma chave é revogada manualmente ou por política"],
                ["provider.degraded", "Um upstream entra em degradação e o roteamento muda"],
              ]}
            />
          </div>
          <div className="mt-6">
            <CodeBlock
              title="verificação da assinatura"
              lang="ts"
              code={`import { createHmac, timingSafeEqual } from "node:crypto"

export function verify(rawBody: string, header: string, secret: string) {
  const [ts, signature] = header.split(",").map((p) => p.split("=")[1])
  const expected = createHmac("sha256", secret).update(ts + "." + rawBody).digest("hex")
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
}`}
            />
          </div>
          <Note>
            O header é <C>x-nylla-signature: t=1767225600,v1=...</C>. Rejeite eventos com timestamp mais antigo
            que 5 minutos para evitar replay.
          </Note>
        </Section>

        <Section
          id="observabilidade"
          eyebrow="observabilidade"
          title="Observabilidade"
          lead="Toda requisição gera um traço com provedor, tentativas, tokens, custo e latência por estágio. Consulte no dashboard, puxe via API ou exporte para sua própria stack."
        >
          <div className="mt-6 space-y-3">
            <Endpoint method="GET" path="/v1/logs" note="escopo read" />
            <Endpoint method="GET" path="/v1/logs/{request_id}" />
          </div>
          <div className="mt-4">
            <CodeBlock
              title="200 OK · /v1/logs/req_8k2m4x"
              lang="json"
              code={`{
  "request_id": "req_8k2m4x",
  "model_requested": "nylla/auto",
  "model_served": "anthropic/claude-sonnet-4.5",
  "attempts": [
    { "provider": "openai", "status": 503, "latency_ms": 1980 },
    { "provider": "anthropic", "status": 200, "latency_ms": 412 }
  ],
  "usage": { "total_tokens": 160, "cached_tokens": 0 },
  "cost_usd": 0.0031,
  "metadata": { "tenant": "acme", "feature": "resumo" }
}`}
            />
          </div>
          <SubHeading>Exportação</SubHeading>
          <Bullets
            items={[
              "OpenTelemetry: aponte um collector OTLP e receba spans por requisição, tentativa e cache lookup.",
              "Datadog, Grafana e Honeycomb via destinos nativos no dashboard.",
              "Propague contexto de negócio em metadata para filtrar custo por tenant, feature ou usuário.",
            ]}
          />
        </Section>

        <Section
          id="privacidade"
          eyebrow="privacidade"
          title="Privacidade e conformidade"
          lead="O gateway é uma camada de trânsito. Por padrão, o conteúdo de prompts e respostas não é retido além do necessário para servir a requisição."
        >
          <div className="mt-6">
            <DataTable
              caption="Políticas de dados"
              head={["item", "padrão", "configurável"]}
              minWidth={560}
              rows={[
                ["Retenção de prompt e resposta", "não retido", "logs opcionais de 7 a 90 dias"],
                ["Metadados de requisição", "30 dias", "sim, por projeto"],
                ["Treinamento com seus dados", "nunca", "não aplicável"],
                ["Residência de dados", "multirregião", "fixe com route.providers"],
                ["Redação de PII", "desligada", "sim, no pipeline de guardrails"],
                ["Sub-processadores", "apenas provedores usados", "restrinja por allow list"],
              ]}
            />
          </div>
          <Callout>
            Para zero retenção de ponta a ponta, envie <C>X-Nylla-No-Log: true</C> ou ative o modo em nível de
            projeto. Nesse modo, logs guardam só metadados: modelo, tokens, latência e custo.
          </Callout>
        </Section>

        <Section
          id="versionamento"
          eyebrow="versionamento"
          title="Versionamento"
          lead={
            <>
              A API é versionada no caminho (<C>/v1</C>). Adições de campo são compatíveis e podem chegar sem
              aviso; remoções e mudanças de semântica só acontecem em uma nova versão maior.
            </>
          }
        >
          <Bullets
            items={[
              "Trate campos desconhecidos como opcionais, porque o gateway adiciona metadados ao longo do tempo.",
              "IDs de modelo são estáveis; aliases como nylla/auto podem passar a resolver para modelos melhores.",
              "Depreciações são anunciadas com 6 meses de antecedência e sinalizadas no header sunset.",
              "Fixe um modelo explícito quando precisar de saída reprodutível entre deploys.",
            ]}
          />
          <div className="mt-6">
            <CodeBlock
              title="header de depreciação"
              lang="text"
              code={`deprecation: true
sunset: Wed, 01 Apr 2026 00:00:00 GMT
link: <https://docs.nylla.ai/changelog>; rel="deprecation"`}
            />
          </div>
        </Section>

        {/* ─────────────────────── 05 · INTEGRAÇÃO ─────────────────────── */}
        <GroupDivider index="05" label="integração" />

        <Section
          id="sdks"
          eyebrow="sdks"
          title="SDKs"
          lead={
            <>
              Não existe SDK proprietário para aprender: o Nylla é compatível com os SDKs oficiais da OpenAI e
              com o AI SDK da Vercel. Basta trocar a <C>baseURL</C>.
            </>
          }
        >
          <div className="mt-6">
            <CodeBlock
              tabs={[
                {
                  label: "ai sdk",
                  lang: "ts",
                  code: `import { createOpenAICompatible } from "@ai-sdk/openai-compatible"
import { streamText } from "ai"

const nylla = createOpenAICompatible({
  name: "nylla",
  baseURL: "https://api.nylla.ai/v1",
  apiKey: process.env.NYLLA_API_KEY,
})

const result = streamText({
  model: nylla("nylla/auto"),
  prompt: "Escreva um haiku sobre gateways.",
})`,
                },
                {
                  label: "openai js",
                  lang: "ts",
                  code: `import OpenAI from "openai"

const client = new OpenAI({
  baseURL: "https://api.nylla.ai/v1",
  apiKey: process.env.NYLLA_API_KEY,
})`,
                },
                {
                  label: "openai python",
                  lang: "python",
                  code: `import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.nylla.ai/v1",
    api_key=os.environ["NYLLA_API_KEY"],
)`,
                },
                {
                  label: "langchain",
                  lang: "python",
                  code: `import os
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    base_url="https://api.nylla.ai/v1",
    api_key=os.environ["NYLLA_API_KEY"],
    model="nylla/auto",
)`,
                },
              ]}
            />
          </div>
        </Section>

        <Section
          id="harnesses"
          eyebrow="harnesses"
          title="Harnesses"
          lead={
            <>
              O CLI configura ferramentas de código automaticamente. O flag <C>--harness</C> aceita os
              seguintes valores:
            </>
          }
        >
          <div className="mt-6">
            <TableShell caption="Harnesses suportados" head={["harness", "valor", "status"]} minWidth={480}>
              {[
                ["Claude Code", "claude-code", "estável"],
                ["Codex", "codex", "estável"],
                ["Cursor", "cursor", "estável"],
                ["VS Code", "vscode", "estável"],
                ["Aermes Agent", "aermes", "estável"],
                ["Zed", "zed", "estável"],
                ["OpenCode", "opencode", "estável"],
                ["Cline", "cline", "estável"],
                ["Windsurf", "windsurf", "estável"],
                ["JetBrains", "jetbrains", "beta"],
                ["Neovim", "nvim", "beta"],
              ].map(([name, value, status]) => (
                <tr key={value} className="border-b border-border/60 last:border-b-0">
                  <td className="type-label px-4 py-2.5 text-foreground">{name}</td>
                  <td className="px-4 py-2.5">
                    <code className="type-code text-muted-foreground">{value}</code>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`type-micro ${status === "beta" ? "text-primary" : "text-subtle-foreground"}`}>
                      {status}
                    </span>
                  </td>
                </tr>
              ))}
            </TableShell>
          </div>
          <div className="mt-6">
            <CodeBlock
              title="comandos do cli"
              lang="bash"
              code={`nylla connect --harness claude-code
nylla connect --harness cursor
nylla models set-default anthropic/claude-sonnet-4.5
nylla keys create --name ci --scope chat
nylla usage --since 7d`}
            />
          </div>
        </Section>

        <Section
          id="configuracao"
          eyebrow="configuração"
          title="Configuração"
          lead={
            <>
              O arquivo <C>~/.nylla/nylla.json</C> controla o comportamento local do CLI e os padrões enviados
              ao gateway.
            </>
          }
        >
          <div className="mt-6">
            <CodeBlock
              title="~/.nylla/nylla.json"
              lang="json"
              code={`{
  "defaultModel": "nylla/auto",
  "routing": {
    "strategy": "latency",
    "fallbacks": ["anthropic/claude-sonnet-4.5", "openai/gpt-5-mini"],
    "maxCostUsd": 0.05
  },
  "frontier": { "enabled": true, "monthlyBudget": "auto" },
  "cache": { "enabled": true, "mode": "semantic", "ttlSeconds": 3600 },
  "logging": { "level": "metadata" },
  "telemetry": false
}`}
            />
          </div>

          <SubHeading>Variáveis de ambiente</SubHeading>
          <div className="mt-4">
            <ParamTable
              caption="Variáveis de ambiente suportadas"
              params={[
                {
                  name: "NYLLA_API_KEY",
                  type: "string",
                  required: true,
                  desc: "Chave de autenticação. Tem precedência sobre a chave salva pelo CLI.",
                },
                { name: "NYLLA_BASE_URL", type: "string", desc: "Sobrescreve a base URL, útil para proxies self-hosted." },
                { name: "NYLLA_DEFAULT_MODEL", type: "string", desc: "Modelo padrão quando o corpo não especifica." },
                { name: "NYLLA_TIMEOUT_MS", type: "integer", default: "30000", desc: "Timeout por tentativa antes do fallback." },
                { name: "NYLLA_MAX_RETRIES", type: "integer", default: "2", desc: "Retries do cliente para erros transitórios." },
              ]}
            />
          </div>
        </Section>

        <Section
          id="recursos"
          eyebrow="recursos"
          title="Recursos"
          lead="Especificações legíveis por máquina, para você gerar clientes e para agentes consumirem esta documentação diretamente."
        >
          <div className="mt-6 grid gap-px border border-border/60 bg-border/60 sm:grid-cols-2">
            {[
              ["openapi.json", "Especificação OpenAPI 3.1 completa, pronta para gerar clientes.", "/openapi.json"],
              ["llms.txt", "Esta documentação em texto plano, otimizada para agentes.", "/llms.txt"],
              ["postman", "Coleção com todos os endpoints e exemplos de corpo.", "/postman.json"],
              ["status", "Disponibilidade histórica do gateway e dos provedores.", "https://status.nylla.ai"],
            ].map(([title, desc, href]) => (
              <a key={title} href={href} className="group bg-background p-5 transition-colors hover:bg-secondary">
                <div className="type-subheading flex items-center gap-2 text-foreground">
                  {title}
                  <span
                    aria-hidden="true"
                    className="text-primary transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </div>
                <p className="type-caption mt-2 text-pretty text-muted-foreground">{desc}</p>
              </a>
            ))}
          </div>

          <div className="mt-14 border border-border/60 bg-secondary p-6 md:p-8">
            <div className="type-eyebrow flex items-center gap-2.5 text-muted-foreground">
              <span aria-hidden="true" className="relative -top-px size-1.5 shrink-0 rounded-full bg-primary" />
              <span>pronto para começar</span>
            </div>
            <p className="type-lead mt-4 max-w-xl text-pretty text-foreground">
              Conecte seu harness em menos de um minuto. O CLI detecta a ferramenta instalada e configura o
              gateway automaticamente.
            </p>
            <div className="mt-6">
              <CopyCommand command="npx nylla connect" runners={false} />
            </div>
          </div>
          </Section>
        </div>
      </div>
    </main>
  )
}
