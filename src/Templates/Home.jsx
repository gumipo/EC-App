import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId, getUserName } from "../reducks/Users/selector";
import { signOut } from "../reducks/Users/operations";

const Home = () => {
  const dispatch = useDispatch();

  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const username = getUserName(selector);

  return (
    <div>
      <h2>Home</h2>
      <p>ユーザーID:{uid}</p>
      <p>ユーザー名:{username}</p>

      <button onClick={() => dispatch(signOut())}>ログアウト</button>
    </div>
  );
};
export default Home;
