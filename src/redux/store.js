import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./testSlice";
import translateReducer from "./translateSlice";

export default configureStore({ reducer: translateReducer });
