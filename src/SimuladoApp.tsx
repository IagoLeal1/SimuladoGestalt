// src/SimuladoApp.tsx

import React, { useState } from 'react';
import './SimuladoApp.css'; // Importa os estilos CSS
import type { Pergunta } from './types'; // CORRIGIDO: Agora usa 'import type' para importação de tipo

// Função auxiliar para embaralhar um array (algoritmo de Fisher-Yates)
const shuffleArray = (array: Pergunta[]): Pergunta[] => {
  const newArray = [...array]; // Cria uma cópia rasa para não modificar o array original
  let currentIndex = newArray.length, randomIndex;

  // Enquanto houver elementos para embaralhar.
  while (currentIndex !== 0) {
    // Escolhe um elemento restante.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // E o troca com o elemento atual.
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex], newArray[currentIndex]];
  }

  return newArray;
};

// --- Questões de Gestalt-terapia hardcoded dos seus PDFs ---
const initialPerguntas: Pergunta[] = [ // Adicionado tipagem Pergunta[]
  // Do PDF: Novas_Questões_Objetivas_sobre_Gestalt-terapia_(Es.pdf
  {
    id: 'es-q16',
    questao: "No contexto da Gestalt-terapia, a interrupção do contato conhecida como introjeção se manifesta quando o indivíduo:",
    opcoes: [
      "a) Atribui a outros sentimentos ou características que são, na verdade, seus próprios e que ele não consegue aceitar.",
      "b) Volta contra si mesmo uma ação ou sentimento que originalmente seria direcionado ao ambiente.",
      "c) Assimila de forma acrítica normas, valores e crenças externas, sem um processo de avaliação pessoal.",
      "d) Evita o contato pleno, retirando-se da situação antes que a excitação atinja seu ponto máximo.",
      "e) Funde-se com o ambiente ou com o outro, perdendo a capacidade de diferenciar suas próprias necessidades."
    ],
    respostaCorreta: "c"
  },
  {
    id: 'es-q17',
    questao: "Um cliente em terapia gestaltista, ao ser convidado a expressar sua frustração diretamente ao terapeuta, começa a roer as unhas e a balançar as pernas incessantemente. Essa manifestação pode ser interpretada como um exemplo de:",
    opcoes: [
      "a) Projeção.",
      "b) Confluência.",
      "c) Egotismo.",
      "d) Retroflexão.",
      "e) Introjeção."
    ],
    respostaCorreta: "d"
  },
  {
    id: 'es-q18',
    questao: "Sobre as fases do ciclo de contato na Gestalt-terapia, é CORRETO afirmar que:",
    opcoes: [
      "a) A fase de pré-contato é o momento de maior excitação e engajamento com o ambiente, onde a necessidade é plenamente satisfeita.",
      "b) O contato pleno é o estágio em que o organismo se retrai do ambiente, assimilando a experiência e se preparando para novas necessidades.",
      "c) A fase de ação é onde a figura se dissolve e o indivíduo retorna a um estado de equilíbrio, sem resíduos da experiência anterior.",
      "d) O pós-contato é crucial para a assimilação da experiência e para a integração do que foi aprendido no ciclo.",
      "e) As interrupções no ciclo de contato são sempre patológicas e impedem qualquer tipo de crescimento ou aprendizado."
    ],
    respostaCorreta: "d"
  },
  {
    id: 'es-q19',
    questao: "Na Gestalt-terapia, a fronteira de contato é um conceito dinâmico e essencial para a compreensão da relação entre o indivíduo e o ambiente. Qual das alternativas abaixo MELHOR descreve a função da fronteira de contato?",
    opcoes: [
      "a) Separar rigidamente o indivíduo do ambiente, impedindo qualquer tipo de troca ou interação.",
      "b) Ser o local onde o indivíduo se encontra com o ambiente, permitindo a diferenciação e a conexão simultaneamente.",
      "c) Atuar como um filtro que impede a entrada de qualquer estímulo externo que possa causar desconforto.",
      "d) Ser uma barreira fixa que protege o indivíduo de influências externas indesejadas.",
      "e) Representar a fusão completa entre o indivíduo e o ambiente, sem distinção de limites."
    ],
    respostaCorreta: "b"
  },
  {
    id: 'es-q20',
    questao: "Um terapeuta gestaltista observa que seu cliente frequentemente muda de assunto quando o tema se torna emocionalmente carregado, desviando a conversa para trivialidades. Essa estratégia do cliente, na perspectiva da Gestalt-terapia, pode ser um indicativo de:",
    opcoes: [
      "a) Projeção, pois o cliente está atribuindo ao terapeuta a responsabilidade por suas emoções.",
      "b) Egotismo, caracterizado pela manipulação do ambiente para evitar o contato autêntico.",
      "c) Confluência, onde o cliente se funde com as expectativas do terapeuta para evitar o confronto.",
      "d) Desensibilização, um mecanismo de defesa que impede o cliente de sentir emoções intensas.",
      "e) Bloqueio no ciclo de contato, especificamente na fase de contato, impedindo a plena experiência da emoção."
    ],
    respostaCorreta: "e"
  },
  {
    id: 'es-q21',
    questao: "Na Gestalt-terapia, o conceito de campo é essencial para compreender a totalidade da experiência do indivíduo. Sobre o campo fenomenológico, é CORRETO afirmar que:",
    opcoes: [
      "a) É uma entidade estática e predeterminada, que define rigidamente o comportamento do indivíduo.",
      "b) Refere-se exclusivamente ao ambiente físico em que o indivíduo se encontra, desconsiderando aspectos psicológicos.",
      "c) É uma teia de relações dinâmicas entre o organismo e o ambiente, onde cada parte influencia e é influenciada pelas demais.",
      "d) É sinônimo de inconsciente coletivo, contendo arquétipos e símbolos universais.",
      "e) Sua compreensão é secundária, sendo o foco principal da terapia a análise das experiências passadas do cliente."
    ],
    respostaCorreta: "c"
  },
  {
    id: 'es-q22',
    questao: "Um cliente em sessão de Gestalt-terapia relata que se sente \"preso\" em um relacionamento, apesar de reconhecer que ele não é saudável. Ele descreve o parceiro como \"muito dependente\" e a si mesmo como \"incapaz de deixá-lo\". Sob a ótica da relação figura-fundo no campo fenomenológico, qual a melhor interpretação para essa situação?",
    opcoes: [
      "a) A figura do \"relacionamento saudável\" ainda não emergiu do fundo, impedindo a ação do cliente.",
      "b) A figura do \"parceiro dependente\" está se tornando o fundo, e a figura da \"incapacidade de deixar\" é a figura emergente.",
      "c) A figura do \"relacionamento atual\" está se mantendo como figura dominante, impedindo a emergência de novas possibilidades.",
      "d) O cliente está em um estado de confluência com o parceiro, dificultando a diferenciação das figuras.",
      "e) A relação figura-fundo está invertida, com o fundo (o relacionamento) dominando a figura (o cliente)."
    ],
    respostaCorreta: "c"
  },
  {
    id: 'es-q23',
    questao: "O ajustamento criativo na Gestalt-terapia é um processo contínuo de adaptação e inovação. Qual das alternativas abaixo MELHOR descreve o ajustamento criativo?",
    opcoes: [
      "a) A capacidade de o indivíduo se conformar às expectativas sociais, mesmo que isso signifique reprimir suas próprias necessidades.",
      "b) A habilidade de encontrar soluções rígidas e padronizadas para os problemas, garantindo a estabilidade do sistema.",
      "c) O processo pelo qual o organismo se adapta ao ambiente de forma flexível e inovadora, mantendo sua integridade e promovendo o crescimento.",
      "d) A tendência de o indivíduo evitar qualquer tipo de mudança, buscando manter o status quo a todo custo.",
      "e) A manifestação de comportamentos impulsivos e desorganizados, sem qualquer planejamento ou reflexão."
    ],
    respostaCorreta: "c"
  },
  {
    id: 'es-q24',
    questao: "Considere a seguinte situação: Um artista, ao enfrentar um bloqueio criativo, decide experimentar novas técnicas e materiais, mesmo sem ter certeza do resultado. Ele se permite \"brincar\" com as possibilidades, sem a pressão de produzir uma obra-prima imediatamente. Essa atitude do artista é um exemplo de:",
    opcoes: [
      "a) Introjeção, pois ele está absorvendo novas ideias sem questionamento.",
      "b) Retroflexão, pois ele está voltando sua energia criativa contra si mesmo.",
      "c) Ajustamento criativo, pois ele está explorando novas formas de lidar com o desafio e de se expressar.",
      "d) Confluência, pois ele está se fundindo com as expectativas do mercado de arte.",
      "e) Egotismo, pois ele está buscando a perfeição em sua arte, evitando o contato com o imperfeito."
    ],
    respostaCorreta: "c"
  },
  {
    id: 'es-q25',
    questao: "O paradoxo da mudança na Gestalt-terapia sugere que a mudança ocorre não pela tentativa de ser diferente, mas pela aceitação do que se é. Isso implica que, em um processo terapêutico, o terapeuta deve:",
    opcoes: [
      "a) Incentivar o cliente a lutar contra seus padrões disfuncionais, buscando eliminá-los a todo custo.",
      "b) Focar em técnicas de modificação de comportamento para que o cliente se torne o que ele idealiza.",
      "c) Ajudar o cliente a aumentar a awareness de seus padrões atuais, permitindo que novas possibilidades surjam a partir dessa aceitação.",
      "d) Direcionar o cliente para um futuro idealizado, desconsiderando sua experiência presente.",
      "e) Ignorar as resistências do cliente, pois elas são obstáculos ao processo de mudança."
    ],
    respostaCorreta: "c"
  },
  {
    id: 'es-q26',
    questao: "A relação dialógica na Gestalt-terapia é um encontro existencial entre terapeuta e cliente, pautado em princípios específicos. Qual dos princípios abaixo NÃO faz parte da relação dialógica na Gestalt-terapia?",
    opcoes: [
      "a) Inclusão: o terapeuta se coloca na experiência do cliente, sem julgamento, mas mantendo sua própria identidade.",
      "b) Confirmação: o terapeuta reconhece e valida a existência e a experiência do cliente, mesmo que não concorde com ela.",
      "c) Neutralidade: o terapeuta mantém uma postura imparcial e distante para garantir a objetividade do processo.",
      "d) Presença: o terapeuta está plenamente presente no aqui e agora da relação, com sua totalidade de ser.",
      "e) Comprometimento: o terapeuta se engaja ativamente no processo do cliente, com responsabilidade e cuidado."
    ],
    respostaCorreta: "c"
  },
  {
    id: 'es-q27',
    questao: "O conceito de \"cliente em processo\" na Gestalt-terapia reflete a visão de que o ser humano está em constante movimento e transformação. Sobre o cliente em processo, é CORRETO afirmar que:",
    opcoes: [
      "a) O objetivo da terapia é levar o cliente a um estado final de equilíbrio e estabilidade, onde não há mais necessidade de mudança.",
      "b) O cliente é visto como um ser passivo, que depende exclusivamente do terapeuta para sua cura e desenvolvimento.",
      "c) A terapia foca em auxiliar o cliente a se tornar mais consciente de seu próprio processo de vir-a-ser, promovendo a autorregulação.",
      "d) O processo terapêutico é linear e previsível, seguindo etapas bem definidas que o cliente deve cumprir.",
      "e) A mudança no cliente ocorre apenas quando ele se desvincula completamente de suas experiências passadas e de seus padrões habituais."
    ],
    respostaCorreta: "c"
  },
  {
    id: 'es-q28',
    questao: "Em uma sessão, o cliente relata sentir-se \"dividido\" entre duas opções importantes em sua vida. O terapeuta, em vez de oferecer conselhos, convida o cliente a \"dar voz\" a cada uma das partes, utilizando a técnica da cadeira vazia. Essa intervenção do terapeuta está alinhada com qual aspecto da relação dialógica e do trabalho com o cliente em processo?",
    opcoes: [
      "a) A imposição de uma solução para o dilema do cliente, direcionando sua escolha.",
      "b) A busca por uma interpretação do conflito interno do cliente, oferecendo-lhe um diagnóstico.",
      "c) A facilitação da awareness do cliente sobre suas polaridades internas, promovendo a integração e a autorregulação.",
      "d) A desconsideração da autonomia do cliente, assumindo o controle do processo terapêutico.",
      "e) A tentativa de manipular o cliente para que ele se decida rapidamente, aliviando a tensão."
    ],
    respostaCorreta: "c"
  },
  {
    id: 'es-q29',
    questao: "Um cliente chega à terapia com uma queixa de falta de sentido na vida, expressando um sentimento de vazio existencial. O terapeuta gestaltista, ao invés de buscar uma causa para esse vazio, decide explorar a experiência presente do cliente, perguntando: \"Como é para você sentir esse vazio agora? Onde você o percebe no seu corpo?\". Essa abordagem reflete qual princípio da Gestalt-terapia?",
    opcoes: [
      "a) A busca pela etiologia dos sintomas no passado do cliente.",
      "b) A ênfase na interpretação dos conteúdos inconscientes.",
      "c) O foco no aqui e agora e na experiência fenomenológica do cliente.",
      "d) A utilização de técnicas de reestruturação cognitiva para modificar pensamentos disfuncionais.",
      "e) A análise da transferência e contratransferência na relação terapêutica."
    ],
    respostaCorreta: "c"
  },
  {
    id: 'es-q30',
    questao: "Ao final de uma sessão, o cliente expressa que se sente mais leve e com uma nova perspectiva sobre seu problema. O terapeuta, em vez de atribuir o mérito a si mesmo, responde: \"Percebo que você trabalhou muito hoje e que algo se moveu dentro de você. Como é para você reconhecer essa sua capacidade?\". A resposta do terapeuta demonstra:",
    opcoes: [
      "a) Uma atitude de superioridade, reforçando o papel de especialista.",
      "b) A capacidade de validar a experiência do cliente e de fortalecer sua autonomia e autorresponsabilidade.",
      "c) Uma tentativa de interpretar o que o cliente está sentindo, sem respeitar sua autonomia.",
      "d) A necessidade de encerrar a sessão rapidamente, sem dar espaço para a exploração.",
      "e) Uma postura de distanciamento emocional, evitando o envolvimento com o cliente."
    ],
    respostaCorreta: "b"
  },

  // Do PDF: DOC-20250611-WA0021..pdf
  {
    id: 'doc-q1',
    questao: "Na Gestalt-terapia, o conceito de contato é central para a compreensão do funcionamento humano e do processo terapêutico. Sobre o contato e suas interrupções, assinale a alternativa CORRETA:",
    opcoes: [
      "a) A confluência é uma interrupção do contato caracterizada pela dificuldade em diferenciar-se do outro, resultando em uma fusão de fronteiras que impede a awareness das próprias necessidades.",
      "b) A introjeção ocorre quando o indivíduo projeta no ambiente aspectos de si mesmo que são inaceitáveis, atribuindo ao outro sentimentos ou características que lhe pertencem.",
      "c) A retroflexão é um mecanismo de defesa em que o indivíduo volta contra si mesmo uma ação que gostaria de dirigir ao ambiente, manifestando-se frequentemente em sintomas psicossomáticos.",
      "d) O egotismo é a tendência de o indivíduo evitar o contato pleno, retirando-se da situação antes que a excitação atinja seu ápice, resultando em um ciclo de contato incompleto.",
      "e) A projeção é a assimilação acrítica de normas, valores e crenças do ambiente, sem que haja um processo de avaliação e integração pessoal."
    ],
    respostaCorreta: "a"
  },
  {
    id: 'doc-q2',
    questao: "O ciclo de contato na Gestalt-terapia descreve o processo dinâmico de formação e dissolução de figuras, essencial para a satisfação das necessidades do organismo. Analise as afirmativas a seguir sobre as fases do ciclo de contato:\nI. Na fase de pré-contato, o organismo percebe uma necessidade emergente, mas ainda não há um engajamento direto com o ambiente para satisfazê-la.\nII. A fase de contato pleno é caracterizada pela máxima excitação e pelo engajamento total do organismo com o ambiente, resultando na satisfação da necessidade.\nIII. O pós-contato é o momento de assimilação da experiência, onde a figura se dissolve e o organismo se retrai para um estado de equilíbrio, preparando-se para novas necessidades.\nIV. As interrupções no ciclo de contato ocorrem exclusivamente na fase de contato, impedindo que o indivíduo alcance a awareness necessária para a satisfação da necessidade.\nEstão CORRETAS apenas as afirmativas:",
    opcoes: [
      "a) I e II.",
      "b) I, II e III.",
      "c) II e IV.",
      "d) III e IV.",
      "e) I, III e IV."
    ],
    respostaCorreta: "b"
  },
  {
    id: 'doc-q3',
    questao: "Um cliente em sessão de Gestalt-terapia relata uma situação em que se sente constantemente sobrecarregado pelas expectativas dos outros, sem conseguir expressar suas próprias opiniões. Ao ser questionado sobre o que sente, ele responde: \"Não sei, acho que é o que todo mundo sente, né?\". Essa fala pode ser interpretada como uma manifestação de qual interrupção do contato?",
    opcoes: [
      "a) Projeção.",
      "b) Retroflexão.",
      "c) Confluência.",
      "d) Introjeção.",
      "e) Egotismo."
    ],
    respostaCorreta: "c"
  },
  {
    id: 'doc-q4',
    questao: "Na perspectiva gestáltica, a fronteira de contato é o local onde o indivíduo se encontra com o ambiente, e é através dela que se dá o processo de contato. Sobre a fronteira de contato, é INCORRETO afirmar que:",
    opcoes: [
      "a) É um fenômeno dinâmico e flexível, que se forma e se dissolve constantemente no processo de contato.",
      "b) Sua rigidez ou permeabilidade excessiva pode indicar interrupções no ciclo de contato e dificuldades no ajustamento criativo.",
      "c) É o limite entre o eu e o não-eu, onde a diferenciação e a integração ocorrem simultaneamente.",
      "d) A awareness da fronteira de contato é fundamental para que o indivíduo possa discriminar suas próprias necessidades e as do ambiente.",
      "e) A interrupção do contato ocorre sempre que a fronteira de contato é completamente dissolvida, impedindo qualquer tipo de interação."
    ],
    respostaCorreta: "e"
  },
  {
    id: 'doc-q5',
    questao: "Considere a seguinte situação clínica: Um cliente, ao ser convidado pelo terapeuta a expressar sua raiva diretamente para a pessoa imaginária que o incomoda, começa a socar o travesseiro com força, mas com um sorriso no rosto. Essa manifestação pode ser um indicativo de qual interrupção do contato, e qual seria a intervenção mais adequada do terapeuta?",
    opcoes: [
      "a) Projeção; o terapeuta deve pedir ao cliente para descrever o que ele vê no travesseiro.",
      "b) Retroflexão; o terapeuta deve convidar o cliente a perceber o que ele está fazendo consigo mesmo ao sorrir enquanto soca.",
      "c) Confluência; o terapeuta deve ajudar o cliente a diferenciar suas emoções das emoções da pessoa imaginária.",
      "d) Introjeção; o terapeuta deve questionar o cliente sobre a origem da regra que o impede de expressar raiva diretamente.",
      "e) Egotismo; o terapeuta deve encorajar o cliente a se engajar mais plenamente na expressão da raiva, sem se preocupar com a imagem que está passando."
    ],
    respostaCorreta: "b"
  },
  {
    id: 'doc-q6',
    questao: "O conceito de campo é fundamental na Gestalt-terapia, pois enfatiza a interdependência entre o organismo e o ambiente. Sobre o campo fenomenológico, assinale a alternativa INCORRETA:",
    opcoes: [
      "a) O campo é uma totalidade dinâmica, onde cada parte influencia e é influenciada pelas demais, não podendo ser compreendido isoladamente.",
      "b) A relação figura-fundo é um processo contínuo no campo, onde o que é percebido como figura emerge do fundo e, uma vez satisfeito a necessidade, retorna ao fundo.",
      "c) O terapeuta gestaltista atua como um observador neutro do campo do cliente, evitando qualquer tipo de intervenção para não distorcer a experiência.",
      "d) A awareness do campo permite ao indivíduo perceber como ele e o ambiente se organizam e se influenciam mutuamente no presente.",
      "e) O campo não se restringe ao espaço físico, incluindo também aspectos psicológicos, sociais, culturais e históricos que influenciam a experiência do indivíduo."
    ],
    respostaCorreta: "c"
  },
  {
    id: 'doc-q7',
    questao: "O ajustamento criativo é a capacidade do organismo de se adaptar de forma flexível e inovadora às demandas do ambiente, mantendo sua integridade. Sobre o ajustamento criativo na Gestalt-terapia, é CORRETO afirmar que:",
    opcoes: [
      "a) É um processo que busca a eliminação de qualquer tipo de conflito ou tensão, visando um estado de homeostase estática.",
      "b) Ocorre quando o indivíduo se conforma rigidamente às expectativas externas, sacrificando suas próprias necessidades em prol da adaptação.",
      "c) Implica na capacidade de encontrar novas soluções para velhos problemas, mesmo que isso envolva a desorganização temporária do campo.",
      "d) É sinônimo de ajustamento funcional, onde o indivíduo se adapta ao ambiente de forma padronizada e previsível.",
      "e) A rigidez no ajustamento criativo é sempre um indicativo de patologia, não havendo aspectos positivos em manter certos padrões."
    ],
    respostaCorreta: "c"
  },
  {
    id: 'doc-q8',
    questao: "Um cliente em terapia gestaltista relata que, apesar de desejar mudar de emprego, sente-se paralisado e incapaz de tomar qualquer atitude. Ele descreve seu ambiente de trabalho atual como \"seguro, mas sufocante\". Sob a ótica do campo e do ajustamento criativo, qual a melhor interpretação para essa situação?",
    opcoes: [
      "a) O cliente está em um estado de confluência com o ambiente de trabalho, o que impede a emergência de novas figuras.",
      "b) O ajustamento criativo do cliente está sendo inibido pela introjeção de crenças limitantes sobre segurança e estabilidade.",
      "c) A figura do \"emprego seguro\" está se tornando um fundo, e a figura do \"novo emprego\" ainda não conseguiu emergir com clareza no campo do cliente.",
      "d) O cliente está retrofletindo sua energia para a mudança, voltando-a contra si mesmo na forma de paralisia.",
      "e) O campo do cliente está desorganizado, e ele precisa de um direcionamento claro do terapeuta para realizar a mudança."
    ],
    respostaCorreta: "c"
  },
  {
    id: 'doc-q9',
    questao: "O paradoxo da mudança na Gestalt-terapia afirma que a mudança ocorre quando nos tornamos o que somos, e não quando tentamos ser o que não somos. Essa afirmação implica que:",
    opcoes: [
      "a) A terapia deve focar em ensinar o cliente a ser diferente, incentivando-o a abandonar seus padrões atuais.",
      "b) A aceitação plena do self presente, com suas qualidades e limitações, é o ponto de partida para a transformação.",
      "c) A mudança é um processo linear e previsível, que pode ser alcançado através de técnicas específicas de modificação de comportamento.",
      "d) O terapeuta deve desafiar o cliente a se esforçar para ser quem ele idealiza, mesmo que isso gere desconforto.",
      "e) A mudança só é possível quando o cliente se desvincula completamente de seu passado e de suas experiências anteriores."
    ],
    respostaCorreta: "b"
  },
  {
    id: 'doc-q10',
    questao: "Em uma sessão, o terapeuta percebe que o cliente está constantemente se desculpando por suas falas e movimentos, mesmo quando não há motivo aparente. O terapeuta decide intervir, convidando o cliente a \"ser mais desculpador\" e a exagerar esse comportamento. Essa intervenção tem como objetivo principal:",
    opcoes: [
      "a) Reforçar o comportamento disfuncional do cliente para que ele perceba o quão inadequado é.",
      "b) Aumentar a awareness do cliente sobre o seu padrão de ajustamento criativo e a função desse comportamento no campo.",
      "c) Fazer com que o cliente se sinta envergonhado de seu comportamento, incentivando-o a mudá-lo.",
      "d) Demonstrar ao cliente que o terapeuta também comete erros e que a perfeição não é necessária.",
      "e) Desviar o foco do cliente de suas emoções reais para um comportamento superficial."
    ],
    respostaCorreta: "b"
  },
  {
    id: 'doc-q11',
    questao: "A relação dialógica é um pilar fundamental da Gestalt-terapia, caracterizada por um encontro autêntico entre terapeuta e cliente. Sobre a relação dialógica, assinale a alternativa CORRETA:",
    opcoes: [
      "a) A neutralidade do terapeuta é essencial para garantir a objetividade da relação, evitando qualquer tipo de envolvimento pessoal.",
      "b) A inclusão é a capacidade do terapeuta de se colocar no lugar do cliente, sentindo suas emoções como se fossem suas próprias.",
      "c) O comprometimento dialógico implica que o terapeuta deve sempre concordar com as percepções do cliente para fortalecer o vínculo terapêutico.",
      "d) A relação dialógica é um processo de mão dupla, onde tanto o terapeuta quanto o cliente são transformados pelo encontro.",
      "e) A autenticidade do terapeuta se manifesta apenas na verbalização de seus pensamentos e sentimentos, sem considerar a comunicação não-verbal."
    ],
    respostaCorreta: "d"
  },
  {
    id: 'doc-q12',
    questao: "O conceito de \"cliente em processo\" na Gestalt-terapia enfatiza a natureza dinâmica e contínua da experiência humana e da mudança. Sobre o cliente em processo, é INCORRETO afirmar que:",
    opcoes: [
      "a) O cliente é visto como um ser em constante vir-a-ser, com potencial para o crescimento e a autorregulação.",
      "b) A terapia busca interromper o processo do cliente para que ele possa alcançar um estado de equilíbrio estático e definitivo.",
      "c) A awareness do processo é crucial para que o cliente possa se apropriar de suas experiências e fazer novas escolhas.",
      "d) O terapeuta atua como um facilitador, acompanhando o cliente em sua jornada de descoberta e transformação.",
      "e) A fenomenologia da mudança se manifesta na forma como o cliente organiza e reorganiza seu campo fenomenológico ao longo do tempo."
    ],
    respostaCorreta: "b"
  },
  {
    id: 'doc-q13',
    questao: "Em uma sessão, o cliente expressa uma forte resistência em falar sobre um determinado assunto, mudando de tópico repetidamente. O terapeuta, em vez de insistir, decide focar na forma como o cliente está evitando o assunto, perguntando: \"Percebo que você está se esforçando para não falar sobre isso. O que acontece com você quando pensa em abordar esse tema?\". Essa intervenção do terapeuta reflete qual aspecto da relação dialógica e do trabalho com o cliente em processo?",
    opcoes: [
      "a) A imposição de uma agenda terapêutica, forçando o cliente a confrontar sua resistência.",
      "b) A desconsideração da fronteira de contato do cliente, invadindo seu espaço pessoal.",
      "c) A valorização da awareness do processo, convidando o cliente a explorar sua própria resistência como parte de sua experiência presente.",
      "d) A busca por uma interpretação do comportamento do cliente, oferecendo-lhe um insight sobre sua dinâmica inconsciente.",
      "e) A tentativa de manipular o cliente para que ele se abra, utilizando uma técnica diretiva."
    ],
    respostaCorreta: "c"
  },
  {
    id: 'doc-q14',
    questao: "Um cliente chega à terapia com uma queixa de ansiedade generalizada, sem conseguir identificar uma causa específica para seu sofrimento. O terapeuta gestaltista, ao invés de buscar um diagnóstico ou uma causa no passado, decide explorar a experiência presente da ansiedade no corpo do cliente, perguntando: \"Onde você sente essa ansiedade no seu corpo agora? Como ela se manifesta?\". Essa abordagem está alinhada com qual princípio da Gestalt-terapia?",
    opcoes: [
      "a) A busca pela etiologia dos sintomas no passado do cliente.",
      "b) A ênfase na interpretação dos conteúdos inconscientes.",
      "c) O foco no aqui e agora e na experiência fenomenológica do cliente.",
      "d) A utilização de técnicas de reestruturação cognitiva para modificar pensamentos disfuncionais.",
      "e) A análise da transferência e contratransferência na relação terapêutica."
    ],
    respostaCorreta: "c"
  },
  {
    id: 'doc-q15',
    questao: "Ao final de uma sessão, um cliente expressa gratidão ao terapeuta, dizendo: \"Sinto que hoje eu realmente me conectei com algo dentro de mim que estava adormecido\". O terapeuta responde: \"Sim, percebo que você está mais presente e com uma energia diferente. Como é para você sentir isso agora?\". A resposta do terapeuta demonstra:",
    opcoes: [
      "a) Uma atitude de superioridade, reforçando o papel de especialista.",
      "b) A capacidade de validar a experiência do cliente e convidá-lo a aprofundar sua awareness.",
      "c) Uma tentativa de interpretar o que o cliente está sentindo, sem respeitar sua autonomia.",
      "d) A necessidade de encerrar a sessão rapidamente, sem dar espaço para a exploração.",
      "e) Uma postura de distanciamento emocional, evitando o envolvimento com o cliente."
    ],
    respostaCorreta: "b"
  },
];

const SimuladoApp = () => {
  // Inicializamos as perguntas já embaralhadas na primeira vez
  const [perguntas, setPerguntas] = useState<Pergunta[]>(() => shuffleArray(initialPerguntas)); // Tipado para Pergunta[]
  const [perguntaAtualIndex, setPerguntaAtualIndex] = useState<number>(0); // Tipado para number
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<string | null>(null); // Tipado para string | null
  const [mostrandoFeedback, setMostrandoFeedback] = useState<boolean>(false); // Tipado para boolean
  const [respostaCorretaFeedback, setRespostaCorretaFeedback] = useState<boolean>(false); // Tipado para boolean
  const [acertos, setAcertos] = useState<number>(0); // Tipado para number
  const [simuladoTerminado, setSimuladoTerminado] = useState<boolean>(false); // Tipado para boolean

  const handleSelecionarOpcao = (opcao: string) => { // Tipado o parâmetro 'opcao' como string
    if (!mostrandoFeedback) {
      setOpcaoSelecionada(opcao);
    }
  };

  const handleConfirmarResposta = () => {
    if (!opcaoSelecionada) {
      alert("Por favor, selecione uma opção antes de confirmar.");
      return;
    }

    const perguntaAtual = perguntas[perguntaAtualIndex];
    // Garantimos que 'opcaoSelecionada' é uma string antes de chamar 'toLowerCase()'
    const isCorrect = (opcaoSelecionada as string).toLowerCase().startsWith(perguntaAtual.respostaCorreta.toLowerCase() + ')');

    setMostrandoFeedback(true);
    setRespostaCorretaFeedback(isCorrect);

    if (isCorrect) {
      setAcertos(prev => prev + 1);
    }
  };

  const handleProximaQuestao = () => {
    setMostrandoFeedback(false);
    setOpcaoSelecionada(null);
    setRespostaCorretaFeedback(false);

    if (perguntaAtualIndex < perguntas.length - 1) {
      setPerguntaAtualIndex(perguntaAtualIndex + 1);
    } else {
      setSimuladoTerminado(true);
    }
  };

  const handleReiniciarSimulado = () => {
    setPerguntaAtualIndex(0);
    setOpcaoSelecionada(null);
    setMostrandoFeedback(false);
    setRespostaCorretaFeedback(false);
    setAcertos(0);
    setSimuladoTerminado(false);
    // Ao reiniciar, embaralha novamente as perguntas e atualiza o estado 'perguntas'
    setPerguntas(shuffleArray(initialPerguntas));
  };

  const perguntaAtual = perguntas[perguntaAtualIndex];

  return (
    <div className="simulado-container">
      <h1 className="simulado-title">Simulado de Gestalt-terapia</h1>
      <p className="simulado-description">Este simulado contém questões sobre Gestalt-terapia.</p>

      {simuladoTerminado ? (
        <div className="final-screen">
          <h2 className="simulado-title">🎉 Parabéns! 🎉</h2>
          <p className="simulado-description">Você concluiu o simulado!</p>
          <p className="simulado-description">Você acertou <strong style={{ color: '#10b981' }}>{acertos}</strong> de <strong style={{ color: '#2563eb' }}>{perguntas.length}</strong> questões.</p>
          <div className="action-buttons-container">
            <button
              onClick={handleReiniciarSimulado}
              className="confirm-button"
            >
              Reiniciar Simulado
            </button>
          </div>
        </div>
      ) : (
        perguntaAtual ? (
          <div className="question-section">
            <div className="question-header">
              <span className="question-number">Questão {perguntaAtualIndex + 1} de {perguntas.length}</span>
              {mostrandoFeedback && (
                <span className={`feedback-status ${respostaCorretaFeedback ? 'feedback-correct' : 'feedback-incorrect'}`}>
                  {respostaCorretaFeedback ? '✅ Correta' : '❌ Incorreta'}
                </span>
              )}
            </div>
            <p className="question-text">{perguntaAtual.questao}</p>
            <div className="options-container">
              {perguntas[perguntaAtualIndex].opcoes.map((opcao: string, index: number) => { // Acessando perguntas[perguntaAtualIndex].opcoes diretamente
                let optionClasses = "option-item";

                if (mostrandoFeedback) {
                  const respostaCorretaLetra = perguntaAtual.respostaCorreta.toLowerCase();
                  const opcaoMinusc = opcao.toLowerCase();

                  if (opcaoMinusc.startsWith(respostaCorretaLetra + ')')) {
                    optionClasses += ' option-correct';
                  }
                  if (opcao === opcaoSelecionada && !respostaCorretaFeedback) {
                    optionClasses += ' option-incorrect';
                  }
                  else if (!opcaoMinusc.startsWith(respostaCorretaLetra + ')') && opcao !== opcaoSelecionada) {
                     optionClasses += ' option-disabled';
                  }
                } else {
                  if (opcao === opcaoSelecionada) {
                    optionClasses += ' option-selected';
                  } else {
                    optionClasses += ' option-default';
                  }
                }

                if (mostrandoFeedback) {
                  optionClasses += ' pointer-events-none';
                }

                return (
                  <div
                    key={index}
                    onClick={() => handleSelecionarOpcao(opcao)}
                    className={optionClasses}
                  >
                    <span className="option-icon">
                      {mostrandoFeedback && opcao.toLowerCase().startsWith(perguntaAtual.respostaCorreta.toLowerCase() + ')') ? '✅' :
                       (mostrandoFeedback && opcao === opcaoSelecionada && !respostaCorretaFeedback) ? '❌' :
                       (opcao === opcaoSelecionada ? '🔘' : '⚪')}
                    </span>
                    {opcao}
                  </div>
                );
              })}
            </div>
            <div className="action-buttons-container">
              {!mostrandoFeedback ? (
                <button
                  onClick={handleConfirmarResposta}
                  className="confirm-button"
                  disabled={!opcaoSelecionada}
                >
                  Confirmar Resposta
                </button>
              ) : (
                <button
                  onClick={handleProximaQuestao}
                  className="next-button"
                >
                  {perguntaAtualIndex === perguntas.length - 1 ? 'Ver Resultados' : 'Próxima Questão'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="initial-message">
            <span role="img" aria-label="Warning Icon" className="initial-icon">⚠️</span>
            <h2 className="initial-title">Erro: Nenhuma Questão Carregada!</h2>
            <p className="initial-description">
              Verifique o array `initialPerguntas` no arquivo `src/SimuladoApp.jsx`.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default SimuladoApp;
