import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsInCart } from "../reducks/Users/selector";
import { makeStyles } from "@material-ui/styles";
import { CartListItem } from "../Component/Products/index";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { PrimaryButton, TextDetail } from "../Component/UIkit";
import { orderProduct } from "../reducks/Products/operations";

const useStyles = makeStyles((theme) => ({
  detailBox: {
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      width: 512,
    },
  },
  orderBox: {
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: 4,
    boxShadow: "0 4px 2px 2px rgba(0,0,0,0.2)",
    height: 256,
    margin: "24px auto 24px auto",
    padding: 16,
    width: 288,
  },
}));

const OrderConfirm = () => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector);
  const dispatch = useDispatch();
  console.log(productsInCart);

  //ProductInCartの値が変わる度に商品の合計金額を計算する
  const subTotal = useMemo(() => {
    return productsInCart.reduce((sum, product) => (sum += product.price), 0);
  }, [productsInCart]);

  //送料
  const shippingFee = subTotal >= 10000 ? 0 : 210;
  //消費税
  const tax = (subTotal + shippingFee) * 0.1;
  //合計
  const total = subTotal + shippingFee + tax;

  const order = useCallback(() => {
    dispatch(orderProduct(productsInCart, total));
  }, [productsInCart, total]);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">注文の確認</h2>
      <div className="p-grid__row">
        <div className={classes.detailBox}>
          <List>
            {productsInCart.length > 0 &&
              productsInCart.map((product) => (
                <CartListItem key={product.cartId} product={product} />
              ))}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail
            label={"商品の合計金額"}
            value={"¥" + subTotal.toLocaleString()}
          />
          <TextDetail
            label={"送料"}
            value={"¥" + shippingFee.toLocaleString()}
          />
          <TextDetail label={"消費税"} value={"¥" + tax.toLocaleString()} />
          <Divider />
          <TextDetail
            label={"合計(税込)"}
            value={"¥" + total.toLocaleString()}
          />
          <PrimaryButton label={"注文する"} onClick={order} />
        </div>
      </div>
    </section>
  );
};
export default OrderConfirm;
