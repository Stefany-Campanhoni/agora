import type { TypedUseSelectorHook } from "react-redux"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./index"

// Hook tipado para dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

// Hook tipado para selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
