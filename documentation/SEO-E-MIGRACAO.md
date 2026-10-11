# SEO, conteúdo técnico e preparação de migração

Pesquisa e revisão editorial: 11/10/2026. Estes termos são hipóteses de intenção de busca em português, sem estimativas inventadas de volume ou dificuldade.

## Mapa de intenção

- Home: componentes eletrônicos para proteção e controle; visão comercial do portfólio.
- /produtos/fusiveis/: fusível 5x20, fusível rápido/retardado, fusível SMD, automotivo; seleção e cotação.
- /produtos/porta-fusiveis/: porta-fusível painel, clip para placa, suporte 5x20; compatibilidade e montagem.
- /produtos/ptc-resetaveis/: PTC resetável, PPTC, Ihold/Itrip; parâmetros e função.
- /produtos/protecao-tvs-mov-esd/: diodo TVS, varistor MOV, proteção ESD; transientes e escolha.
- /produtos/tiristores/: SCR, TRIAC, SIDACtor; distinguir controle de potência e proteção.
- /produtos/ntc-sensores/: NTC corrente de partida, sensor NTC, R25; diferenciar aplicação térmica e inrush.
- /guias/: três perguntas reais, resposta direta, parâmetros, limites e fontes próximas.
- /contato/: Digiquality contato, cotação de componente; código, quantidade e aplicação.

Não há páginas de produto individual porque não existe base atual validada de part numbers. A busca local encontra famílias/tecnologias e explica esse limite.

## Implementação técnica

HTML estático completo, conteúdo disponível sem JavaScript, URLs semânticas, títulos e descrições individuais, canonical absoluto, pt-BR, Open Graph e imagem social. Não há hreflang porque só há uma versão linguística. Organization com nome, site original e e-mail publicamente confirmado; BreadcrumbList nas páginas internas; Article nos guias. Não há review, rating, Offer ou Product fictícios. LocalBusiness/horários/endereço foram omitidos até confirmação operacional.

Fonte Manrope local WOFF2 (~29 kB), SVGs leves com dimensões explícitas, JavaScript sem dependências e carregado com defer. Foco visível, link para pular conteúdo, labels, landmarks, menu com aria-expanded e retorno por Escape, resultados anunciados e preferência de movimento reduzido. O tamanho total do site estático foi mantido abaixo de 400 kB na primeira versão, incluindo páginas repetidas.

## Política da prévia pública

Todas as páginas têm `noindex, follow`. Rastrear é permitido para que os buscadores leiam a diretiva. `robots.txt` em uma subpasta de Project Pages não governa o host; por isso o controle não depende dele. Sitemap gerado para inspeção/portabilidade, sem anúncio no robots nem submissão. Canonicals apontam para a URL real da prévia, sem inventar páginas no domínio antigo. Noindex não é privacidade ou controle de acesso; repositório e site são públicos.

## GEO / experiências de IA

Conteúdo claro por entidade e função, explicações rastreáveis, fontes, data de consulta, FAQ visível e limites de cada dado. Nada de repetição artificial de palavras-chave, texto oculto, depoimentos inventados ou llms.txt apresentado como requisito. Não há garantia de ranking, indexação ou citação por modelos.

## Antes de migrar

1. Confirmar com a empresa: e-mails e telefones, endereço/horário, portfólio atual, narrativa institucional, representação e direitos dos ativos.
2. Validar o desenho final e as questões históricas da identidade.
3. Aprovar o fluxo de atendimento. Se for criado backend, definir retenção, segurança, proteção de spam e informações de privacidade apropriadas; não inventar política legal.
4. Fazer inventário de URLs legadas e mapear redirecionamentos 301/308 página a página no servidor real.
5. Configurar HTTPS e domínio somente após autorização. Não usar o endereço HTTP antigo como destino definitivo sem avaliar sua segurança.
6. Gerar com origem/base definitivas; retirar noindex da produção e manter a prévia fora da busca ou despublicá-la após aprovação.
7. Revisar sitemap/robots canônicos e links, usar Search Console e inspeção de URL com conta autorizada, observar indexação e erros.
8. Medir CWV com dados de campo quando disponíveis. LCP/INP/CLS reais não podem ser garantidos por uma inspeção local; Lighthouse de laboratório é apenas diagnóstico.

## Referências oficiais consultadas

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/docs/crawling-indexing/block-indexing
- https://developers.google.com/search/docs/appearance/structured-data/organization
- https://developers.google.com/search/docs/appearance/structured-data/product-snippet
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Fontes e legado

O site http://www.digiquality.com.br/ respondeu HTTP 200, com Last-Modified informado como 02/01/2020. O rodapé publica vendas@digiquality.com.br e telefones (11) 4227-1482, 2613-8823, 2613-8824. Há endereço publicado, mas diretórios externos divergem e a operação não foi testada: omitido da prévia.

A inspeção do HTML legado em 11/10/2026 encontrou referências locais `file:///H:/` e texto/links externos em chinês sem relação com o negócio. Esses trechos não foram migrados. A causa não foi investigada nem afirmada como comprometimento confirmado. Nenhuma ação foi realizada no servidor legado.

Arquivos antigos são apresentados como históricos, com edição/data quando disponível. Marcas citadas são referências técnicas e não comprovam representação, certificação ou disponibilidade atual.
