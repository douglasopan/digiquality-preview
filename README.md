# Digiquality · prévia para aprovação

Site estático responsivo em português, com 15 páginas, catálogo por famílias, três guias técnicos e preparação local de cotações por e-mail.

## Abrir a prévia sem instalar nada

Abra `Digiquality-ABRA-ESTE-ARQUIVO.html` no navegador. Esse arquivo incorpora as 15 páginas, imagens, fonte, CSS e JavaScript e funciona sem servidor. Não abra `docs/index.html` diretamente: `docs/` é a saída específica para a URL do GitHub Pages. Para refazer a versão portátil, execute `python3 build.py` e `python3 make_portable.py`.

## Publicação

Configuração prevista: GitHub Pages em `main` → `/docs`. A publicação ainda aguarda a conclusão do fluxo autorizado. O conteúdo publicado é gerado, não deve ser editado manualmente.

## Desenvolvimento

Requer Python 3. Não há dependências para gerar HTML.

```sh
python3 build.py
python3 tests/validate.py
node --check src/app.js
python3 build.py --output docs
```

- `src/content.json`: categorias, guias, perguntas e fontes.
- `src/style.css`: apresentação responsiva.
- `src/app.js`: menu, busca e preparação de mensagem.
- `assets/`: identidade fornecida, fonte local e ilustrações próprias.
- `dist/`: saída local, não versionada.
- `docs/`: site publicado no Pages.
- `documentation/`: decisões SEO, limites e checklist de migração.

O gerador usa por padrão `/digiquality-preview/` em `https://douglasopan.github.io`, com `noindex, follow` em todas as páginas. O sitemap existe para validar a estrutura, mas não é anunciado nem enviado a buscadores durante a aprovação.

## Limitações intencionais

Sem checkout, login, base de estoque ou promessa de disponibilidade. O formulário não envia dados nem simula sucesso: prepara texto revisável e um link `mailto:`. O usuário envia em seu próprio aplicativo. Sem analytics, cookies próprios, bibliotecas remotas ou serviços de formulário.

Fontes comerciais e dados institucionais precisam de revisão pela empresa antes da versão definitiva. Endereço, horários, data de fundação, certificações e representação comercial atual não são afirmados sem validação. A identidade mantém o desenho A fornecido; a interpretação histórica do transistor não é afirmada como fato.

## Migração futura

Somente após aprovação explícita: revisar dados; definir domínio/HTTPS; executar `python3 build.py --base / --origin https://DOMINIO-APROVADO --production --output dist`; conferir canonical, sitemap, robots, redirecionamentos e formulário. Não executar esse passo para a prévia.

Nenhum domínio, DNS ou arquivo da hospedagem antiga foi alterado.

## Direitos

Marca e materiais fornecidos pertencem a seus titulares. Não foi aplicada licença aberta à marca. Manrope é redistribuída sob SIL Open Font License, incluída em `assets/OFL-Manrope.txt`. Referências de terceiros são links para suas fontes, não republicações integrais de catálogos.
