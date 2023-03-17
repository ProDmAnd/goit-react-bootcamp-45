import { initializeApp } from '@firebase/app';
import {
    get,
    getDatabase,
    onChildAdded,
    onValue,
    push,
    ref,
    set,
    update
} from '@firebase/database';
import store from 'app/store';
import { todosActions } from 'app/todos/slice';
import { TodoFabric } from './models/todos';

const firebaseConfig = {
  databaseURL: process.env.REACT_APP_DB_URL,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const readDb = () => {
  const starCountRef = ref(db, '/');
  onValue(starCountRef, snapshot => {
    const data = snapshot.val();
    console.debug(data);
  });
  //   listenTodos();
};
const todos = ref(db, 'todos');

onChildAdded(todos, snapshot => {
  console.log(snapshot.val(), new Date().toISOString());
  store.dispatch(
    todosActions.addTodo(TodoFabric({ id: snapshot.key, ...snapshot.val() }))
  );
});

export const createTodo = ({ title, message }) => {
  const todo = TodoFabric({ title, message });
  delete todo.id;
  const todoList = push(todos);
  set(todoList, todo);
};

export const updateTodo = (id, todoUpdate) => {
  const currentTodo = ref(db, `todos/${id}`);
  update(currentTodo, todoUpdate);
};

function listenTodos() {
  onValue(todos, snapshot => {
    store.dispatch(
      todosActions.setTodos(
        Object.entries(snapshot.val() || {}).map(([id, todo]) =>
          TodoFabric({ id, ...todo })
        )
      )
    );
  });
}

export function getAllTodos() {
  return new Promise(resolve => {
    get(todos)
      .then(snapshot => {
        if (snapshot.exists()) {
          resolve(
            Object.entries(snapshot.val() || {}).map(([id, todo]) =>
              TodoFabric({ id, ...todo })
            )
          );
          return;
        }
        resolve([]);
      })
      .catch(error => {
        resolve([]);
      });
  });
}
