import { toast } from "react-toastify";
import {
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from "../constants/categoryConstant";

export const categoryListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, products: [] };
    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.Categorys,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case CATEGORY_DELETE_SUCCESS:
      toast.success("Category deleted successfully");
      return { loading: false, success: true };
    case CATEGORY_DELETE_FAIL:
      toast.error("Category delete failed");
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
