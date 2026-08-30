# Spec : Termos de Uso (`/termos`)

Documento de pesquisa e requisitos que fundamenta a página `/termos`. Companheiro de
`spec-aviso-privacidade.md`: aquele trata de **dados pessoais** (LGPD), este trata do
**contrato** entre a Nylla e o usuário.

## 1. Enquadramento legal

Nenhuma lei brasileira exige um documento intitulado "Termos de Uso". A obrigatoriedade
é prática: sem ele não há contrato escrito, não há base para suspender conta por abuso e
não há limitação de responsabilidade oponível.

| Norma | O que impõe |
| --- | --- |
| Código Civil, arts. 421 e 423 | Contrato de adesão: cláusulas ambíguas são interpretadas contra quem redigiu. Escrever claro é defesa. |
| CDC, art. 46 | Só obriga o consumidor se ele tiver tido oportunidade real de conhecer o conteúdo. Daí clickwrap, não browsewrap. |
| CDC, art. 51 | São **nulas** cláusulas que exonerem responsabilidade por vício/defeito em relação de consumo. A limitação vale no B2B; no B2C precisa de ressalva. |
| CDC, art. 101, I | Consumidor pode acionar no foro do próprio domicílio : eleição de foro não pode afastar isso. |
| Marco Civil, art. 15 | Guarda de registros de acesso por 6 meses. |
| Marco Civil, art. 19 | Remoção de conteúdo de terceiro em regra depende de ordem judicial. |
| LGPD | Fica no aviso de privacidade. Termos apenas remetem, não repetem. |

Consequência de desenho: a Nylla é vendida a desenvolvedores e empresas (B2B), mas um
autônomo pessoa física pode assinar. Por isso toda cláusula limitativa carrega ressalva
expressa de que não se aplica quando o CDC incidir.

## 2. Riscos específicos de um gateway de LLM

O que diferencia estes termos de um SaaS comum:

1. **Cadeia de provedores.** A requisição do usuário é encaminhada a OpenAI, Anthropic,
   Google, xAI, DeepSeek e outros. Os termos desses provedores (*Provider Terms*)
   governam retenção, uso do conteúdo e direitos sobre a saída. O usuário precisa aceitar
   ficar vinculado a eles : sem isso a Nylla assume risco alheio.
2. **Saída não confiável.** Modelos alucinam. Precisa de isenção explícita e dever de
   revisão humana antes de uso em produção, código ou decisão relevante.
3. **Propriedade da saída.** No Brasil, obra gerada por máquina sem autor humano tende a
   não ter proteção autoral. Não se pode prometer titularidade; o correto é: entrada é do
   usuário, saída segue os termos do provedor, e saídas idênticas podem ir para outros.
4. **Uso aceitável em duas camadas.** Além do que a Nylla proíbe, valem as políticas de
   uso de cada provedor. Contornar filtros de segurança do modelo via gateway é violação.
5. **Roteamento automático.** O modelo efetivamente usado pode variar por
   disponibilidade/latência. Precisa estar contratado, senão é descumprimento.
6. **Cobrança por consumo.** Tokens são medidos pela telemetria da Nylla; é preciso dizer
   que ela é a fonte de verdade e como contestar.
7. **Rate limit e suspensão.** Necessário para conter abuso sem virar quebra de contrato.

## 3. Estrutura da página (13 seções)

Ordem escolhida: primeiro o que o usuário mais procura (o que é, o que pode/não pode),
depois dinheiro, depois risco, por último processual.

1. **Aceite** : adesão por uso ou criação de conta; capacidade civil; poderes para
   representar a empresa; declaração de leitura (art. 46 do CDC).
2. **O serviço** : endpoint único, roteamento entre modelos, natureza de intermediário.
3. **Conta e credenciais** : dados verdadeiros, sigilo da chave de API, responsabilidade
   pelo tráfego da chave, 18+.
4. **Uso aceitável** : lista fechada de proibições + submissão às políticas dos
   provedores.
5. **Provedores de modelo** : repasse dos Provider Terms, roteamento variável,
   indisponibilidade de terceiro não é falha da Nylla.
6. **Conteúdo e saída** : entrada é do usuário; licença limitada e temporária apenas para
   executar a requisição; saída sujeita ao provedor; sem exclusividade; dever de revisão.
7. **Sem garantia sobre resultados de IA** : "no estado em que se encontra" quanto à
   exatidão; não substitui aconselhamento profissional; proibido uso como decisão final
   automatizada em saúde, jurídico, financeiro ou segurança sem supervisão.
8. **Planos, medição e cobrança** : pré-pago/assinatura, telemetria como fonte de
   medição, prazo de contestação, reajuste com aviso, tributos.
9. **Disponibilidade e suporte** : sem SLA no plano gratuito; manutenção programada;
   janela de degradação por provedor externo.
10. **Propriedade intelectual da Nylla** : marca, software, docs; licença de uso não
    exclusiva; proibido engenharia reversa e revenda como serviço concorrente.
11. **Suspensão e rescisão** : por abuso, inadimplência ou ordem legal; rescisão pelo
    usuário a qualquer tempo; efeitos (30 dias para eliminação, remissão ao aviso de
    privacidade).
12. **Limitação de responsabilidade** : teto no valor pago nos 12 meses anteriores;
    exclusão de lucros cessantes e danos indiretos; **ressalvas obrigatórias**: dolo,
    culpa grave, dano a dados pessoais e direitos indisponíveis do consumidor.
13. **Alterações, lei e foro** : aviso prévio de 30 dias para mudança relevante; lei
    brasileira; foro da comarca da sede, com ressalva do art. 101, I do CDC.

## 4. Decisões de conteúdo

- **Prompts não são retidos.** Já afirmado no aviso de privacidade; os termos repetem
  como obrigação contratual para que seja exigível, não só informativo.
- **Sem SLA numérico.** Prometer 99,9% sem medição publicada cria passivo. Ficou
  "melhores esforços" + previsão de crédito quando o plano contratado tiver SLA próprio.
- **Sem cláusula de arbitragem.** Em relação de consumo, arbitragem compulsória é nula
  (CDC, art. 51, VII). Não vale o risco.
- **Sem indenização ampla do usuário.** Mantida apenas para violação de uso aceitável e
  reclamação de terceiro por conteúdo enviado : o resto seria abusivo no B2C.
- **Prazos concretos** (30 dias de aviso, 30 dias de eliminação, 12 meses de teto) em vez
  de "prazo razoável", que é ambíguo contra o redator (art. 423 do CC).

## 5. Consistência com o resto do produto

- Versão e data vivem em constantes no topo do arquivo da página.
- Contato jurídico separado do canal do encarregado: `juridico@nylla.dev` aqui,
  `privacidade@nylla.dev` no aviso.
- A seção de dados **não descreve tratamento**; apenas remete a `/privacidade`, para não
  criar duas fontes de verdade que divergem na próxima revisão.
- Link recíproco: `/termos` aponta para `/privacidade` e vice-versa, ambos no rodapé.

## 6. Forma e acessibilidade

- Mesmo padrão visual do aviso de privacidade: coluna centrada `max-w-2xl` dentro do
  shell da navbar (`max-w-screen-2xl`, `px-4 / md:px-9`), dois níveis de hierarquia,
  títulos em mono, sem tabelas com bordas nem numeração decorativa.
- Navbar e rodapé vêm do layout global.
- Proibições e cláusulas em prosa ou linhas rótulo → valor (`<dl>`), o que preserva
  semântica para leitor de tela sem custo visual.

## 7. Pendências para o jurídico

Estes campos são placeholders e precisam de confirmação antes de publicar:

- Razão social, CNPJ e endereço completo da Nylla.
- Comarca do foro eleito.
- Se haverá SLA contratual com crédito e em quais planos.
- Prazo real de contestação de fatura (adotado: 30 dias).
- Confirmar se algum provedor exige repasse de cláusula específica adicional.
