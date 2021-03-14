import TodosContextProvider from '../../contexts/TodosContext';
import AddTodo from './AddTodo';
import Todos from './Todos';

const Main = () => (
  <div className='main-wrapper'>
    <TodosContextProvider>
      <div className='todos-wrapper'>
        <Todos />
      </div>
      <AddTodo />
    </TodosContextProvider>
  </div>
);

export default Main;
