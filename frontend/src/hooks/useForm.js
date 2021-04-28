import { useCallback, useState } from "react";

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const handleChange = useCallback((e) => {
    const { name, value, checked } = e.target;
    let newValue = "";

    if (e.target.hasOwnProperty("checked")) {
      newValue = checked;
    } else {
      newValue = value;
    }

    setValues((oldValues) => ({
      ...oldValues,
      [name]: newValue,
    }));
  }, []);
  const reset = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);
  const set = useCallback((v) => {
    setValues(v);
  }, []);

  return [values, handleChange, set, reset];
};
