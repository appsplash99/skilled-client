const defaultToastStyles = {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const toggleToast = (toast, toastType, messege) => {
  switch (toastType) {
    case "dark":
      return toast.dark(messege, { ...defaultToastStyles });

    case "success":
      return toast.success(messege, { ...defaultToastStyles });

    case "error":
      return toast.error(messege, { ...defaultToastStyles });

    case "warning":
      return toast.warning(messege, { ...defaultToastStyles });

    case "info":
      return toast.info(messege, { ...defaultToastStyles });

    default:
      return toast(messege, { ...defaultToastStyles });
  }
};
