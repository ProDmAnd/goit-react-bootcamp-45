import { CircularProgress } from '@mui/material';
import { useAppSelector } from 'app/reduxHooks';
import * as todosOperations from 'app/todos/operations';
import { selectTodoError, selectTodoIsLoading } from 'app/todos/selectors';
import { selectUserIsAuth } from 'app/user/selectors';
import Button from 'components/Button/Button';
import ErrorBoundary from 'components/ErrorBoundary';
import Form from 'components/Form';
import Modal from 'components/Modal';
import TodoList from 'components/Todos/TodoList';
import { TodosCounter } from 'components/Todos/TodosCounter';
import { StatusFilter } from 'components/Todos/TodosFilter';
import { useToggle } from 'hooks/useToggle';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';

const Todos = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams({ search: '' });
  const dispatch = useDispatch();
  // const todos = useAppSelector(selectTodos);
  // const todoStatus = useAppSelector(selectTodosFilterStatus);
  const todosLoading = useAppSelector(selectTodoIsLoading);
  const errorMessage = useAppSelector(selectTodoError);

  const isLoggedIn = useAppSelector(selectUserIsAuth);
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
    dispatch(todosOperations.addTodo({ title, message }));
  };


  useEffect(() => {
    dispatch(todosOperations.fetchTodosThunk());
  }, [dispatch]);

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
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
