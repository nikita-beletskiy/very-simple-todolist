import TodosContextProvider from '../../contexts/TodosContext';
import AddTodo from './AddTodo';
import Todos from './Todos';

// Optimizing todolist view for mobile devices
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
const vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  // eslint-disable-next-line no-shadow
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

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
