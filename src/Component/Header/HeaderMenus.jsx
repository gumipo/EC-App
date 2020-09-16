import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsInCart } from "../../reducks/Users/selector";
import { db } from "../../Firebase/index";
import { getUserId } from "../../reducks/Users/selector";

//import materialUI
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavariteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import { fetchProductsInCart } from "../../reducks/Users/operations";

const HeaderMenus = (props) => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const uid = getUserId(selector);
  let ProductsInCart = getProductsInCart(selector);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(uid)
      .collection("cart")
      .onSnapshot((snapshots) => {
        snapshots.docChanges().forEach((change) => {
          const product = change.doc.data();
          const changeType = change.type;
          switch (changeType) {
            case "added":
              ProductsInCart.push(product);
              break;
            case "modified":
              const index = ProductsInCart.findIndex(
                (product) => product.cartId === change.doc.id
              );
              ProductsInCart[index] = product;
              break;
            case "removed":
              ProductsInCart = ProductsInCart.filter(
                (product) => product.cartId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });
        dispatch(fetchProductsInCart(ProductsInCart));
      });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <IconButton>
        <Badge badgeContent={ProductsInCart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavariteBorderIcon />
      </IconButton>
      <IconButton
        onClick={(event) => {
          props.handleDrawerToggle(event);
        }}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};
export default HeaderMenus;
