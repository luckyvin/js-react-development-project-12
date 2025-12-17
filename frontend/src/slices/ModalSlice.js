import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAddShow: false,
  isEditShow: false,
  isDeleteShow: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    changeAddModal: (state, { payload }) => {
      state.isAddShow = payload
    },
    changeEditModal: (state, { payload }) => {
      state.isEditShow = payload
    },
    changeDeleteModal: (state, { payload }) => {
      state.isDeleteShow = payload
    },
  },
})

export const { changeAddModal, changeEditModal, changeDeleteModal } = modalSlice.actions

export const selectIsAddShow = state => state.modal.isAddShow
export const selectIsEditShow = state => state.modal.isEditShow
export const selectIsDeleteShow = state => state.modal.isDeleteShow

export default modalSlice.reducer
