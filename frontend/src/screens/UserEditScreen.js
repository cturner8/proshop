import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { ScreenContainer } from "../components/ScreenContainer";
import { FormContainer } from "../components/FormContainer";

import { getUserDetails, updateUser } from "../actions/user.actions";
import { USER_UPDATE_RESET } from "../constants/user.constants";

import { paths } from "../router/paths";

import { useForm, useUserDetailsState, useUserUpdateState } from "../hooks";

export const UserEditScreen = () => {
  const history = useHistory();
  const { id: userId } = useParams();
  const dispatch = useDispatch();

  const {
    user: { user = {} },
    loading,
    error,
  } = useUserDetailsState();

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useUserUpdateState();

  const [userData, handleChange, setUserData] = useForm({
    name: "",
    email: "",
    isAdmin: false,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const { _id, name, email, isAdmin } = userData;
    const updateData = {
      _id,
      name,
      email,
      isAdmin,
    };

    dispatch(updateUser(updateData));
  };

  useEffect(() => {
    dispatch(getUserDetails(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (user._id) {
      setUserData(user);
    }
  }, [user, setUserData]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push(paths.adminUserList);
    }
  }, [successUpdate, dispatch, history]);

  return (
    <>
      <Link to={paths.adminUserList} className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User Details</h1>
        <ScreenContainer
          variant="inline"
          loading={loading || loadingUpdate}
          error={error || errorUpdate}
        >
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="name"
                placeholder="Enter name"
                value={userData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                value={userData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="isAdmin">
              <Form.Check
                name="isAdmin"
                type="checkbox"
                label="Is admin?"
                checked={userData.isAdmin}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </ScreenContainer>
      </FormContainer>
    </>
  );
};
