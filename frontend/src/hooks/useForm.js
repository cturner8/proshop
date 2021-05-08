import { useCallback, useState, useMemo } from "react";

export const useForm = (initialValues) => {
  const initial = useMemo(() => initialValues, [initialValues]);
  const [values, setValues] = useState(initial);
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
  const set = useCallback((v) => {
    setValues(v);
  }, []);

  return [values, handleChange, set];
};
