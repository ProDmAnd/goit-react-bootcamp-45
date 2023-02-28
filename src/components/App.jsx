import { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';
import Form from './Form';
import Modal from './Modal';
import TodoList from './TodoList';

const todosStorageKey = 'todos';

class App extends Component {
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
          <button
            type="button"
            onClick={() => this.setState({ modalVisible: true })}
          >
            Show Modal
          </button>
          <input value={this.state.search} onChange={this.onSearch} />
          <ErrorBoundary>
            <TodoList todos={filteredTodos} deleteTodo={this.deleteTodo} />
          </ErrorBoundary>
        </div>
      </>
    );
  }
}

export default App;
