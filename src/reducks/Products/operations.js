import { db, FirebaseTimestamp } from "../../Firebase";
import { push } from "connected-react-router";

const productsRef = db.collection("products");

export const saveProduct = (
  name,
  description,
  category,fesaaaaaaaaaaa
  gender,
  price,
  images
) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      category: category,
      description: description,
      gender: gender,
      name: name,
      images: images,
      //10進数に変える
      price: parseInt(price, 10),
      updated_at: timestamp,
    };
    const ref = productsRef.doc();
    const id = ref.id;
    data.id = id;
    data.created_at = timestamp;

    return productsRef
      .doc(id)
      .set(data)
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
