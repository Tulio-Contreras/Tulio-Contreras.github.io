import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCents, transfer, freshWallet, filterBooks, advanceTask, initialTasks } from '../src/lib/lab-model.mjs';
test('importe monetario exacto y entradas ambiguas rechazadas', () => {
  assert.equal(parseCents('75,01'), 7501); assert.equal(parseCents('0.01'), 1);
  for (const value of ['0', '-1', '1,005', '1e2', '', 'abc', 'Infinity', '1.000,00']) assert.equal(parseCents(value), null);
});
test('transferencias conservan el total, no mutan el origen y registran una vez', () => {
  const original = freshWallet(); let state = original;
  for (const amount of ['0,01', '250,99', '999']) {
    const result = transfer(state, amount); assert.equal(result.ok, true); state = result.state;
    assert.equal(state.sender + state.recipient, original.sender + original.recipient);
  }
  assert.equal(state.sender, 0); assert.equal(state.transactions.length, 3); assert.equal(original.transactions.length, 0);
  assert.deepEqual(state.transactions.map(item => item.id), [3, 2, 1]);
  const rejected = transfer(state, '0,01'); assert.equal(rejected.ok, false); assert.strictEqual(rejected.state, state);
});
test('rechazos de formato y saldo dejan todos los datos intactos', () => {
  const state = freshWallet(); for (const value of ['2000', 'abc', '-10', '1,005']) { const result = transfer(state, value); assert.equal(result.ok, false); assert.strictEqual(result.state, state); }
});
test('búsqueda tolera tildes y combina consulta con favoritos sin alterar catálogo', () => {
  assert.equal(filterBooks('pais')[0].id, 'alicia'); assert.equal(filterBooks('mary')[0].id, 'frankenstein');
  assert.equal(filterBooks('mary', ['alicia']).length, 0); assert.equal(filterBooks('', []).length, 0); assert.equal(filterBooks('').length, 4);
});
test('ningún rol puede saltar una aprobación ajena y el flujo termina una sola vez', () => {
  let tasks = initialTasks(); const blocked = advanceTask(tasks, 2, 'developer');
  assert.equal(blocked.status, 403); assert.strictEqual(blocked.tasks, tasks);
  for (const role of ['developer', 'manager', 'admin']) { const result = advanceTask(tasks, 1, role); assert.equal(result.ok, true); tasks = result.tasks; }
  assert.equal(tasks[0].status, 'completed'); assert.equal(advanceTask(tasks, 1, 'admin').status, 409);
  assert.equal(advanceTask(tasks, 999, 'admin').status, 404);
});
