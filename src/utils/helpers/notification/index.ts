import { toast, type ToastContent, type ToastOptions } from 'react-toastify';

/**
 * Configuration object for notification settings.
 */
export const notification = {
  modalFormErrorToast: {
    duration: 4000
  },
  reactToastify: {
    autoclose: 3000
  }
} as const;

/**
 * Displays a general notification using ReactToastify.
 *
 * @param content - The content of the notification.
 * @param type - The type of the notification (default, error, info, success, warning).
 * @param options - Additional options for the notification.
 */
export const showNotification = (
  content: ToastContent,
  type: 'default' | 'error' | 'info' | 'success' | 'warning' = 'default',
  options?: ToastOptions
): void => {
  toast(content, {
    autoClose: notification.reactToastify.autoclose,
    position: 'top-center',
    hideProgressBar: false,
    type,
    theme: 'colored',
    ...options
  });
};

/**
 * Displays a success notification using ReactToastify.
 *
 * @param content - The content of the notification.
 * @param options - Additional options for the notification.
 */
export const showSuccessNotification = (
  content: ToastContent,
  options?: ToastOptions
): void => {
  showNotification(content, 'success', {
    hideProgressBar: true,
    ...options
  });
};

/**
 * Displays an info notification using ReactToastify.
 *
 * @param content - The content of the notification.
 * @param options - Additional options for the notification.
 */
export const showInfoNotification = (
  content: ToastContent,
  options?: ToastOptions
): void => {
  showNotification(content, 'info', {
    hideProgressBar: true,
    ...options
  });
};

/**
 * Displays an error notification using ReactToastify.
 *
 * @param content - The content of the notification.
 * @param options - Additional options for the notification.
 */
export const showErrorNotification = (
  content: ToastContent,
  options?: ToastOptions
): void => {
  showNotification(content, 'error', {
    hideProgressBar: true,
    ...options
  });
};

/**
 * Displays a warning notification using ReactToastify.
 *
 * @param content - The content of the notification.
 * @param options - Additional options for the notification.
 */
export const showWarningNotification = (
  content: ToastContent,
  options?: ToastOptions
): void => {
  showNotification(content, 'warning', {
    hideProgressBar: true,
    ...options
  });
};
