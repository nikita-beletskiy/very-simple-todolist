import axios from 'axios';
import { useEffect, useState } from 'react';

const useRequest = ({
  url,
  method = 'get',
  body = null,
  withEffect = false,
  onSuccess = null,
  onFailure = null
}) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const request = async () => {
    try {
      setIsPending(true);
      setError(null);
      const response = await axios[method](url, body && { ...body });
      setIsPending(false);

      if (onSuccess) onSuccess(response.data);
    } catch (err) {
      setIsPending(false);

      err.response ? setError(err.response.data.errors) : console.log(err);
      if (onFailure) onFailure(error.response.data.errors);
    }
  };

  useEffect(() => {
    if (withEffect) request();
  }, []);

  return { request, isPending, error };
};

export default useRequest;
