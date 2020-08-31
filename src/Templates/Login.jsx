import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { signInAcrion } from "../reducks/Users/actions";

const Login = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>ログイン</h2>
      <button
        onClick={() => {
          dispatch(signInAcrion({ uid: "0005", username: "gumipo" }));
          dispatch(push("/"));
        }}
      >
        ログイン
      </button>
    </div>
  );
};
export default Login;
