import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const request = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body });

      if (onSuccess) onSuccess(response.data);

      return response.data;
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  return { request, errors };
};

export default useRequest;
