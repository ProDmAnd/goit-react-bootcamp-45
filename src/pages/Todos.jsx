import { Button, CircularProgress } from '@mui/material';
import { useAppSelector } from 'app/reduxHooks';
import { fetchTodosThunk } from 'app/todos/operations';
import { selectTodoError, selectTodoIsLoading } from 'app/todos/selectors';
import ErrorBoundary from 'components/ErrorBoundary';
import Form from 'components/Form';
import Modal from 'components/Modal';
import TodoList from 'components/Todos/TodoList';
import { TodosCounter } from 'components/Todos/TodosCounter';
import { StatusFilter } from 'components/Todos/TodosFilter';
import { createTodo } from 'db';
import { useToggle } from 'hooks/useToggle';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const Todos = () => {
  const [searchParams, setSearchParams] = useSearchParams({ search: '' });
  const dispatch = useDispatch();
  const todosLoading = useAppSelector(selectTodoIsLoading);
  const errorMessage = useAppSelector(selectTodoError);

  const handleSearch = useCallback(
    ({ target: { value } }) =>
      setSearchParams(prev => {
        prev.set('search', value);
        return prev;
      }),
    [setSearchParams]
  );

  const addTodoModal = useToggle();

  const addTodo = ({ title, message }) => {
    // dispatch(todosOperations.addTodo({ title, message }));
    createTodo({ title, message });
  };

  useEffect(() => {
    dispatch(fetchTodosThunk());
  }, [dispatch]);

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
              <Form addTodo={addTodo} />
            </ErrorBoundary>
          </Modal>
        )}
        <Button type="button" onClick={addTodoModal.open}>
          Add New Todo
        </Button>
        <input value={searchParams.get('search')} onChange={handleSearch} />
        <TodosCounter />
        <StatusFilter />
        {todosLoading && <CircularProgress size={50} />}
        {errorMessage && <h3>{errorMessage}</h3>}
        <ErrorBoundary>
          <TodoList />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Todos;
