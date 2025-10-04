import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../index"

interface ModalState {
  isModalOpen: boolean
}

const initialState: ModalState = {
  isModalOpen: false,
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen
    },
  },
})

export const { toggleModal } = modalSlice.actions

export const selectIsModalOpen = (state: RootState) => state.modal.isModalOpen

export default modalSlice.reducer
