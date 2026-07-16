import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface cartState {
  items: any[];
  loading: boolean;
}

const initialState: cartState = {
  items: [],
  loading: false,
};

// get cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",

  async (userId: String) => {
    const res = await fetch("/api/getcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const data = await res.json();
    return data.data;
  },
);

// cart api
export const addCart = createAsyncThunk(
  "cart/addCart",
  async ({ userId, productId }: { userId: string; productId: string }) => {
    await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, productId }),
    });
    return userId;
  },
);

// increase api
export const increseCart = createAsyncThunk(
  "cart/increase",
  async ({ userId, productId }: { userId: string; productId: string }) => {
    await fetch("/api/cart/increase", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, productId }),
    });
    return userId;
  },
);

// increase api
export const decreseCart = createAsyncThunk(
  "cart/decrese",
  async ({ userId, productId }: { userId: string; productId: string }) => {
    await fetch("/api/cart/decrease", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, productId }),
    });
    return userId;
  },
);

// delete cart
export const deleteCart = createAsyncThunk(
  "cart/delete",
  async ({ userId, productId }: { userId: string; productId: string }) => {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productId,
      }),
    });
    return await res.json();
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder

      // get cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchCart.rejected, (state) => {
        state.loading = true;
      })

      // add
      .addCase(addCart.fulfilled, (state) => {})

      // increase
      .addCase(increseCart.fulfilled, (state) => {})

      // decrease
      .addCase(decreseCart.fulfilled, (state) => {})

      // deletecart
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
      });
  },
});

export default cartSlice.reducer;
