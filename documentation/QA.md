# Verificação da prévia Digiquality

Data: 11/10/2026.

## Passou

- Geração de 15 páginas + página 404.
- Validação dos links e âncoras internos; base `/digiquality-preview/`.
- Um H1 por página, títulos e descrições únicos, HTML em pt-BR.
- JSON-LD parseável; noindex, follow em todos os HTML.
- Imagens com alt e dimensões; fonte local carregada.
- JavaScript verificado com `node --check`.
- Testes DOM: busca inicial, acentos, hífen/plural, filtro, múltiplas funções (SIDACtor), zero resultados e limpeza.
- Testes DOM: menu, Escape, retorno de foco.
- Testes DOM: botão de formulário desativado sem JS, categoria pela URL, cancelamento de submit nativo, mailto codificado e corpo igual à prévia; fallback de cópia; nenhum fetch ou armazenamento persistente; movimento reduzido.
- Navegador Chromium da nuvem: home desktop a 1180 px; Manrope e SVGs renderizados, sem quebra horizontal.
- Navegador real em frames responsivos locais de 320, 390 e 768 px: home, catálogo, categoria, recursos, guia, empresa e contato. Nas 21 combinações, scrollWidth = clientWidth (305, 375 e 753 px após a barra de rolagem), sem overflow horizontal.
- Inspeção visual: home desktop e mobile, guia em 320 px, formulário em 390 px e contato em tablet.
- Interação real: busca por “porta-fusíveis” + filtro, zero resultados e limpar; abrir/fechar menu mobile; preparar mensagem de cotação com dados fictícios de QA, sem enviar.
- Links técnicos externos inspecionados por status, URL final e tipo. Um soft-404 de Littelfuse foi substituído pela nota técnica AN1002, PDF de 2008 claramente rotulado como referência conceitual.

## Limites

- Publicação no GitHub Pages ainda não realizada no momento deste pacote: gravação pelo conector retornou 403 “Resource not accessible by integration”. A alternativa de upload pela interface web aguarda autorização.
- Não foi testado envio real de e-mail, nem ligação telefônica, nem estoque comercial.
- Testes responsivos usam larguras reais de viewport em frames do Chromium, não aparelhos físicos iOS/Android. Safari e Firefox não foram testados.
- Não há métricas CWV de campo nem pontuação Lighthouse atestada. O site estático completo tem cerca de 286 kB, incluindo todos os HTML e recursos compartilhados uma vez.
- O log do navegador inclui avisos de uma extensão do ambiente; não foi observado erro originado pelo JavaScript do site nos fluxos exercitados.
- Dados institucionais e operação dos contatos devem ser validados com a empresa antes da migração.


## Correção da abertura local

O primeiro pacote de código usava caminhos absolutos apropriados ao GitHub Pages e não funcionava ao abrir docs/index.html diretamente. A prévia portátil corrigida está em Digiquality-ABRA-ESTE-ARQUIVO.html: todos os recursos visuais, fonte, CSS e JS estão incorporados, e as 15 páginas navegam no mesmo arquivo por hash.

A variante portátil passou em inspeção visual no Chromium da nuvem e testes DOM com origem file:///C:/..., incluindo home, imagens incorporadas, navegação, busca, categoria predefinida, formulário sem envio e retorno. Não foi realizado teste num aparelho Windows físico; a ferramenta de navegador não permite navegação direta em file://. Nenhuma dependência externa é necessária para renderizar a prévia portátil. Fontes/documentos técnicos externos e envio pelo cliente de e-mail mantêm seus requisitos normais de conexão.
