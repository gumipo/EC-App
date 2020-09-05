import { db, FirebaseTimestamp } from "../../Firebase";
import { push } from "connected-react-router";
import { fetchProductsAction } from "./actions";
import { deleteProductAction } from "./actions";

const productsRef = db.collection("products");

//Productの削除

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productsRef
      .doc(id)
      .delete()
      .then(() => {
        const prevProducts = getState().products.list;
        const nextProducts = prevProducts.filter(
          (product) => product.id !== id
        );
        dispatch(deleteProductAction(nextProducts));
      });
  };
};

//firestoreからProducts情報を取得してactionsに投げる
export const fetchProducts = () => {
  return async (dispatch) => {
    //更新日付順に並び替える
    productsRef
      .orderBy("updated_at", "desc")
      .get()
      .then((snapshots) => {
        const productList = [];
        snapshots.forEach((snapshot) => {
          const product = snapshot.data();
          productList.push(product);
        });
        dispatch(fetchProductsAction(productList));
      });
  };
};

//firebaseに情報を登録
export const saveProduct = (
  id,
  name,
  description,
  category,
  gender,
  price,
  images,
  sizes
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
      sizes: sizes,
      updated_at: timestamp,
    };

    //編集の場合
    if (id === "") {
      const ref = productsRef.doc();
      id = ref.id;
      data.id = id;
      data.created_at = timestamp;
    }

    return productsRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
