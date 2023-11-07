import Axios from "axios";
import { ipa } from "../Aipi";

// APIs to be added from provided documentation

export const storeNewTodo = (username, todoname, thenAction) => {
  Axios.post(ipa.ipl + "/", {
    userName: username,
    todoName: todoname,
    completeStatus: false,
  })
    .then(() => {
      thenAction();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserTodos = (username, thenWithDataAction) => {
  Axios.get(ipa.ipl + "/", {
    params: {
      userName: username,
    },
  }).then((resp) => {
    if (resp.data.length > 0) {
      const respdata = resp.data;
      thenWithDataAction(respdata);
    }
  });
};

export const updateTodo = (newTodoName, todoId, thenAction) => {
  Axios.put(ipa.ipl + "/", {
    newTodoName: newTodoName,
    todoId: todoId,
  }).then(() => {
    thenAction();
  });
};

export const toggleTodo = (newCompleteStatus, todoId, thenAction) => {
  Axios.put(ipa.ipl + "/", {
    newCompleteStatus: newCompleteStatus,
    todoId: todoId,
  }).then(() => {
    thenAction();
  });
};

export const deleteTodo = (todoId, thenAction) => {
  Axios.delete(ipa.ipl + `/`).then(() => {
    thenAction();
  });
};
