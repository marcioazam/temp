import { Reveal } from "@/components/reveal"

const questions = [
  {
    question: "O que é a Nylla?",
    answer:
      "A Nylla é um gateway único para usar diferentes modelos de IA nos seus harnesses de programação. Você conecta uma vez e troca de modelo sem refazer sua configuração.",
  },
  {
    question: "Quais ferramentas posso conectar?",
    answer:
      "Claude Code, Codex, Cursor, Hermes Agent, VS Code e OpenCode já fazem parte da integração. Novos harnesses entram conforme o ecossistema evolui.",
  },
  {
    question: "O acesso aos modelos é realmente ilimitado?",
    answer:
      "Os modelos padrão do catálogo têm uso ilimitado dentro da política de uso justo. Modelos frontier usam os créditos mensais incluídos no seu plano.",
  },
  {
    question: "Posso trocar de modelo durante um projeto?",
    answer:
      "Sim. O endpoint continua o mesmo: você escolhe outro modelo sem trocar chaves, SDKs ou a configuração do harness.",
  },
  {
    question: "Meus prompts são usados para treinar modelos?",
    answer:
      "Não. A Nylla encaminha suas requisições aos provedores e não usa prompts ou respostas para treinar modelos próprios, exceto se o usuário permitir.",
  },
  {
    question: "Como faço a instalação?",
    answer:
      "Instale o pacote com npm i -g nylla e rode npx nylla connect. O CLI detecta seu ambiente e o harness instalado, aponta o gateway e valida sua chave sem edição manual de arquivos.",
  },
  {
    question: "O que são créditos frontier e o que acontece quando acabam?",
    answer:
      "Créditos frontier cobrem os modelos de ponta e são renovados a cada mês: dev inclui US$5 e pro US$25. Ao esgotar, os modelos padrão seguem ilimitados e você pode comprar créditos extras sob demanda.",
  },
  {
    question: "Qual a diferença entre os planos dev, pro e team?",
    answer:
      "O dev cobre um harness para uso individual, o pro libera harnesses ilimitados com políticas de roteamento avançadas e suporte prioritário, e o team adiciona créditos compartilhados, gestão central de chaves, analytics por membro e SSO.",
  },
  {
    question: "Posso cancelar ou trocar de plano quando quiser?",
    answer:
      "Sim. A assinatura é mensal e sem fidelidade: você faz upgrade, downgrade ou cancelamento a qualquer momento, e a mudança vale a partir do ciclo seguinte.",
  },
]

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="mx-auto w-full max-w-screen-2xl px-4 md:px-9"
    >
      <div className="grid w-full lg:grid-cols-[minmax(16rem,0.65fr)_minmax(0,1.35fr)]">
        <div className="bg-background px-4 py-16 md:px-9 md:py-24 lg:pr-12">
          <Reveal className="lg:sticky lg:top-24">
            <h2 id="faq-title" className="type-eyebrow text-muted-foreground">
              <span aria-hidden="true" className="mr-1 text-primary">
                {"//"}
              </span>
              faq
            </h2>
            <p className="type-heading mt-6 max-w-xl text-balance text-foreground">
              Perguntas frequentes.
            </p>
            <p className="type-lead mt-5 max-w-xl text-pretty text-muted-foreground">
              Tudo o que você precisa saber antes de conectar seu primeiro harness à Nylla.
            </p>
            <p className="type-small mt-7 max-w-xs text-pretty text-subtle-foreground">
              Não encontrou sua resposta?{" "}
              <a
                href="/docs"
                className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                Consulte a documentação
              </a>
              <span className="text-foreground">.</span>
            </p>
          </Reveal>
        </div>

        <div className="bg-[url('/images/faq-landscape.png')] bg-cover bg-center px-4 py-16 md:px-9 md:py-24">
          <div className="grid gap-3">
            {questions.map((item, index) => (
              <Reveal key={item.question} delay={index * 70}>
                <details className="group border border-border/70 bg-background/85 transition-colors duration-300 hover:border-primary/40 open:border-primary/40">
                  <summary className="flex cursor-pointer list-none items-start gap-2.5 p-5 marker:content-none md:p-6">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-primary transition-transform duration-300 ease-out group-open:scale-110"
                    />
                    <h3 className="type-subheading flex-1 text-pretty text-foreground transition-colors duration-300 group-hover:text-primary group-open:text-primary">
                      {item.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="relative mt-0.5 size-3.5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45 group-open:text-primary"
                    >
                      <span className="absolute left-0 top-1/2 h-px w-3.5 bg-current" />
                      <span className="absolute left-1/2 top-0 h-3.5 w-px bg-current" />
                    </span>
                  </summary>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-open:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="type-body max-w-2xl px-5 pb-5 pl-[2.1rem] text-muted-foreground md:px-6 md:pb-6 md:pl-[2.35rem]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
