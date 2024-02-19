import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    // validation schema for form field
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        let response = await login(values.username, values.password);
        // To check login success or failure to navigate
        if (response) {
          toast.success('Login Successful',response.message);
          navigate('/home');
        } else {
          toast.error('Login Failed');
        }
      } catch (error) {
        toast.error('An error occurred during login');
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-sm w-full p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-6">
          <svg
            className="w-12 h-12 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14l9-5-9-5-9 5 9 5z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-semibold text-center text-gray-800">Sign in</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-6">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              autoComplete="username"
              className="w-full px-4 py-3 rounded-md bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500 mt-1">{formik.errors.username}</div>
            )}
          </div>
          <div className="mt-4">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-md bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 mt-1">{formik.errors.password}</div>
            )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-3 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default LoginForm;
