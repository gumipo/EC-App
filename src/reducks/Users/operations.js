import { signInAction } from "./actions";
import { push } from "connected-react-router";

export const signIn = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;

    if (!isSignedIn) {
      const url = "http://api.github.com/users/gumipo";

      const response = await fetch(url)
        .then((res) => res.json())
        .catch(() => null);

      const username = response.login;
      dispatch(
        signInAction({
          isSignedIn: true,
          uid: "0006",
          username: username,
        })
      );
      dispatch(push("/"));
    }
  };
};
