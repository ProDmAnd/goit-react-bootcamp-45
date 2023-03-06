import Button from 'components/Button/Button';
import { useToggle } from 'hooks/useToggle';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { Component, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { getTodos } from 'services/api/todosApi';
import ErrorBoundary from '../ErrorBoundary';
import Form from '../Form';
import Modal from '../Modal';
import TodoList from './TodoList';

const todosStorageKey = 'todos';

class Todos1 extends Component {
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (prevState.todos?.length > 10) {
  //     const copy = [...prevState.todos];
  //     copy.length = 10;
  //     return {
  //       todos: copy,
  //     };
  //   }
  //   return null;
  // }

  state = {
    todos: [],
    search: '',
    modalVisible: false,
  };

  componentDidMount() {
    const savedTodos = localStorage.getItem(todosStorageKey);
    if (savedTodos) {
      this.setState({ todos: JSON.parse(savedTodos) });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('Snapshot', snapshot);
    localStorage.setItem(todosStorageKey, JSON.stringify(this.state.todos));
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return { snapshot: prevState.todos.length };
  }

  addTodo = text => {
    this.setState(prev => ({
      todos: [...prev.todos, { id: Math.random(), text }],
    }));
    this.closeModal();
  };

  onSearch = ({ target: { value } }) => this.setState({ search: value });

  deleteTodo = id =>
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => todo.id !== id),
    }));

  filterTodos = () =>
    this.state.todos.filter(({ text }) =>
      text.toLowerCase().includes(this.state.search.toLowerCase())
    );

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const filteredTodos = this.filterTodos();
    return (
      <>
        <div
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#010101',
            gap: 15,
          }}
        >
          {this.state.modalVisible && (
            <Modal onClose={this.closeModal}>
              <ErrorBoundary
              // fallbackComponent={(error, info) => (
              //   <div>
              //     Form was broken: {error.message} <p>{info.componentStack}</p>
              //   </div>
              // )}
              >
                <Form onSubmit={this.addTodo} />
              </ErrorBoundary>
            </Modal>
          )}
          <Button
            type="button"
            onClick={() => this.setState({ modalVisible: true })}
          >
            Show Modal
          </Button>
          <input value={this.state.search} onChange={this.onSearch} />
          <ErrorBoundary>
            <TodoList todos={filteredTodos} deleteTodo={this.deleteTodo} />
          </ErrorBoundary>
        </div>
      </>
    );
  }
}

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const handleSearch = useCallback(
    ({ target: { value } }) => setSearch(value),
    []
  );

  const addTodoModal = useToggle();

  const addTodo = () => {};

  const deleteTodo = () => {};

  const filteredTodos = useMemo(() => {
    return todos.filter(({ title }) =>
      title.toLowerCase().includes(search.toLowerCase())
    );
  }, [todos, search]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

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
          Show Modal
        </Button>
        <input value={search} onChange={handleSearch} />
        <ErrorBoundary>
          <TodoList todos={filteredTodos} deleteTodo={deleteTodo} />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Todos;
