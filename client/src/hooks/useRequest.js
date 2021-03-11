import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ErrorsContext } from '../contexts/ErrorsContext';

const useRequest = ({
  url,
  method = 'get',
  body = null,
  withEffect = false,
  onSuccess = null
}) => {
  const [isPending, setIsPending] = useState(false);
  const { updateErrors } = useContext(ErrorsContext);

  const request = async () => {
    try {
      setIsPending(true);
      updateErrors(null);

      const response = await axios[method](url, body && { ...body });
      setIsPending(false);

      if (onSuccess) onSuccess(response.data);
    } catch (err) {
      setIsPending(false);

      err.response.data.errors
        ? updateErrors(err.response.data.errors)
        : updateErrors([{ message: 'Something went wrong' }]);
    }
  };

  useEffect(() => {
    if (withEffect) request();
  }, []);

  return { request, isPending };
};

export default useRequest;
