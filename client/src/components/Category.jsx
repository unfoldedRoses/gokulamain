import React from "react";
import { Link } from "react-router-dom";
import styles from "./category.module.css";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import { baseURL } from "../api/AxiosInstance";
const Category = () => {
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, products } = categoryList;
  return (
    <div className="mx-md-5 px-md-5">
  
      <div className={styles.category}>
        {products?.map((product) => {
          return (
            <Link to={`/categoryProducts/${product?._id}`} key={product?._id} className={styles.category_item}>
              <div className="">
                <Image
                  roundedCircle
                  width={100}
                  height={100}
                  src={`${baseURL}/${product?.image}`}
                  alt=""
                />
              </div>
              <span className={styles.categoryH1}>{product?.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
