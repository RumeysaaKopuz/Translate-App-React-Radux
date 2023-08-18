import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* 
?  bu method bizden iki parametre ister
* 1- methodun gorevini tanimlayan string deger 
* 2- bir fonksiyon
* > > bu fonksiyon async islemler yapar (veritabani sorgulari)
* > > api den gelen cevabi store a aktarmak icin return 
*/

// asenkron aksiyon thunk metodu bu sekilde olusturulur
export const getUsers = createAsyncThunk("getUsers", async () => {
  // asenkron islemler burada yapilir
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  console.log(res);
  // stora aktarmak istedigimiz degerler retun edilir
  return res.data;
});

const initialState = {
  users: [],
  isError: false,
  isLoading: true,
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  // thunk aksiyonlari ele almak icin reducers yerine extra reducers kullanilir
  extraReducers: {
    // getUsers methodunun uc durumu var
    // henuz api den cevap gelmediyse state i gunceller
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    // fulfilled -> basarili olma durumu (verilerin basarili bir sekilde thunk methodu ile return edildigi anlama geliyor)
    // eger api den gelen cevap olumluysa
    // payloadi action ile aliyorum
    [getUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.users = action.payload;
    },
    // eger apiden gelen cevap olumsuz ise(resjected = rededilme)
    [getUsers.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export default testSlice.reducer;
