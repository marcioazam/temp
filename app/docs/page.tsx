import type { Metadata } from "next"
import { CopyCommand } from "@/components/copy-command"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsNav, type NavGroup } from "@/components/docs/docs-nav"
import { Endpoint, EndpointRow } from "@/components/docs/endpoint"
import { ParamTable } from "@/components/docs/param-table"

export const metadata: Metadata = {
  title: "Docs | Nylla — API Reference",
  description:
    "Documentação completa da API do Nylla: gateway de LLM compatível com OpenAI. Endpoints, autenticação, streaming, roteamento, tool calling e SDKs.",
}

const navGroups: NavGroup[] = [
  {
    label: "início",
    items: [
      { id: "sobre", label: "sobre o nylla" },
      { id: "quickstart", label: "quickstart" },
      { id: "autenticacao", label: "autenticação" },
    ],
  },
  {
    label: "api reference",
    items: [
      { id: "endpoints", label: "visão geral" },
      { id: "chat-completions", label: "chat completions" },
      { id: "completions", label: "completions" },
      { id: "embeddings", label: "embeddings" },
      { id: "models", label: "models" },
      { id: "usage", label: "usage" },
      { id: "keys", label: "api keys" },
    ],
  },
  {
    label: "conceitos",
    items: [
      { id: "streaming", label: "streaming" },
      { id: "roteamento", label: "roteamento" },
      { id: "tool-calling", label: "tool calling" },
      { id: "structured-outputs", label: "structured outputs" },
      { id: "erros", label: "erros" },
      { id: "rate-limits", label: "rate limits" },
    ],
  },
  {
    label: "integração",
    items: [
      { id: "sdks", label: "sdks" },
      { id: "harnesses", label: "harnesses" },
      { id: "configuracao", label: "configuração" },
    ],
  },
]

function SectionHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 className="type-heading text-foreground" id={id}>
      {children}
    </h2>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="type-subheading mt-10 text-foreground">{children}</h3>
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="type-body mt-4 max-w-2xl text-muted-foreground">{children}</p>
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return <code className="type-code bg-muted px-1.5 py-0.5 text-foreground">{children}</code>
}

export default function DocsPage() {
  return (
    <main className="mx-auto flex w-full max-w-screen-2xl gap-12 px-4 py-16 md:px-9 md:py-20">
      <aside className="hidden w-52 shrink-0 lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8 pr-2">
          <DocsNav groups={navGroups} />
        </div>
      </aside>

      <div className="min-w-0 flex-1 space-y-24 lg:max-w-4xl">
        {/* ============================== SOBRE ============================== */}
        <section id="sobre">
          <div className="type-eyebrow text-primary">documentação</div>
          <h1 className="type-title mt-4 text-foreground">API do Nylla</h1>
          <p className="type-lead mt-5 max-w-2xl text-muted-foreground">
            O Nylla é um gateway de LLM: uma única API, compatível com o padrão OpenAI, na frente de todos os
            provedores e modelos. Você troca a base URL, mantém seu código e ganha roteamento inteligente,
            fallback automático, cache, observabilidade e controle de custo.
          </p>

          <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-3">
            {[
              ["1 API", "Um contrato OpenAI-compatible para todos os provedores. Zero lock-in."],
              ["40+ modelos", "OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek, xAI e mais."],
              ["99.9% uptime", "Fallback entre provedores em milissegundos quando um deles falha."],
            ].map(([stat, desc]) => (
              <div key={stat} className="bg-background p-5">
                <div className="type-subheading text-foreground">{stat}</div>
                <p className="type-caption mt-2 text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <SubHeading>Base URL</SubHeading>
          <Body>
            Todos os endpoints são servidos sob a mesma base. Se seu código já fala com a API da OpenAI, basta
            apontar para cá:
          </Body>
          <div className="mt-4">
            <CodeBlock title="base url" code={`https://api.nylla.ai/v1`} />
          </div>
        </section>

        {/* ============================ QUICKSTART ============================ */}
        <section id="quickstart">
          <SectionHeading>Quickstart</SectionHeading>
          <Body>
            Duas formas de começar: pelo CLI, que detecta e configura seu harness automaticamente, ou direto
            pela API com sua chave.
          </Body>

          <SubHeading>1. Via CLI (recomendado)</SubHeading>
          <div className="mt-4">
            <CopyCommand command="npx nylla connect" />
          </div>

          <SubHeading>2. Via API</SubHeading>
          <Body>Crie uma chave no dashboard e faça sua primeira requisição:</Body>
          <div className="mt-4">
            <CodeBlock
              tabs={[
                {
                  label: "curl",
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
                  code: `from openai import OpenAI

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
        </section>

        {/* =========================== AUTENTICAÇÃO =========================== */}
        <section id="autenticacao">
          <SectionHeading>Autenticação</SectionHeading>
          <Body>
            Toda requisição precisa do header <InlineCode>Authorization</InlineCode> com uma Bearer key.
            Chaves são criadas e revogadas no dashboard ou via API, e têm o prefixo{" "}
            <InlineCode>nyl-</InlineCode>.
          </Body>
          <div className="mt-4">
            <CodeBlock title="header" code={`Authorization: Bearer nyl-xxxxxxxxxxxxxxxxxxxxxxxx`} />
          </div>
          <SubHeading>Boas práticas</SubHeading>
          <ul className="type-body mt-4 max-w-2xl space-y-2.5 text-muted-foreground">
            {[
              "Nunca exponha a chave no client — chame a API sempre do servidor.",
              "Use uma chave por ambiente (dev, staging, produção) e por serviço.",
              "Defina limites de gasto por chave para conter incidentes.",
              "Rotacione chaves periodicamente; revogação tem efeito imediato.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-[0.55em] h-1 w-1 shrink-0 bg-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* ======================= ENDPOINTS — VISÃO GERAL ======================= */}
        <section id="endpoints">
          <SectionHeading>Endpoints — visão geral</SectionHeading>
          <Body>
            A superfície da API segue o padrão OpenAI-compatible. Qualquer SDK, framework ou harness que fale
            esse contrato funciona sem adaptação.
          </Body>
          <div className="mt-6 overflow-x-auto border border-border">
            <table className="w-full min-w-[640px]">
              <caption className="sr-only">Lista de todos os endpoints da API</caption>
              <thead>
                <tr className="type-eyebrow border-b border-border bg-card text-left text-subtle-foreground">
                  <th className="px-4 py-3 font-medium">método</th>
                  <th className="px-4 py-3 font-medium">endpoint</th>
                  <th className="px-4 py-3 font-medium">descrição</th>
                </tr>
              </thead>
              <tbody>
                <EndpointRow method="POST" path="/v1/chat/completions" desc="Gera respostas de chat (com streaming)" />
                <EndpointRow method="POST" path="/v1/completions" desc="Completions de texto (legado)" />
                <EndpointRow method="POST" path="/v1/embeddings" desc="Gera vetores de embedding" />
                <EndpointRow method="GET" path="/v1/models" desc="Lista modelos disponíveis" />
                <EndpointRow method="GET" path="/v1/models/{id}" desc="Detalhes de um modelo" />
                <EndpointRow method="GET" path="/v1/usage" desc="Consumo de créditos e tokens" />
                <EndpointRow method="GET" path="/v1/keys" desc="Lista chaves de API" />
                <EndpointRow method="POST" path="/v1/keys" desc="Cria uma chave de API" />
                <EndpointRow method="DELETE" path="/v1/keys/{id}" desc="Revoga uma chave de API" />
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================= CHAT COMPLETIONS ========================= */}
        <section id="chat-completions">
          <SectionHeading>Chat completions</SectionHeading>
          <Body>
            O endpoint principal do gateway. Aceita o mesmo corpo do endpoint da OpenAI, com extensões
            opcionais de roteamento sob o campo <InlineCode>route</InlineCode>.
          </Body>
          <div className="mt-6">
            <Endpoint method="POST" path="/v1/chat/completions" />
          </div>

          <SubHeading>Parâmetros do corpo</SubHeading>
          <div className="mt-4">
            <ParamTable
              caption="Parâmetros do corpo de chat completions"
              params={[
                { name: "model", type: "string", required: true, desc: 'ID no formato provider/model, ex.: "anthropic/claude-sonnet-4.5". Aceita "nylla/auto" para roteamento automático.' },
                { name: "messages", type: "array", required: true, desc: "Histórico da conversa: objetos com role (system, user, assistant, tool) e content." },
                { name: "stream", type: "boolean", desc: "Se true, responde via Server-Sent Events token a token. Padrão: false." },
                { name: "temperature", type: "number", desc: "Aleatoriedade da amostragem, de 0 a 2. Padrão: 1." },
                { name: "max_tokens", type: "integer", desc: "Limite de tokens gerados na resposta." },
                { name: "top_p", type: "number", desc: "Amostragem por núcleo. Alternativa a temperature." },
                { name: "stop", type: "string | array", desc: "Até 4 sequências que interrompem a geração." },
                { name: "tools", type: "array", desc: "Ferramentas (funções) que o modelo pode invocar. Ver tool calling." },
                { name: "tool_choice", type: "string | object", desc: 'Controla o uso de ferramentas: "auto", "none", "required" ou uma função específica.' },
                { name: "response_format", type: "object", desc: 'Formato da saída: { "type": "json_schema", ... } para structured outputs.' },
                { name: "frequency_penalty", type: "number", desc: "Penaliza repetição de tokens, de -2 a 2." },
                { name: "presence_penalty", type: "number", desc: "Penaliza tokens já presentes, de -2 a 2." },
                { name: "seed", type: "integer", desc: "Best-effort para saídas determinísticas." },
                { name: "user", type: "string", desc: "ID do usuário final, para rastreio de abuso e analytics." },
                { name: "route", type: "object", desc: "Extensão Nylla: estratégia de roteamento, fallbacks e cache. Ver roteamento." },
              ]}
            />
          </div>

          <SubHeading>Resposta</SubHeading>
          <div className="mt-4">
            <CodeBlock
              title="200 OK"
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
    "total_tokens": 160
  },
  "nylla": {
    "provider": "anthropic",
    "latency_ms": 412,
    "cached": false,
    "cost_credits": 0.0031
  }
}`}
            />
          </div>
          <p className="type-caption mt-3 max-w-2xl text-subtle-foreground">
            O objeto <InlineCode>nylla</InlineCode> é uma extensão de metadados do gateway — provedor usado,
            latência, cache hit e custo. SDKs padrão o ignoram sem erro.
          </p>
        </section>

        {/* ============================ COMPLETIONS ============================ */}
        <section id="completions">
          <SectionHeading>Completions (legado)</SectionHeading>
          <Body>
            Suportado para compatibilidade com integrações antigas. Para novos projetos, use{" "}
            <InlineCode>/v1/chat/completions</InlineCode>.
          </Body>
          <div className="mt-6">
            <Endpoint method="POST" path="/v1/completions" />
          </div>
          <div className="mt-4">
            <CodeBlock
              title="curl"
              code={`curl https://api.nylla.ai/v1/completions \\
  -H "Authorization: Bearer $NYLLA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "meta/llama-4-maverick",
    "prompt": "O gateway de LLM serve para",
    "max_tokens": 64
  }'`}
            />
          </div>
        </section>

        {/* ============================ EMBEDDINGS ============================ */}
        <section id="embeddings">
          <SectionHeading>Embeddings</SectionHeading>
          <Body>
            Gera vetores para busca semântica, RAG e clustering. Aceita string única ou batch de até 2048
            entradas por requisição.
          </Body>
          <div className="mt-6">
            <Endpoint method="POST" path="/v1/embeddings" />
          </div>
          <div className="mt-4">
            <ParamTable
              caption="Parâmetros do corpo de embeddings"
              params={[
                { name: "model", type: "string", required: true, desc: 'Modelo de embedding, ex.: "openai/text-embedding-3-large".' },
                { name: "input", type: "string | array", required: true, desc: "Texto ou lista de textos a vetorizar." },
                { name: "dimensions", type: "integer", desc: "Reduz a dimensionalidade do vetor (quando o modelo suporta)." },
                { name: "encoding_format", type: "string", desc: '"float" (padrão) ou "base64".' },
              ]}
            />
          </div>
          <div className="mt-6">
            <CodeBlock
              title="200 OK"
              code={`{
  "object": "list",
  "model": "openai/text-embedding-3-large",
  "data": [
    { "object": "embedding", "index": 0, "embedding": [0.0132, -0.0247, ...] }
  ],
  "usage": { "prompt_tokens": 8, "total_tokens": 8 }
}`}
            />
          </div>
        </section>

        {/* ============================== MODELS ============================== */}
        <section id="models">
          <SectionHeading>Models</SectionHeading>
          <Body>
            Lista o catálogo disponível no seu plano, com preço, contexto e capacidades de cada modelo. IDs
            seguem sempre o formato <InlineCode>provider/model</InlineCode>.
          </Body>
          <div className="mt-6 space-y-3">
            <Endpoint method="GET" path="/v1/models" />
            <Endpoint method="GET" path="/v1/models/{id}" />
          </div>
          <div className="mt-4">
            <CodeBlock
              title="200 OK — /v1/models"
              code={`{
  "object": "list",
  "data": [
    {
      "id": "anthropic/claude-sonnet-4.5",
      "object": "model",
      "context_length": 200000,
      "capabilities": ["chat", "tools", "vision", "json_schema"],
      "pricing": { "input": 3.0, "output": 15.0, "unit": "usd_per_1m_tokens" },
      "tier": "frontier"
    },
    {
      "id": "deepseek/deepseek-v3.2",
      "object": "model",
      "context_length": 128000,
      "capabilities": ["chat", "tools", "json_schema"],
      "pricing": { "input": 0.27, "output": 1.10, "unit": "usd_per_1m_tokens" },
      "tier": "included"
    }
  ]
}`}
            />
          </div>
          <p className="type-caption mt-3 max-w-2xl text-subtle-foreground">
            <InlineCode>tier: "included"</InlineCode> não consome créditos de usage;{" "}
            <InlineCode>tier: "frontier"</InlineCode> consome do orçamento frontier do plano.
          </p>
        </section>

        {/* =============================== USAGE =============================== */}
        <section id="usage">
          <SectionHeading>Usage</SectionHeading>
          <Body>
            Consulta o consumo agregado de tokens e créditos por período, chave e modelo — a mesma fonte de
            dados do dashboard.
          </Body>
          <div className="mt-6">
            <Endpoint method="GET" path="/v1/usage?start=2026-08-01&end=2026-08-27&group_by=model" />
          </div>
          <div className="mt-4">
            <ParamTable
              caption="Query params de usage"
              params={[
                { name: "start", type: "string (date)", required: true, desc: "Início do período, formato ISO 8601." },
                { name: "end", type: "string (date)", desc: "Fim do período. Padrão: hoje." },
                { name: "group_by", type: "string", desc: '"model", "key" ou "day". Padrão: "day".' },
              ]}
            />
          </div>
        </section>

        {/* ================================ KEYS ================================ */}
        <section id="keys">
          <SectionHeading>API keys</SectionHeading>
          <Body>
            Gerencie chaves programaticamente. Requer uma chave com escopo <InlineCode>admin</InlineCode>. O
            valor completo da chave só é retornado uma vez, na criação.
          </Body>
          <div className="mt-6 space-y-3">
            <Endpoint method="GET" path="/v1/keys" />
            <Endpoint method="POST" path="/v1/keys" />
            <Endpoint method="DELETE" path="/v1/keys/{id}" />
          </div>
          <div className="mt-4">
            <CodeBlock
              title="POST /v1/keys"
              code={`{
  "name": "producao-backend",
  "scopes": ["chat", "embeddings"],
  "monthly_limit_usd": 200
}

// 201 Created
{
  "id": "key_7d3f9a",
  "name": "producao-backend",
  "key": "nyl-xxxxxxxxxxxxxxxxxxxxxxxx",
  "scopes": ["chat", "embeddings"],
  "monthly_limit_usd": 200,
  "created_at": "2026-08-27T12:00:00Z"
}`}
            />
          </div>
        </section>

        {/* ============================= STREAMING ============================= */}
        <section id="streaming">
          <SectionHeading>Streaming</SectionHeading>
          <Body>
            Com <InlineCode>stream: true</InlineCode>, a resposta chega via Server-Sent Events, um chunk por
            token, no mesmo formato de delta da OpenAI. O stream termina com{" "}
            <InlineCode>data: [DONE]</InlineCode>.
          </Body>
          <div className="mt-4">
            <CodeBlock
              tabs={[
                {
                  label: "sse",
                  code: `data: {"id":"chatcmpl-9f2a1b3c","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"role":"assistant","content":""}}]}

data: {"id":"chatcmpl-9f2a1b3c","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"Um"}}]}

data: {"id":"chatcmpl-9f2a1b3c","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":" gateway"}}]}

data: {"id":"chatcmpl-9f2a1b3c","object":"chat.completion.chunk","choices":[{"index":0,"delta":{},"finish_reason":"stop"}],"usage":{"prompt_tokens":18,"completion_tokens":142,"total_tokens":160}}

data: [DONE]`,
                },
                {
                  label: "typescript",
                  code: `const stream = await client.chat.completions.create({
  model: "nylla/auto",
  messages: [{ role: "user", content: "Olá" }],
  stream: true,
})

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? "")
}`,
                },
              ]}
            />
          </div>
          <p className="type-caption mt-3 max-w-2xl text-subtle-foreground">
            Se um provedor cair no meio do stream, o gateway reconecta em outro provedor de forma transparente
            — o cliente continua recebendo o mesmo stream SSE.
          </p>
        </section>

        {/* ============================ ROTEAMENTO ============================ */}
        <section id="roteamento">
          <SectionHeading>Roteamento</SectionHeading>
          <Body>
            O núcleo do gateway. Use <InlineCode>model: "nylla/auto"</InlineCode> para deixar o roteador
            escolher o melhor modelo por tarefa, ou controle explicitamente com o campo{" "}
            <InlineCode>route</InlineCode>:
          </Body>
          <div className="mt-4">
            <CodeBlock
              title="request body"
              code={`{
  "model": "nylla/auto",
  "messages": [...],
  "route": {
    "strategy": "latency",
    "fallbacks": [
      "anthropic/claude-sonnet-4.5",
      "openai/gpt-5-mini",
      "deepseek/deepseek-v3.2"
    ],
    "max_cost_usd": 0.05,
    "cache": { "enabled": true, "ttl_seconds": 3600 }
  }
}`}
            />
          </div>
          <div className="mt-6">
            <ParamTable
              caption="Campos do objeto route"
              params={[
                { name: "strategy", type: "string", desc: '"latency" (mais rápido), "cost" (mais barato), "quality" (melhor benchmark para a tarefa). Padrão: "quality".' },
                { name: "fallbacks", type: "array", desc: "Modelos tentados em ordem se o primário falhar ou exceder timeout." },
                { name: "max_cost_usd", type: "number", desc: "Teto de custo da requisição. Acima disso, o roteador troca para um modelo mais barato." },
                { name: "cache", type: "object", desc: "Cache semântico de respostas. Hits retornam em ~30ms e não consomem créditos." },
                { name: "require", type: "array", desc: 'Capacidades obrigatórias, ex.: ["tools", "vision"]. Filtra os candidatos do roteador.' },
              ]}
            />
          </div>
        </section>

        {/* =========================== TOOL CALLING =========================== */}
        <section id="tool-calling">
          <SectionHeading>Tool calling</SectionHeading>
          <Body>
            Function calling no formato padrão OpenAI, normalizado entre todos os provedores — a mesma
            definição de tool funciona em Claude, GPT, Gemini ou Llama.
          </Body>
          <div className="mt-4">
            <CodeBlock
              title="request body"
              code={`{
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
}`}
            />
          </div>
          <div className="mt-4">
            <CodeBlock
              title="200 OK — o modelo decide chamar a tool"
              code={`{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "tool_calls": [
          {
            "id": "call_x81k",
            "type": "function",
            "function": {
              "name": "get_weather",
              "arguments": "{\\"city\\":\\"São Paulo\\"}"
            }
          }
        ]
      },
      "finish_reason": "tool_calls"
    }
  ]
}`}
            />
          </div>
          <p className="type-caption mt-3 max-w-2xl text-subtle-foreground">
            Execute a função no seu servidor e devolva o resultado numa mensagem{" "}
            <InlineCode>role: "tool"</InlineCode> com o mesmo <InlineCode>tool_call_id</InlineCode>.
          </p>
        </section>

        {/* ======================== STRUCTURED OUTPUTS ======================== */}
        <section id="structured-outputs">
          <SectionHeading>Structured outputs</SectionHeading>
          <Body>
            Force a saída a obedecer um JSON Schema com <InlineCode>response_format</InlineCode>. O gateway
            valida o schema e reencaminha para um modelo compatível quando necessário.
          </Body>
          <div className="mt-4">
            <CodeBlock
              title="request body"
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
        </section>

        {/* =============================== ERROS =============================== */}
        <section id="erros">
          <SectionHeading>Erros</SectionHeading>
          <Body>
            Erros seguem o envelope padrão OpenAI: HTTP status + objeto <InlineCode>error</InlineCode> com{" "}
            <InlineCode>type</InlineCode>, <InlineCode>code</InlineCode> e mensagem legível.
          </Body>
          <div className="mt-4">
            <CodeBlock
              title="429 Too Many Requests"
              code={`{
  "error": {
    "type": "rate_limit_error",
    "code": "rate_limit_exceeded",
    "message": "Limite de 500 RPM excedido. Tente novamente em 12s.",
    "param": null
  }
}`}
            />
          </div>
          <div className="mt-6 overflow-x-auto border border-border">
            <table className="w-full min-w-[560px]">
              <caption className="sr-only">Códigos de erro da API</caption>
              <thead>
                <tr className="type-eyebrow border-b border-border bg-card text-left text-subtle-foreground">
                  <th className="px-4 py-3 font-medium">status</th>
                  <th className="px-4 py-3 font-medium">type</th>
                  <th className="px-4 py-3 font-medium">quando ocorre</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["400", "invalid_request_error", "Corpo malformado, parâmetro inválido ou schema rejeitado"],
                  ["401", "authentication_error", "Chave ausente, inválida ou revogada"],
                  ["402", "insufficient_credits", "Créditos ou orçamento frontier esgotados"],
                  ["403", "permission_error", "Chave sem escopo para o endpoint ou modelo"],
                  ["404", "not_found_error", "Modelo ou recurso inexistente"],
                  ["408", "timeout_error", "Provedor excedeu o timeout e não havia fallback"],
                  ["429", "rate_limit_error", "Limite de requisições ou tokens por minuto excedido"],
                  ["500", "api_error", "Erro interno do gateway"],
                  ["502", "upstream_error", "Todos os provedores da cadeia de fallback falharam"],
                ].map(([status, type, desc]) => (
                  <tr key={status} className="border-b border-border align-top last:border-b-0">
                    <td className="type-code whitespace-nowrap px-4 py-3 text-foreground">{status}</td>
                    <td className="type-code whitespace-nowrap px-4 py-3 text-muted-foreground">{type}</td>
                    <td className="type-label px-4 py-3 text-muted-foreground">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ============================ RATE LIMITS ============================ */}
        <section id="rate-limits">
          <SectionHeading>Rate limits</SectionHeading>
          <Body>
            Limites são por chave e retornados em headers a cada resposta. Ao receber 429, respeite{" "}
            <InlineCode>retry-after</InlineCode> e use backoff exponencial.
          </Body>
          <div className="mt-6 overflow-x-auto border border-border">
            <table className="w-full min-w-[520px]">
              <caption className="sr-only">Limites por plano</caption>
              <thead>
                <tr className="type-eyebrow border-b border-border bg-card text-left text-subtle-foreground">
                  <th className="px-4 py-3 font-medium">plano</th>
                  <th className="px-4 py-3 font-medium">req/min</th>
                  <th className="px-4 py-3 font-medium">tokens/min</th>
                  <th className="px-4 py-3 font-medium">concorrência</th>
                </tr>
              </thead>
              <tbody className="type-label text-muted-foreground">
                {[
                  ["Free", "60", "100k", "5"],
                  ["Pro", "500", "1M", "50"],
                  ["Scale", "2 000", "10M", "500"],
                  ["Enterprise", "custom", "custom", "custom"],
                ].map(([plan, rpm, tpm, conc]) => (
                  <tr key={plan} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-3 text-foreground">{plan}</td>
                    <td className="px-4 py-3">{rpm}</td>
                    <td className="px-4 py-3">{tpm}</td>
                    <td className="px-4 py-3">{conc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <CodeBlock
              title="response headers"
              code={`x-ratelimit-limit-requests: 500
x-ratelimit-remaining-requests: 483
x-ratelimit-reset-requests: 12s
x-ratelimit-limit-tokens: 1000000
x-ratelimit-remaining-tokens: 962144
retry-after: 12`}
            />
          </div>
        </section>

        {/* ================================ SDKS ================================ */}
        <section id="sdks">
          <SectionHeading>SDKs</SectionHeading>
          <Body>
            Não existe SDK proprietário para aprender: o Nylla é 100% compatível com os SDKs oficiais da
            OpenAI e com o AI SDK da Vercel — basta trocar a <InlineCode>baseURL</InlineCode>.
          </Body>
          <div className="mt-4">
            <CodeBlock
              tabs={[
                {
                  label: "ai sdk",
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
                  code: `import OpenAI from "openai"

const client = new OpenAI({
  baseURL: "https://api.nylla.ai/v1",
  apiKey: process.env.NYLLA_API_KEY,
})`,
                },
                {
                  label: "openai python",
                  code: `from openai import OpenAI

client = OpenAI(
    base_url="https://api.nylla.ai/v1",
    api_key=os.environ["NYLLA_API_KEY"],
)`,
                },
                {
                  label: "langchain",
                  code: `from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    base_url="https://api.nylla.ai/v1",
    api_key=os.environ["NYLLA_API_KEY"],
    model="nylla/auto",
)`,
                },
              ]}
            />
          </div>
        </section>

        {/* ============================= HARNESSES ============================= */}
        <section id="harnesses">
          <SectionHeading>Harnesses</SectionHeading>
          <Body>
            O CLI configura ferramentas de código automaticamente. O flag <InlineCode>--harness</InlineCode>{" "}
            aceita os seguintes valores:
          </Body>
          <div className="mt-6 overflow-x-auto border border-border">
            <table className="w-full min-w-[480px]">
              <caption className="sr-only">Harnesses suportados</caption>
              <thead>
                <tr className="type-eyebrow border-b border-border bg-card text-left text-subtle-foreground">
                  <th className="px-4 py-3 font-medium">harness</th>
                  <th className="px-4 py-3 font-medium">valor</th>
                  <th className="px-4 py-3 font-medium">status</th>
                </tr>
              </thead>
              <tbody className="type-label text-foreground">
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
                  <tr key={value} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-2.5">{name}</td>
                    <td className="px-4 py-2.5">
                      <code className="type-code text-muted-foreground">{value}</code>
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`type-micro ${status === "beta" ? "text-primary" : "text-muted-foreground"}`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <CodeBlock
              title="exemplos"
              code={`nylla connect --harness claude-code
nylla connect --harness cursor
nylla models set-default anthropic/claude-sonnet-4.5
nylla usage`}
            />
          </div>
        </section>

        {/* ============================ CONFIGURAÇÃO ============================ */}
        <section id="configuracao">
          <SectionHeading>Configuração</SectionHeading>
          <Body>
            O arquivo <InlineCode>~/.nylla/nylla.json</InlineCode> controla o comportamento local do CLI e os
            padrões enviados ao gateway:
          </Body>
          <div className="mt-4">
            <CodeBlock
              title="~/.nylla/nylla.json"
              code={`{
  "defaultModel": "nylla/auto",
  "routing": {
    "strategy": "latency",
    "fallbacks": ["anthropic/claude-sonnet-4.5", "openai/gpt-5-mini"]
  },
  "frontier": {
    "enabled": true,
    "monthlyBudget": "auto"
  },
  "cache": {
    "enabled": true,
    "ttlSeconds": 3600
  },
  "telemetry": false
}`}
            />
          </div>

          <SubHeading>Variáveis de ambiente</SubHeading>
          <div className="mt-4">
            <ParamTable
              caption="Variáveis de ambiente suportadas"
              params={[
                { name: "NYLLA_API_KEY", type: "string", required: true, desc: "Chave de autenticação. Tem precedência sobre a chave salva pelo CLI." },
                { name: "NYLLA_BASE_URL", type: "string", desc: "Sobrescreve a base URL (útil para proxies self-hosted)." },
                { name: "NYLLA_DEFAULT_MODEL", type: "string", desc: "Modelo padrão quando o corpo não especifica." },
                { name: "NYLLA_TIMEOUT_MS", type: "integer", desc: "Timeout por requisição antes de acionar fallback. Padrão: 30000." },
              ]}
            />
          </div>

          <div className="mt-16 border border-border bg-card p-6 md:p-8">
            <div className="type-eyebrow text-primary">pronto para começar?</div>
            <p className="type-body mt-3 max-w-xl text-muted-foreground">
              Conecte seu harness em menos de um minuto — o CLI detecta a ferramenta instalada e configura o
              gateway automaticamente.
            </p>
            <div className="mt-5">
              <CopyCommand command="npx nylla connect" runners={false} />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
