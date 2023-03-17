export const TodoFabric = todo => ({
  title: todo.title || '',
  message: todo.message || '',
  createdAt: todo.createdAt || new Date().toISOString(),
  completed: todo.completed || false,
  id: todo.id || '',
});
