import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { getUserId, getUserName } from "../reducks/Users/selector";

const Home = () => {
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const username = getUserName(selector);

  const dispatch = useDispatch();

  return (
    <div>
      <h2>Home</h2>
      <p>ユーザーID:{uid}</p>
      <p>ユーザー名:{username}</p>

      <button onClick={() => dispatch(push("/login"))}>ログアウト</button>
    </div>
  );
};
export default Home;
