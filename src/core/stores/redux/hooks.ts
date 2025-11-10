import type { AppDispatch, RootState } from '@core/stores/redux'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

/**
 * Hook tùy chỉnh để sử dụng dispatch với kiểu dữ liệu đã định nghĩa
 * Cung cấp kiểu dữ liệu chính xác cho các thunk action
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()

/**
 * Hook tùy chỉnh để truy cập state với kiểu dữ liệu đã định nghĩa
 * Giúp TypeScript hiểu cấu trúc state để cung cấp gợi ý code
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
