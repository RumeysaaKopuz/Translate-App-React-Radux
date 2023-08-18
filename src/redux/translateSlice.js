import { createSlice } from "@reduxjs/toolkit";
import { getLanguages, getAnswer } from "./action";

const initialState = {
  languages: [],
  answer: "",
  isLoading: true,
  isError: false,
};

const translateSlice = createSlice({
  name: "translate",
  initialState,
  // thunk'ta "reducers" yerine "extraReducers" kullanılır
  extraReducers: {
    [getLanguages.pending]: (state) => {
      state.isLoading = true;
    },

    [getLanguages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.languages = action.payload;
    },

    [getLanguages.rejected]: (state, action) => {
      state.isError = "Diller'i alırken bir hata oluştu";
    },

    // çeviri isteklerini yönetme
    [getAnswer.pending]: (state) => {
      state.isLoading = true;
    },

    [getAnswer.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.answer = action.payload;
    },

    [getAnswer.rejected]: (state) => {
      state.isLoading = false;
      state.isError = "Çeviriken bir hata oluştu";
    },
  },
  //   normal bir aksiyon
  reducers: {
    clearAnswer: (state) => {
      state.answer = "";
    },
  },
});

export const { clearAnswer } = translateSlice.actions;

export default translateSlice.reducer;
