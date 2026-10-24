export const books = [
  { id: 'frankenstein', title: 'Frankenstein', author: 'Mary Shelley', color: 'sage', mark: 'F' },
  { id: 'orgullo', title: 'Orgullo y prejuicio', author: 'Jane Austen', color: 'rose', mark: 'O' },
  { id: 'quijote', title: 'Don Quijote', author: 'Miguel de Cervantes', color: 'ochre', mark: 'Q' },
  {
    id: 'alicia',
    title: 'Alicia en el país de las maravillas',
    author: 'Lewis Carroll',
    color: 'blue',
    mark: 'A',
  },
];

export const normalize = (value) =>
  String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
export const filterBooks = (query, favorites = null) =>
  books.filter(
    (book) =>
      normalize(`${book.title} ${book.author}`).includes(normalize(query)) &&
      (!favorites || favorites.includes(book.id)),
  );

export function parseCents(value) {
  const raw = String(value).trim().replace(',', '.');
  if (!/^\d{1,7}(\.\d{1,2})?$/.test(raw)) return null;
  const [whole, fraction = ''] = raw.split('.');
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  return Number.isSafeInteger(cents) && cents > 0 ? cents : null;
}

export function transfer(state, rawAmount) {
  const cents = parseCents(rawAmount);
  if (cents === null)
    return {
      ok: false,
      status: 422,
      message: 'Escribe una cantidad mayor que cero, con un máximo de dos decimales.',
      state,
    };
  if (cents > state.sender)
    return {
      ok: false,
      status: 409,
      message: 'La cantidad supera el saldo disponible. Prueba con un importe menor.',
      state,
    };
  const transaction = { id: state.transactions.length + 1, cents };
  return {
    ok: true,
    status: 201,
    message: 'Operación simulada registrada. Los saldos y el historial ya están actualizados.',
    state: {
      sender: state.sender - cents,
      recipient: state.recipient + cents,
      transactions: [transaction, ...state.transactions],
    },
  };
}

export const freshWallet = () => ({ sender: 125000, recipient: 30000, transactions: [] });
export const initialTasks = () => [
  { id: 1, title: 'Validar formulario de inscripción', status: 'development' },
  { id: 2, title: 'Conectar la API del catálogo', status: 'review' },
  { id: 3, title: 'Revisar el flujo de acceso', status: 'approval' },
];
export const taskStages = [
  { id: 'development', label: 'Desarrollo', role: 'developer', action: 'Enviar a revisión' },
  { id: 'review', label: 'Revisión', role: 'manager', action: 'Solicitar aprobación' },
  { id: 'approval', label: 'Aprobación', role: 'admin', action: 'Completar tarea' },
  { id: 'completed', label: 'Completado', role: null, action: 'Completada' },
];
export const roleNames = {
  developer: 'Desarrollador',
  manager: 'Responsable',
  admin: 'Administrador',
};
export function advanceTask(tasks, id, role) {
  const task = tasks.find((item) => item.id === id);
  const index = taskStages.findIndex((stage) => stage.id === task?.status);
  if (!task || index < 0)
    return { ok: false, status: 404, message: 'No se encontró la tarea.', tasks };
  if (index === taskStages.length - 1)
    return { ok: false, status: 409, message: 'Esta tarea ya está completada.', tasks };
  const stage = taskStages[index];
  if (stage.role !== role)
    return {
      ok: false,
      status: 403,
      message: `Esta transición requiere el rol ${roleNames[stage.role]}. Cambia de rol para continuar.`,
      tasks,
    };
  return {
    ok: true,
    status: 200,
    message: `Tarea actualizada: ${taskStages[index + 1].label}.`,
    tasks: tasks.map((item) =>
      item.id === id ? { ...item, status: taskStages[index + 1].id } : item,
    ),
  };
}
