import Button from 'components/Button/Button';
import { useToggle } from 'hooks/useToggle';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getTodos } from 'services/api/todosApi';
import ErrorBoundary from 'components/ErrorBoundary';
import Form from 'components/Form';
import Modal from 'components/Modal';
import TodoList from 'components/Todos/TodoList';
import { useUserContext } from 'contexts/UserProvider';
import { Navigate, useSearchParams } from 'react-router-dom';

const Todos = () => {
  const { isLoggedIn } = useUserContext();
  const [searchParams, setSearchParams] = useSearchParams({ search: '' });
  const [todos, setTodos] = useState([]);
  // const [search, setSearch] = useState('');
  const handleSearch = useCallback(
    ({ target: { value } }) =>
      setSearchParams(prev => {
        prev.set('search', value);
        return prev;
      }),
    [setSearchParams]
  );

  const addTodoModal = useToggle();

  const addTodo = () => {};

  const deleteTodo = () => {};

  const filteredTodos = useMemo(() => {
    const searchString = searchParams.get('search').toLowerCase();
    return todos.filter(({ title }) =>
      title.toLowerCase().includes(searchString)
    );
  }, [todos, searchParams]);

  useEffect(() => {
    if (!isLoggedIn) return;
    getTodos().then(setTodos);
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#010101',
          gap: 15,
        }}
      >
        {addTodoModal.isOpen && (
          <Modal onClose={addTodoModal.close}>
            <ErrorBoundary>
              <Form onSubmit={addTodo} />
            </ErrorBoundary>
          </Modal>
        )}
        <Button type="button" onClick={addTodoModal.open}>
          Add New Todo
        </Button>
        <input value={searchParams.get('search')} onChange={handleSearch} />
        <ErrorBoundary>
          <TodoList todos={filteredTodos} deleteTodo={deleteTodo} />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Todos;
