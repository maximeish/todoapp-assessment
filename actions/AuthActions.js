import Axios from "axios";
import { ipa } from "../Aipi";

export const storeUserData = (fullname, email, password, thenAction) => {
  Axios.post(ipa.ipl + "/signup", {
    fullname,
    email,
    password,
  })
    .then(() => {
      thenAction();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const checkIfEmailTaken = (email, takenAction, notTakenAction) => {
  Axios.get(ipa.ipl + "/check-email", {
    params: {
      email,
    },
  }).then((res) => {
    if (res.data.length > 0) {
      takenAction();
    } else {
      notTakenAction();
    }
  });
};

export const authenticateUser = (
  email,
  password,
  authedAction,
  notAuthedAction,
  notAUserAction
) => {
  Axios.get(ipa.ipl + "/authenticateUser", {
    params: {
      email,
    },
  }).then((res) => {
    if (res.data.length > 0) {
      if (res.data[0].email === email && res.data[0].password === password) {
        authedAction();
      } else {
        notAuthedAction();
      }
    } else {
      notAUserAction();
    }
  });
};
