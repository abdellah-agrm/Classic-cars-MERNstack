import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notificationOptions = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

const Notif = {
  success: (message) => toast.success(message, notificationOptions),
  error: (message) => toast.error(message, notificationOptions),
  warning: (message) => toast.warn(message, notificationOptions),
  info: (message) => toast.info(message, notificationOptions)
};

export default Notif;
