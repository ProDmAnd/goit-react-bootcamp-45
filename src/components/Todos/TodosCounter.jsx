import { useAppSelector } from 'app/reduxHooks';
import { selectTaskCountOptimized } from 'app/todos/selectors';
import { memo } from 'react';
import css from './TodosCounter.module.css';

export const TodosCounter = memo(() => {
  //   const todos = useAppSelector(selectTodos);
  const { active, completed } = useAppSelector(selectTaskCountOptimized);
  //   const { active, completed } = todos.reduce(
  //     (acc, task) => {
  //       if (task.completed) {
  //         acc.completed += 1;
  //       } else {
  //         acc.active += 1;
  //       }
  //       return acc;
  //     },
  //     { active: 0, completed: 0 }
  //   );

  return (
    <div>
      <p className={css.text}>Active: {active}</p>
      <p className={css.text}>Completed: {completed}</p>
    </div>
  );
});
