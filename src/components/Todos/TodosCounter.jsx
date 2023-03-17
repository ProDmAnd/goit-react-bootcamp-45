import { useAppSelector } from 'app/reduxHooks';
import { selectTaskCountOptimized } from 'app/todos/selectors';
import { memo } from 'react';
import css from './TodosCounter.module.css';

export const TodosCounter = memo(() => {
  const { active, completed } = useAppSelector(selectTaskCountOptimized);

  return (
    <div>
      <p className={css.text}>Active: {active}</p>
      <p className={css.text}>Completed: {completed}</p>
    </div>
  );
});
