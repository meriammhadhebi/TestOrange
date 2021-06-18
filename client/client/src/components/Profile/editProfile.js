import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Icon, Fab, IconButton} from "@material-ui/core";
import { useDispatch } from 'react-redux';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router";
import { updateUser } from '../../actions/users';

export default function EditProfile() {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const [userData, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  useEffect(async () => {
    const uppdateuser = await axios
      .get(`http://localhost:5000/user/${user?.result?._id}`)
      .then(function (response) {
        setUser(response.data);
      });
  }, []);
  const history = useHistory();
  //*************update profile*************
  const Submit = async (e) => {
    dispatch( updateUser(userData));
     };
  //*************Form validation*************
  const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required("Please provide a firstName ")
      .max(10, "name Too Long!"),
    lastName: yup
      .string()
      .required("Please provide a lastName ")
      .max(10, "name Too Long!"),
    email: yup
      .string()
      .matches(emailRegExp,'Email is not valid'),
    password: yup
      .string()
      .required('Please Enter your password')
      .matches(passwordRegExp,"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  return (
      <form
        onSubmit={handleSubmit(Submit)}
        noValidate
        autoComplete="off"
        className="add_form"
      >
        <div className="fields" style={{display:'flex',flexDirection:'column'}}>
            <div className="card">
            <TextField
                {...register("firstName")}
                placeholder="first Name.."
                multiline
                fullWidth
                rows="2"
                margin="none"
                disableUnderline
                value={userData.firstName}
                onChange={(e) =>
                setUser({ ...userData, firstName: e.target.value })
                }
            />
            <p style={{ color: "red", marginLeft: "10px" }}>
                {errors.firstName?.message}
            </p>
            </div>
            <div className="card">
            <TextField
                {...register("lastName")}
                placeholder="lastName.."
                multiline
                fullWidth
                rows="2"
                margin="none"
                disableUnderline
                value={userData.lastName}
                onChange={(e) =>
                setUser({ ...userData, lastName: e.target.value })
                }
            />
            <p style={{ color: "red", marginLeft: "10px" }}>
                {errors.lastName?.message}
            </p>
            </div>
            <div className="card">
            <TextField
                {...register("email")}
                placeholder="email"
                multiline
                fullWidth
                rows="2"
                margin="none"
                disableUnderline
                value={userData.email}
                onChange={(e) =>
                setUser({ ...userData, email: e.target.value })
                }
            />
            <p style={{ color: "red", marginLeft: "10px" }}>
                {errors.email?.message}
            </p>
            </div>
            <div className="card">
            {/* <TextField
                {...register("password")}
                placeholder="password"
                multiline
                fullWidth
                rows="2"
                margin="none"
                disableUnderline
                value={userData.password}
                onChange={(e) =>
                setUser({ ...userData, password: e.target.value })
                }
            /> 
            <p style={{ color: "red", marginLeft: "10px" }}>
                {errors.password?.message}
            </p>*/}
            </div>
        </div>
        
        <div >
          <Button className="btn" aria-label="add" type="submit">
            Edit
          </Button>
        </div>
      </form>
  );
}
