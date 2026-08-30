# Spec : Política de Cookies

Documento de pesquisa e decisões para `/politica-de-cookies`.

## 1. Por que existe uma página dedicada

A LGPD não exige documento separado de cookies : bastaria a seção dentro do aviso de
privacidade. A página dedicada foi criada por decisão de produto, para o padrão
GDPR/ePrivacy, que trata a política de cookies como documento **autônomo e acessível**,
com inventário nominal completo.

## 2. Requisitos de conteúdo (GDPR + Diretiva ePrivacy)

Por cookie, seis campos obrigatórios:

| Campo | Aplicação na Nylla |
| --- | --- |
| Nome | Nome técnico exato (`nylla_consent`) |
| Provedor | Quem grava : primária (Nylla) ou terceiro nomeado |
| Finalidade | Linguagem simples, sem jargão |
| Categoria | Necessário · Análise · Marketing (idênticas ao banner) |
| Duração | Prazo exato de expiração |
| Origem | Primária ou terceira |

Complementos obrigatórios: base legal por categoria, como retirar o consentimento,
data de última atualização, e **paridade exata** entre as categorias da política e as
do banner.

## 3. Requisitos brasileiros (LGPD)

- Art. 9º : informação clara sobre finalidade e forma do tratamento.
- Art. 8º, §1º : prova do consentimento (versão, data/hora, método, categorias).
- Art. 8º, §5º : revogação por procedimento gratuito e facilitado.
- Marco Civil, art. 15 : registros de acesso guardados 6 meses (não é cookie, mas é
  citado para diferenciar do inventário de cookies).

## 4. Inventário real (auditado no código)

Fonte da verdade: `lib/consent.ts`.

| Nome | Tipo | Categoria | Duração | Origem |
| --- | --- | --- | --- | --- |
| `nylla_consent` | Cookie | Necessário | 180 dias | Primária |
| `nylla-consent` | localStorage | Necessário | Até limpeza manual | Primária |
| `nylla-language` | localStorage | Necessário | Até limpeza manual | Primária |

Não há cookies de análise nem de marketing gravados hoje:

- **Vercel Web Analytics é cookieless.** Identifica visitas por hash derivado da
  requisição, com reset diário; não grava identificador no dispositivo. Ainda assim
  permanece atrás do consentimento, porque processa dado potencialmente pessoal
  (hash derivado de IP) e não traz checagem de consentimento embutida.
- **Marketing: nenhuma tecnologia ativa.** A categoria existe no banner para uso
  futuro e é declarada como vazia.

Decisão: declarar a ausência explicitamente. Uma política que lista cookies
inexistentes é tão irregular quanto uma que omite cookies reais.

## 5. Tecnologias similares

A Diretiva ePrivacy cobre "cookies e tecnologias similares". Por isso `localStorage`
entra no inventário com a mesma estrutura de campos, e não como nota de rodapé.

## 6. Decisões de UI

- Mesmo padrão das páginas legais: navbar/footer globais, coluna `max-w-2xl`
  centrada, títulos `type-label` em mono, sem tabela com bordas.
- Cada entrada do inventário é um bloco: nome em mono → finalidade → metadados
  (`Origem · Categoria · Duração`) em `type-micro`. Cobre os seis campos sem
  o peso visual de uma tabela.
- Categorias renderizadas a partir de `CONSENT_CATEGORIES` e prazos a partir de
  `CONSENT_MAX_AGE_DAYS` / `CONSENT_VERSION`, garantindo a paridade exigida entre
  política e banner por construção : não por revisão manual.
- Botão de preferências reutiliza `CookiePreferencesButton`, cumprindo a revogação
  facilitada no próprio documento.

## 7. Pendências jurídicas

- Revisar a política quando qualquer script de terceiro for adicionado : a entrada
  correspondente deve ser criada **antes** do deploy.
- Se um provedor de marketing entrar, atualizar categoria, inventário e a seção de
  transferência internacional.
