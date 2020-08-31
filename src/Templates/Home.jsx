import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  console.log(selector.router);
  return (
    <div>
      <h2>Home</h2>

      <button onClick={() => dispatch(push("/login"))}>ログアウト</button>
    </div>
  );
};
export default Home;
