import TodosContextProvider from '../../contexts/TodosContext';
import '../../styles/MainSheet.css';
import AddTodo from './AddTodo';
import Todos from './Todos';

const MainSheet = () => (
  <div className='sheet'>
    <TodosContextProvider>
      <div className='content-wrapper'>
        <h2>I need to...</h2>
        <Todos />
      </div>
      <AddTodo />
    </TodosContextProvider>
  </div>
);

export default MainSheet;
