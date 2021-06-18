import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';
import { getUsers,deleteUser } from '../../actions/users';
import DeleteIcon from '@material-ui/icons/Delete';
import {Button} from '@material-ui/core/';

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [currentId, dispatch]);
  const users = useSelector((state) => state.users);
  return (
    <Grow in>
      <Container>

        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
        {users.filter(p=>p.archive!='true').map((user) => (
        <Grid item xs={12} sm={7}>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.email}</p>
            <p>{user.archive}</p>
            <Button size="small" color="secondary" onClick={() => dispatch(deleteUser(user._id))}>
              <DeleteIcon fontSize="small" /> Delete
            </Button>
        </Grid>
        ))}
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
