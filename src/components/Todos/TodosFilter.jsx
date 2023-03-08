// Імпортуємо хук
import Button from 'components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
// Імпортуємо об'єкт значень фільтра
import { statusFilters } from 'app/constants';
import { changeTodoFilterAction } from 'app/store';
export const StatusFilter = () => {
  const dispatch = useDispatch();
  // Отримуємо значення фільтра із стану Redux
  const filter = useSelector(state => state.filters.status);
  return (
    <div>
      <Button
        onClick={() => dispatch(changeTodoFilterAction(statusFilters.all))}
        selected={filter === statusFilters.all}
      >
        All
      </Button>
      <Button
        onClick={() => dispatch(changeTodoFilterAction(statusFilters.active))}
        selected={filter === statusFilters.active}
      >
        Active
      </Button>
      <Button
        onClick={() =>
          dispatch(changeTodoFilterAction(statusFilters.completed))
        }
        selected={filter === statusFilters.completed}
      >
        Completed
      </Button>
    </div>
  );
};
