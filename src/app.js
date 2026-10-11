(() => {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  if (menu && nav) {
    const close = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.textContent = 'Menu'; };
    menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('open', open); menu.setAttribute('aria-expanded', String(open)); menu.textContent = open ? 'Fechar' : 'Menu'; });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { close(); menu.focus(); } });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    window.addEventListener('resize', () => { if (window.innerWidth > 850) close(); });
  }
  const norm = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[-–—]/g, ' ').toLowerCase();
  const search = document.querySelector('#catalog-search');
  if (search) {
    const filter = document.querySelector('#catalog-filter');
    const cards = [...document.querySelectorAll('[data-search]')];
    const count = document.querySelector('#search-count');
    const empty = document.querySelector('#empty-results');
    const run = () => {
      const terms = norm(search.value.trim()).split(/\s+/).filter(Boolean);
      let visible = 0;
      cards.forEach(card => { const match = terms.every(term => norm(card.dataset.search).includes(term)) && (!filter.value || card.dataset.function.split(/\s+/).includes(filter.value)); card.hidden = !match; if (match) visible++; });
      count.textContent = visible === 6 && !terms.length && !filter.value ? '6 famílias de componentes para explorar.' : `${visible} ${visible === 1 ? 'família encontrada' : 'famílias encontradas'}.`;
      empty.hidden = visible !== 0;
    };
    search.addEventListener('input', run); filter.addEventListener('change', run);
    document.querySelector('#clear-search').addEventListener('click', () => { search.value = ''; filter.value = ''; run(); search.focus(); });
    run();
  }
  const form = document.querySelector('#quote-form');
  if (form) {
    const output = document.querySelector('#quote-output');
    const message = document.querySelector('#quote-message');
    const status = document.querySelector('#copy-status');
    const query = new URLSearchParams(window.location.search).get('categoria');
    if (query && [...form.elements.category.options].some(o => o.value === query)) form.elements.category.value = query;
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const val = key => String(data.get(key) || '').trim();
      const text = [
        'Olá, equipe Digiquality.', '', 'Gostaria de solicitar uma cotação:', '',
        `Componente / código: ${val('part')}`, `Quantidade: ${val('quantity')}`, `Família: ${val('category') || 'A identificar'}`,
        `Aplicação e especificações: ${val('application') || 'A complementar'}`, `Prazo desejado: ${val('deadline') || 'A combinar'}`,
        '', `Nome: ${val('name')}`, `Empresa: ${val('company') || 'Não informada'}`, `E-mail para retorno: ${val('email')}`,
        '', 'Por favor, confirmem especificação, disponibilidade, prazo e condições comerciais.'
      ].join('\n');
      message.value = text;
      document.querySelector('#open-email').href = 'mailto:vendas@digiquality.com.br?subject=' + encodeURIComponent('Cotação Digiquality | ' + val('part').slice(0,100)) + '&body=' + encodeURIComponent(text);
      output.hidden = false; status.textContent = 'Mensagem preparada. Nada foi enviado.'; output.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',block:'center'}); message.focus();
    });
    document.querySelector('#copy-message').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(message.value); status.textContent = 'Mensagem copiada. Cole no seu e-mail e envie para vendas@digiquality.com.br.'; }
      catch { message.focus(); message.select(); status.textContent = 'Selecione e copie o texto acima manualmente.'; }
    });
    document.querySelector('#open-email').addEventListener('click', () => { status.textContent = 'Seu aplicativo de e-mail deve abrir. Revise e envie por lá. Esta página não confirma o envio.'; });
    document.querySelector('#prepare-quote').disabled = false;
  }
})();
