import { toast } from 'sonner'

type ToastType = 'success' | 'info' | 'error' | 'warning'

const DEFAULT_TITLES: Record<ToastType, string> = {
  success: 'Thành Công',
  info: 'Thông Tin',
  error: 'Lỗi',
  warning: 'Cảnh Báo',
}

interface ToastProps {
  type?: ToastType
  title?: string
  description?: string
  code?: string
}

export const showToast = ({ type = 'info', title, description, code }: ToastProps) => {
  toast[type](`${title ?? DEFAULT_TITLES[type]}!`, {
    description,
    action: code && <p className='fixed max-w-24 truncate top-2 right-2'>{code}</p>,
  })
}

export const showToastInfo = (description: string) => showToast({ type: 'info', description })
export const showToastSuccess = (description: string) => showToast({ type: 'success', description })
export const showToastWarning = (description: string) => showToast({ type: 'warning', description })
export const showToastError = (description: string) => showToast({ type: 'error', description })
// export const showToastError = (error: unknown) => {
//   const responseError = error as ResponseType<Error>;
//   const locale = Cookies.get(CORE_SETTING.LOCALE) ?? localeDefault;
//   const errorSeq = _.get(responseError, 'mess_seq');
//   const errorMsg = _.get(responseError, 'message', '');
//   const errorMsgLang = _.get(responseError, `mess_lang.${locale.toLowerCase()}`, errorMsg) || (error as string);
//   showToast({ type: 'error', description: errorMsgLang, code: errorSeq });
// };
