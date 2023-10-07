import { toast } from 'react-toastify';

export const useToast = () => {
    const getToastType = (type) => {
        return type.toLowerCase();
    };

    const showToast = (text, type = 'info') => {
        toast[getToastType(type)](text);
    };

    return {
        showToast,
    };
}