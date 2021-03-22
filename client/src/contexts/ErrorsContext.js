import { createContext, useState } from 'react';

export const ErrorsContext = createContext();

const ErrorsContextProvider = props => {
  const [errors, setErrors] = useState({ messages: [], toRender: null });

  const updateErrors = newErrors =>
    newErrors
      ? setErrors({
          messages: newErrors.map(err => err.message),
          toRender: (
            <div className='error'>
              {newErrors.map(err => (
                <p key={err.message}>{err.message}</p>
              ))}
            </div>
          )
        })
      : setErrors({ messages: [], toRender: null });

  return (
    <ErrorsContext.Provider value={{ errors, updateErrors }}>
      {props.children}
    </ErrorsContext.Provider>
  );
};

export default ErrorsContextProvider;
