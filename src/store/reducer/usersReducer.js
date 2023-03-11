import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    password: '',
    foundHotels: [],
    favoritesHotels: [],
    favoritesHotelId: [],
    errors: '',
  },
  reducers: {
    addUser: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    addFoundHotels: (state, action) => {
      state.foundHotels = action.payload;
    },
    addFavoritesHotels: (state, action) => {
      state.favoritesHotels.push(action.payload);
    },
    removeFavoritesHotels: (state, action) => {
      state.favoritesHotels = state.favoritesHotels.filter(
        ({ hotelId }) => Number(hotelId) !== Number(action.payload),
      );
    },
    addFavoritesHotelId: (state, action) => {
      state.favoritesHotelId.push(action.payload);
    },
    removeFavoritesHotelId: (state, action) => {
      state.favoritesHotelId = state.favoritesHotelId.filter(
        (hotelId) => Number(hotelId) !== Number(action.payload),
      );
    },
    sortFavoritesHotelsDescending: (state, action) => {
      state.favoritesHotels.sort(
        (a, b) => a[action.payload] - b[action.payload],
      );
    },
    sortFavoritesHotelsAscending: (state) => {
      state.favoritesHotels.reverse();
    },
    addErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const {
  addUser,
  addFoundHotels,
  addFavoritesHotels,
  removeFavoritesHotels,
  addFavoritesHotelId,
  removeFavoritesHotelId,
  sortFavoritesHotelsDescending,
  sortFavoritesHotelsAscending,
  addErrors,
} = userSlice.actions;

export default userSlice.reducer;
