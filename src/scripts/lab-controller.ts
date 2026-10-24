import {
  books,
  filterBooks,
  freshWallet,
  transfer,
  initialTasks,
  advanceTask,
  taskStages,
} from '../lib/lab-model.mjs';

const money = (cents: number) =>
  new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'USD' }).format(cents / 100);

export function setupLabs() {
  document.querySelectorAll<HTMLElement>('[data-software-lab]').forEach((lab) => {
    if (lab.dataset.ready) return;
    lab.dataset.ready = 'true';
    const get = <T extends HTMLElement = HTMLElement>(selector: string) =>
      lab.querySelector<T>(selector)!;
    let traceTimer: ReturnType<typeof setTimeout>;
    function trace(status: number, result: object) {
      clearTimeout(traceTimer);
      const ok = status < 400;
      lab.dataset.result = ok ? 'success' : 'error';
      get('[data-trace-state]').textContent = `${status} / ${ok ? 'CORRECTO' : 'REVISAR'}`;
      get('[data-response]').textContent = JSON.stringify(
        { demo: 'local', status, ...result },
        null,
        2,
      );
      lab
        .querySelectorAll<HTMLElement>('[data-trace-step]')
        .forEach((step, i) => (step.dataset.active = String(ok || i !== 2)));
      get('[data-trace-line]').setAttribute(
        'points',
        ok
          ? '0,43 45,43 45,18 150,18 150,35 260,35 260,12 410,12 410,28 550,28 550,43 600,43'
          : '0,43 45,43 45,18 150,18 150,35 260,35 260,43 410,43 410,28 550,28 550,43 600,43',
      );
      lab.classList.remove('trace-running');
      requestAnimationFrame(() => lab.classList.add('trace-running'));
      traceTimer = setTimeout(() => lab.classList.remove('trace-running'), 850);
    }
    const tabs = [...lab.querySelectorAll<HTMLButtonElement>('[data-lab-mode]')];
    function activate(mode: string, focus = false) {
      const invitation = document.querySelector('[data-lab-invitation]');
      if (invitation)
        invitation.textContent = (
          {
            'bank-app': 'Empieza por el importe. Prueba qué pasa si envías más de lo disponible.',
            sembook: 'Busca por autor, guarda un libro y vuelve a entrar: tu selección permanece.',
            taskdev: 'Intenta aprobar con el rol equivocado. Después cambia de rol para avanzar.',
          } as Record<string, string>
        )[mode];
      tabs.forEach((tab) => {
        const selected = tab.dataset.labMode === mode;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        if (selected && focus) tab.focus();
      });
      lab
        .querySelectorAll<HTMLElement>('[data-lab-panel]')
        .forEach((panel) => (panel.hidden = panel.dataset.labPanel !== mode));
      get('[data-trace-state]').textContent = 'LISTO';
      get('[data-response]').textContent = 'Realiza una acción para inspeccionar su resultado.';
      delete lab.dataset.result;
      lab
        .querySelectorAll<HTMLElement>('[data-trace-step]')
        .forEach((step) => delete step.dataset.active);
      get('[data-trace-line]').setAttribute('points', '0,43 600,43');
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab.dataset.labMode!));
      tab.addEventListener('keydown', (event) => {
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        activate(tabs[next].dataset.labMode!, true);
      });
    });
    document.querySelectorAll<HTMLAnchorElement>('[data-open-demo]').forEach((link) =>
      link.addEventListener('click', () => {
        if (tabs.length) activate(link.dataset.openDemo!, true);
      }),
    );

    if (lab.querySelector('[data-transfer-demo]')) {
      let wallet = freshWallet();
      const input = get<HTMLInputElement>('[name="amount"]');
      const feedback = get('[data-transfer-feedback]');
      function renderWallet() {
        get('[data-sender]').textContent = money(wallet.sender);
        get('[data-recipient]').textContent = money(wallet.recipient);
        const list = get('[data-transactions]');
        list.replaceChildren();
        if (!wallet.transactions.length) {
          const empty = document.createElement('li');
          empty.className = 'empty-history';
          empty.textContent = 'Todavía no hay operaciones. Puedes hacer la primera.';
          list.append(empty);
        }
        wallet.transactions.slice(0, 3).forEach((item) => {
          const row = document.createElement('li');
          const title = document.createElement('span');
          title.textContent = `Operación ${String(item.id).padStart(2, '0')} · A → B`;
          const amount = document.createElement('strong');
          amount.textContent = money(item.cents);
          row.append(title, amount);
          list.append(row);
        });
      }
      get<HTMLFormElement>('.transfer-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const result = transfer(wallet, input.value);
        wallet = result.state;
        renderWallet();
        feedback.textContent = result.message;
        feedback.dataset.status = result.ok ? 'success' : 'error';
        input.setAttribute('aria-invalid', String(!result.ok));
        trace(result.status, {
          message: result.message,
          saldo_origen_centavos: wallet.sender,
          saldo_destino_centavos: wallet.recipient,
          operaciones: wallet.transactions.length,
        });
      });
      input.addEventListener('input', () => input.removeAttribute('aria-invalid'));
      get('[data-reset-wallet]').addEventListener('click', () => {
        wallet = freshWallet();
        input.value = '75,00';
        input.removeAttribute('aria-invalid');
        renderWallet();
        feedback.textContent = 'Saldos e historial reiniciados. Puedes volver a probar.';
        delete feedback.dataset.status;
        trace(200, { message: 'Estado inicial restaurado', saldo_origen_centavos: wallet.sender });
      });
      renderWallet();
    }
    if (lab.querySelector('[data-library-demo]')) {
      let favorites: string[] = [];
      let onlyFavorites = false;
      const storageKey = 'tc-portfolio-library-v1';
      const query = get<HTMLInputElement>('[data-book-query]');
      const storageMessage = get('[data-storage-status]');
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
        if (Array.isArray(saved))
          favorites = saved.filter((id) => books.some((book) => book.id === id));
      } catch {
        storageMessage.textContent =
          'Almacenamiento no disponible: los favoritos durarán esta sesión.';
      }
      function renderBooks() {
        const visible = filterBooks(query.value, onlyFavorites ? favorites : null);
        lab
          .querySelectorAll<HTMLElement>('[data-book-id]')
          .forEach(
            (item) => (item.hidden = !visible.some((book) => book.id === item.dataset.bookId)),
          );
        lab.querySelectorAll<HTMLButtonElement>('[data-favorite]').forEach((button) => {
          const saved = favorites.includes(button.dataset.favorite!);
          const book = books.find((book) => book.id === button.dataset.favorite)!;
          button.setAttribute('aria-pressed', String(saved));
          button.setAttribute('aria-label', `${saved ? 'Quitar' : 'Guardar'} ${book.title}`);
          button.textContent = saved ? 'Guardado −' : 'Guardar +';
        });
        get('[data-book-count]').textContent =
          `${visible.length} ${visible.length === 1 ? 'libro' : 'libros'} ${onlyFavorites ? 'en favoritos' : 'en esta vista'}`;
        get('[data-favorite-count]').textContent = String(favorites.length);
        get('[data-only-favorites]').setAttribute('aria-pressed', String(onlyFavorites));
        get('[data-book-empty]').hidden = visible.length > 0;
      }
      query.addEventListener('input', () => {
        renderBooks();
        trace(200, {
          consulta: query.value,
          resultados: filterBooks(query.value, onlyFavorites ? favorites : null).length,
        });
      });
      lab.querySelectorAll<HTMLButtonElement>('[data-favorite]').forEach((button) =>
        button.addEventListener('click', () => {
          const id = button.dataset.favorite!;
          favorites = favorites.includes(id)
            ? favorites.filter((item) => item !== id)
            : [...favorites, id];
          let persisted = true;
          try {
            localStorage.setItem(storageKey, JSON.stringify(favorites));
          } catch {
            persisted = false;
            storageMessage.textContent =
              'No se pudo guardar en este navegador. Los favoritos durarán esta sesión.';
          }
          renderBooks();
          trace(200, { favoritos: favorites, guardado_en_navegador: persisted });
        }),
      );
      get('[data-only-favorites]').addEventListener('click', () => {
        onlyFavorites = !onlyFavorites;
        renderBooks();
        trace(200, {
          vista: onlyFavorites ? 'favoritos' : 'catálogo',
          favoritos: favorites.length,
        });
      });
      get('[data-reset-books]').addEventListener('click', () => {
        onlyFavorites = false;
        query.value = '';
        renderBooks();
        query.focus();
        trace(200, { vista: 'catálogo completo' });
      });
      renderBooks();
    }
    if (lab.querySelector('[data-task-demo]')) {
      let tasks = initialTasks();
      const role = get<HTMLSelectElement>('[data-task-role]');
      const feedback = get('[data-task-feedback]');
      function renderTasks() {
        taskStages.forEach((stage) => {
          const lane = get(`[data-task-lane="${stage.id}"]`);
          const items = lane.querySelector('[data-lane-items]')!;
          items.replaceChildren();
          const matches = tasks.filter((task) => task.status === stage.id);
          lane.querySelector('[data-lane-count]')!.textContent = String(matches.length);
          matches.forEach((task) => {
            const article = document.createElement('article');
            article.className = 'task-item';
            const kind = document.createElement('span');
            kind.textContent = `Tarea ${String(task.id).padStart(2, '0')}`;
            const title = document.createElement('h4');
            title.textContent = task.title;
            article.append(kind, title);
            if (stage.role) {
              const button = document.createElement('button');
              button.type = 'button';
              button.dataset.taskAction = String(task.id);
              button.textContent = stage.action;
              article.append(button);
            } else {
              const done = document.createElement('p');
              done.className = 'task-done';
              done.textContent = 'Aprobada y completada';
              article.append(done);
            }
            items.append(article);
          });
        });
      }
      get('.task-board').addEventListener('click', (event) => {
        const button = (event.target as Element).closest<HTMLButtonElement>('[data-task-action]');
        if (!button) return;
        const id = Number(button.dataset.taskAction);
        const result = advanceTask(tasks, id, role.value);
        tasks = result.tasks;
        feedback.textContent = result.message;
        feedback.dataset.status = result.ok ? 'success' : 'error';
        if (result.ok) {
          renderTasks();
          get<HTMLSelectElement>('[data-task-role]').focus();
        }
        trace(result.status, {
          rol: role.value,
          tarea: id,
          message: result.message,
          estados: tasks.map((task) => ({ id: task.id, estado: task.status })),
        });
      });
      role.addEventListener('change', () => {
        feedback.textContent = `Rol activo: ${role.selectedOptions[0].textContent}. Prueba avanzar una tarea.`;
        delete feedback.dataset.status;
      });
      get('[data-reset-tasks]').addEventListener('click', () => {
        tasks = initialTasks();
        role.value = 'developer';
        renderTasks();
        feedback.textContent = 'Tablero reiniciado. Rol activo: Desarrollador.';
        delete feedback.dataset.status;
        trace(200, { message: 'Tablero restaurado' });
      });
      renderTasks();
    }
  });
}
