import { Renderable, Toast, toast, ValueOrFunction } from 'react-hot-toast';

export const displayErrorToast = (msg: string) => {
    toast.error(msg, {
        duration: 4000,
        style: {
            background: '#fff',
            color: '#222',
            borderRadius: '6px',
            fontSize: '18px',
            maxWidth: '500px',
            wordBreak: 'break-word',
        },
    });
};

export const displaySuccessToast = (msg: ValueOrFunction<Renderable, Toast>) => {
    toast.success(msg, {
        duration: 4000,
        style: {
            background: '#fff',
            color: '#222',
            borderRadius: '6px',
            fontSize: '18px',
            maxWidth: '500px',
            wordBreak: 'break-word',
        },
    });
};

export const displayLoadingToast = (msg: string) => {
    return toast.loading(msg, {
        style: {
            background: '#fff',
            color: '#222',
            borderRadius: '6px',
            fontSize: '18px',
            maxWidth: '500px',
            wordBreak: 'break-word',
        },
    });
};

export const closeToast = (toastId: string) => {
    toast.dismiss(toastId);
};
