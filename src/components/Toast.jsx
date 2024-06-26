import { Slide, toast } from "react-toastify";

export default function Toast() {
    const toastInfo = (message) =>
        toast.info(message, {
            position: "top",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });

    const toastSuccess = (message) =>
        toast.success(message, {
            position: "top",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });

    const toastError = (message) =>
        toast.error(message, {
            position: "top",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });

    const toastWarning = (message) =>
        toast.warn(message, {
            position: "top",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });

    return { toastInfo, toastError, toastSuccess, toastWarning };
}
