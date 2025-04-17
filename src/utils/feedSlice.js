import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: null,
  },
  reducers: {
    addFeed: (state, action) => {
      state.feed = action.payload;
    },

    removeFeed: (state, action) => {
      console.log("Feed Handler called");
      const currFeed = JSON.parse(JSON.stringify(state.feed));
      const newFeed = currFeed?.filter((d) => d._id !== action.payload);
      // console.log("Curr Feed is :", currFeed);
      // console.log("New Feed is :",newFeed);
      state.feed = newFeed;
    },

    
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
