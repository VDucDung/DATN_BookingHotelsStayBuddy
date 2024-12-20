import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default ToastProvider;
