import { statusFilters } from 'app/constants';
import {
  addTodoAction,
  deleteTodoAction,
  toggleTodoCompletedAction
} from 'app/store';
import Button from 'components/Button/Button';
import ErrorBoundary from 'components/ErrorBoundary';
import Form from 'components/Form';
import Modal from 'components/Modal';
import TodoList from 'components/Todos/TodoList';
import { StatusFilter } from 'components/Todos/TodosFilter';
import { useToggle } from 'hooks/useToggle';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';

const getVisibleTasks = (tasks, statusFilter) => {
  switch (statusFilter) {
    case statusFilters.active:
      return tasks.filter(task => !task.completed);
    case statusFilters.completed:
      return tasks.filter(task => task.completed);
    default:
      return tasks;
  }
};

const Todos = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams({ search: '' });
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  const todoStatus = useSelector(state => state.filters.status);
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  // const [todos, setTodos] = useState([]);
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

  const addTodo = ({ title, message }) => {
    dispatch(addTodoAction({ title, message }));
  };

  const deleteTodo = id => {
    dispatch(deleteTodoAction(id));
  };

  const toggleCompleted = id => {
    dispatch(toggleTodoCompletedAction(id));
  };

  const filteredTodos = useMemo(() => {
    const searchString = searchParams.get('search').toLowerCase();
    const todosFilteredByStatus = getVisibleTasks(todos, todoStatus);
    return todosFilteredByStatus.filter(({ title }) =>
      title.toLowerCase().includes(searchString)
    );
  }, [todos, searchParams, todoStatus]);

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
              <Form onSubmit={addTodo} />
            </ErrorBoundary>
          </Modal>
        )}
        <Button type="button" onClick={addTodoModal.open}>
          Add New Todo
        </Button>
        <input value={searchParams.get('search')} onChange={handleSearch} />
        <StatusFilter />
        <ErrorBoundary>
          <TodoList
            todos={filteredTodos}
            deleteTodo={deleteTodo}
            toggleCompleted={toggleCompleted}
          />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Todos;
