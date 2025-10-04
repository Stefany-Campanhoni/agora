import { useAppDispatch, useAppSelector } from "../store/hooks"
import { toggleModal } from "../store/slices/modalSlice"

export function useModal() {
  const dispatch = useAppDispatch()
  const { isModalOpen } = useAppSelector((state) => state.modal)

  const handleToggleModal = () => {
    dispatch(toggleModal())
  }

  return {
    isModalOpen,
    toggleModal: handleToggleModal,
  }
}
