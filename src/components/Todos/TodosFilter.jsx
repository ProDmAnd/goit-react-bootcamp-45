// Імпортуємо хук
import Button from 'components/Button/Button';
import { useDispatch } from 'react-redux';
// Імпортуємо об'єкт значень фільтра
import { statusFilters } from 'app/constants';
import { useAppSelector } from 'app/reduxHooks';
import { selectTodosFilterStatus } from 'app/todos/selectors';
import { todosActions } from 'app/todos/slice';

export const StatusFilter = () => {
  const dispatch = useDispatch();
  // Отримуємо значення фільтра із стану Redux
  const filter = useAppSelector(selectTodosFilterStatus);
  return (
    <div>
      <Button
        onClick={() =>
          dispatch(todosActions.changeStatusFilter(statusFilters.all))
        }
        selected={filter === statusFilters.all}
      >
        All
      </Button>
      <Button
        onClick={() =>
          dispatch(todosActions.changeStatusFilter(statusFilters.active))
        }
        selected={filter === statusFilters.active}
      >
        Active
      </Button>
      <Button
        onClick={() =>
          dispatch(todosActions.changeStatusFilter(statusFilters.completed))
        }
        selected={filter === statusFilters.completed}
      >
        Completed
      </Button>
    </div>
  );
};
