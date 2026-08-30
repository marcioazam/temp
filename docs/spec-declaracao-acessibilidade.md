# Spec : Declaração de Acessibilidade (Nylla)

Rota: `/acessibilidade`. Padrão visual idêntico a `/privacidade` e `/termos`
(navbar/footer globais, coluna `max-w-2xl` centrada, títulos mono, prosa +
linhas rótulo → valor). SOTA 2026, minimalista.

## Pesquisa / enquadramento

- **LBI (Lei 13.146/2015)**: torna a acessibilidade digital obrigatória para
  sites de empresas com sede/representação no Brasil (arts. 63 e 53).
- **ABNT NBR 17225 (2024)**: norma nacional de acessibilidade digital; adota
  WCAG 2.2 como base técnica. Conformidade com a norma ≈ nível **AA / WCAG 2.2**.
- **eMAG**: modelo do governo federal, referência complementar.
- **Internacional**: EN 301 549 e o European Accessibility Act (vigente desde
  28/06/2025) exigem uma *accessibility statement* com componentes definidos.
- **Modelo W3C de accessibility statement** : componentes esperados:
  1. Compromisso com acessibilidade.
  2. Status de conformidade (total / parcial / não conforme) + norma aplicada.
  3. Conteúdo conhecido como não acessível (barreiras).
  4. Recursos de acessibilidade oferecidos.
  5. Compatibilidade (navegadores, leitores de tela).
  6. Limitações técnicas conhecidas.
  7. Canal de feedback + prazo de resposta.
  8. Método de avaliação (auto-avaliação, auditoria externa, ferramentas).
  9. Datas de preparação e revisão.
  10. Procedimento de execução/escalonamento (ex.: reclamação à autoridade).

## Decisões de conteúdo

- **Meta declarada**: WCAG 2.2 nível AA / NBR 17225 : status **parcialmente
  conforme** (postura honesta e defensável; declarar "totalmente conforme" sem
  auditoria é arriscado).
- **Recursos**: HTML semântico, navegação por teclado, foco visível, contraste
  do tema, texto redimensionável, `prefers-reduced-motion` respeitado, textos
  alternativos, seletor de idioma PT/EN.
- **Barreiras conhecidas**: diagramas/ilustrações técnicas sem descrição longa;
  trechos de saída de IA que fogem ao nosso controle; dependência de conteúdo
  de terceiros (provedores de modelo).
- **Feedback**: e-mail dedicado, prazo alvo de resposta em até 10 dias úteis.
- **Avaliação**: auto-avaliação contínua + ferramentas automatizadas; auditoria
  externa formal ainda pendente (declarar como planejada).
- **Escalonamento**: menção à ANPD/Poder Judiciário e órgãos de defesa do
  consumidor caso o retorno não seja satisfatório.

## Seções da página

1. Introdução / compromisso
2. Status de conformidade (Row: norma, nível, status, base)
3. Recursos de acessibilidade
4. Limitações conhecidas
5. Compatibilidade (navegadores + tecnologias assistivas)
6. Como avaliamos (método + datas)
7. Feedback e contato (canal + prazo)
8. Se não resolvermos (escalonamento)
9. Voltar ao início

## Pendências jurídicas (placeholder)

- Confirmar e-mail de acessibilidade (`acessibilidade@nylla.dev`).
- Data de auditoria externa quando realizada → atualizar status para AA total.
- Nome/registro do responsável, se exigido internamente.

## Constantes compartilhadas

Reutilizar `CONSENT_VERSION` de `lib/consent.ts` para versionar o documento,
como nas páginas de privacidade e termos.
