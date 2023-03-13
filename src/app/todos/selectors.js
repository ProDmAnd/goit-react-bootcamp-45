const todoSelectors = {
  /** @param {RootState} state */
  getTodos: state => state.todos.todos,
  /** @param {RootState} state */
  getIsLoading: state => state.todos.isLoading,
  /** @param {RootState} state */
  getError: state => state.todos.error,
};

export default todoSelectors;
