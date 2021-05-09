import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { paths } from "../router/paths";

export const SearchBox = () => {
  const history = useHistory();
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(paths.search(keyword));
    } else {
      history.push(paths.home);
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search products..."
        className="mr-sm-2 ml-sm-5"
      />
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};
