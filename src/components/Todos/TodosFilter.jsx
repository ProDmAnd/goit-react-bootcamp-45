// Імпортуємо хук
import { useDispatch } from 'react-redux';
// Імпортуємо об'єкт значень фільтра
import { Button } from '@mui/material';
import { useAppSelector } from 'app/reduxHooks';
import { selectTodosFilterStatus } from 'app/todos/selectors';
import { todosActions } from 'app/todos/slice';
import { statusFilters } from 'constants/todosConstants';

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
        variant={filter === statusFilters.all ? 'contained' : 'outlined'}
      >
        All
      </Button>
      <Button
        onClick={() =>
          dispatch(todosActions.changeStatusFilter(statusFilters.active))
        }
        variant={filter === statusFilters.active ? 'contained' : 'outlined'}
      >
        Active
      </Button>
      <Button
        onClick={() =>
          dispatch(todosActions.changeStatusFilter(statusFilters.completed))
        }
        variant={filter === statusFilters.completed ? 'contained' : 'outlined'}
      >
        Completed
      </Button>
    </div>
  );
};
