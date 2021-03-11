import { createContext, useState } from 'react';

export const ErrorsContext = createContext();

const ErrorsContextProvider = props => {
  const [errors, setErrors] = useState(null);

  const updateErrors = newErrors =>
    newErrors
      ? setErrors(
          <div className='error'>
            {newErrors.map(err => (
              <p key={err.message}>{err.message}</p>
            ))}
          </div>
        )
      : setErrors(newErrors);

  return (
    <ErrorsContext.Provider value={{ errors, updateErrors }}>
      {props.children}
    </ErrorsContext.Provider>
  );
};

export default ErrorsContextProvider;
