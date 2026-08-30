# Spec : Aviso de Privacidade e Cookies (`/privacidade`)

Documento de referência para a página pública de privacidade da Nylla.
Base: LGPD (Lei 13.709/2018), regulamentos da ANPD e práticas de _privacy UX_ 2026.

---

## 1. Pesquisa : o que a lei exige

### 1.1 Conteúdo mínimo obrigatório

A LGPD não define um "modelo" de política, mas os arts. 9º e 18 combinados
determinam que o titular tenha acesso facilitado, em **linguagem clara, adequada e
ostensiva**, às seguintes informações:

| # | Informação exigida | Fundamento |
|---|---|---|
| 1 | Finalidade específica do tratamento | art. 9º, I |
| 2 | Forma e duração do tratamento | art. 9º, II |
| 3 | Identificação e contato do controlador | art. 9º, III |
| 4 | Informação sobre uso compartilhado e sua finalidade | art. 9º, IV |
| 5 | Responsabilidades dos agentes de tratamento | art. 9º, V |
| 6 | Direitos do titular (lista do art. 18) | art. 9º, VI |
| 7 | Base legal de cada finalidade | arts. 7º e 11 |
| 8 | Identidade e contato do encarregado (DPO) | art. 41, §1º |
| 9 | Transferência internacional e seu mecanismo | art. 33 |
| 10 | Direito de revisão de decisões automatizadas | art. 20 |
| 11 | Tratamento de dados de crianças e adolescentes | art. 14 |
| 12 | Medidas de segurança e resposta a incidentes | arts. 46 a 48 |
| 13 | Data da última atualização / versionamento | art. 9º (clareza) |
| 14 | Canal de reclamação à ANPD | art. 18, §1º |

Regras de acesso: o documento **não pode exigir login**, não pode estar atrás de
paywall e deve ser alcançável do rodapé de todas as páginas.

### 1.2 Consentimento e cookies

- **Opt-in real** (arts. 7º, I e 8º): cookies não necessários só disparam após ação
  afirmativa. Nada pré-marcado.
- **Granularidade por finalidade** (art. 9º, II): cada categoria decidida em separado.
- **Revogação facilitada** (art. 8º, §5º): procedimento gratuito e tão simples quanto
  o de concessão : daí o botão de preferências no rodapé e nesta página.
- **Prova de consentimento** (art. 8º, §1º): guardar versão do aviso, timestamp,
  método e categorias.
- **Simetria de escolha**: "Recusar" e "Aceitar" com o mesmo peso visual. Cookie wall
  e _dark patterns_ são reprovados pela ANPD.
- **Validade limitada**: renovação do consentimento a cada 180 dias e re-prompt quando
  a versão do aviso muda.

### 1.3 Transferência internacional (ponto crítico 2025/2026)

A **Resolução CD/ANPD nº 19/2024** (publicada em 23/08/2024) aprovou as
cláusulas-padrão contratuais e deu 12 meses de adequação : prazo encerrado em
**23/08/2025**. Desde então, toda transferência internacional exige:

- cláusulas-padrão contratuais da ANPD, **ou**
- cláusulas específicas / normas corporativas globais aprovadas pela ANPD, **ou**
- decisão de adequação do país de destino, **ou**
- outra hipótese do art. 33.

Consequência para a página: é preciso **nomear os destinos** e **declarar o
mecanismo** usado. Um gateway de LLM roteia para provedores nos EUA e na UE, logo
essa seção é obrigatória e não decorativa.

### 1.4 Especificidades de um gateway de LLM

Riscos que uma política genérica não cobre e que precisam de seção própria:

- **Conteúdo de prompt/completion**: declarar retenção zero por padrão, ausência de
  uso para treinamento e o que ocorre quando o cliente ativa logs.
- **Metadados de roteamento**: contagem de tokens, latência, modelo escolhido e código
  de erro : dados de faturamento e operação, não conteúdo.
- **Subprocessadores**: provedores de modelo são operadores; a lista precisa ser
  pública e versionada.
- **Decisão automatizada** (art. 20): o roteamento é automatizado; declarar que não
  produz efeitos jurídicos sobre o titular e garantir o pedido de revisão.

### 1.5 Prazos operacionais

| Evento | Prazo |
|---|---|
| Resposta a pedido do titular | 15 dias (art. 19, II) |
| Comunicação de incidente à ANPD e ao titular | prazo razoável / conforme regulamento (art. 48) |
| Renovação do consentimento de cookies | 180 dias (política interna) |
| Retenção de metadados fiscais | 5 anos (obrigação legal) |

---

## 2. Arquitetura da informação

Padrão de **aviso em camadas** (_layered notice_) : o SOTA para políticas legíveis:

1. **Camada 1 : Resumo em uma tela.** Quatro afirmações de impacto: não treinamos com
   seus prompts, retenção zero por padrão, nenhum cookie antes do consentimento,
   revogação em um clique.
2. **Camada 2 : Seções navegáveis.** Índice fixo (sticky) à esquerda, conteúdo à
   direita em coluna de leitura.
3. **Camada 3 : Tabelas de detalhe.** Finalidades × base legal, subprocessadores ×
   país × mecanismo, cookies × categoria × validade.

Ordem das seções:

1. Controlador e encarregado
2. Dados que tratamos
3. Finalidades e bases legais
4. Prompts e conteúdo de inferência
5. Cookies e consentimento
6. Compartilhamento e subprocessadores
7. Transferência internacional
8. Retenção e eliminação
9. Segurança e incidentes
10. Decisões automatizadas
11. Crianças e adolescentes
12. Seus direitos e como exercer
13. Alterações e histórico de versões

---

## 3. Diretrizes de design (SOTA 2026, minimalista)

- **Shell do site**: `SiteHeader` + `SiteFooter`, mesmo container
  (`max-w-screen-2xl`, gutters `px-4 / md:px-9`) usado no restante do produto.
- **Coluna de leitura** de aproximadamente 68 caracteres; índice fixo em `md:`+,
  colapsado no mobile.
- **Zero raio de borda**, hairlines em `border-border`, sem sombras : coerente com o
  banner de cookies e o restante do site.
- **Tipografia**: dois níveis apenas (`type-title/heading/label` para estrutura,
  `type-body/caption/micro` para texto). Eyebrows em mono.
- **Cor**: âmbar (`--primary`) exclusivamente como acento de estado e numeração de
  seção; nunca em blocos grandes.
- **Sem ilustrações decorativas.** Densidade informacional é o elemento de design.
- **Elemento de assinatura**: a numeração monoespaçada das seções alinhada às
  hairlines, criando o ritmo vertical da página.
- **Acessibilidade**: `main` semântico, hierarquia h1→h2, `nav` rotulada para o
  índice, tabelas com `th scope`, foco visível, alvos de 44 px no mobile.

---

## 4. Fontes de verdade no código

| Dado | Origem |
|---|---|
| Categorias de cookies | `CONSENT_CATEGORIES` em `lib/consent.ts` |
| Versão do aviso | `CONSENT_VERSION` |
| Validade do consentimento | `CONSENT_MAX_AGE_DAYS` |
| Reabrir preferências | `CookiePreferencesButton` |

A página **não** deve duplicar essas listas : importa de `lib/consent.ts` para que
banner e aviso nunca divirjam.

---

## 5. Pendências para o jurídico

Antes de publicar, substituir os marcadores abaixo por dados registrais reais:

- Razão social completa, CNPJ e endereço do controlador.
- Nome do encarregado (a LGPD exige identidade, não só e-mail).
- Lista final de subprocessadores, com país e mecanismo de transferência conferidos.
- Confirmação de que as cláusulas-padrão da ANPD estão assinadas com cada operador
  internacional.
