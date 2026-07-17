import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface wishlistState {
  items: any[];
  loading: boolean;
}

const initialState: wishlistState = {
  items: [],
  loading: false,
};

// get wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId: String) => {
    const res = await fetch("/api/wishlist/getwish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const result = await res.json();
    return result.data;
  },
);

// add wishlist
export const addWishlist = createAsyncThunk(
  "wishlist/addwishlist",
  async ({ userId, productId }: { userId: string; productId: string }) => {
    await fetch("/api/wishlist/addwish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, productId }),
    });
    return userId;
  },
);

// delete wishlist
export const deleteWishlist = createAsyncThunk(
  "wishlist/deleteWishlist",
  async ({userId, productId} : {userId: string; productId: string}) =>{
    const res = await fetch("/api/wishlist/addwish", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userId, productId})
    })
    return await res.json();
  },
)

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) =>{
    builder
      // fetch wishlist
      .addCase(fetchWishlist.pending, (state)=>{
        state.loading = true
      })
      .addCase(fetchWishlist.fulfilled, (state, action)=>{
        state.loading = false,
        state.items = action.payload
      })
      .addCase(fetchWishlist.rejected, (state)=>{
        state.loading = true
      })

      // add wishlist
      .addCase(addWishlist.fulfilled, (state, action)=>{})

      // delte wishlist
      .addCase(deleteWishlist.fulfilled, (state, action)=>{
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        )
      })
  }
});

export default wishlistSlice.reducer