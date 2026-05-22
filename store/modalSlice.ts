import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  cartOpen : false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
     cartModal: (state) => {
      state.cartOpen = !state.cartOpen;
    },


  },
});

export const { openModal, closeModal, toggleModal,cartModal } = modalSlice.actions;
export default modalSlice.reducer;