import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';
import { getUsers } from '../../actions/users';
import EditIcon from '@material-ui/icons/Edit';
import {Button} from '@material-ui/core/';
import { Link } from "react-router-dom";

const Profile = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(getUsers());
  }, [currentId, dispatch]);
  const users = useSelector((state) => state.users);
  return (
    <Grow in>
      <Container>
      {users.filter(p => p._id === user?.result?._id )
            .map((user) => (
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={7}>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.email}</p>
            <Button size="small" color="secondary" component={Link}
            to="/edit">
              <EditIcon fontSize="small" /> Edit
            </Button>
        </Grid>
        </Grid>
      ))}
      </Container>
    </Grow>
  );
};

export default Profile;
