import TodosContextProvider from '../../contexts/TodosContext';
import AddTodo from './AddTodo';
import Todos from './Todos';
import styles from '../../styles/MainSheet.module.css';

const Main = () => (
  <div className={styles.sheet}>
    <TodosContextProvider>
      <div className={styles.content}>
        <Todos />
      </div>
      <AddTodo styles={styles} />
    </TodosContextProvider>
  </div>
);

export default Main;
