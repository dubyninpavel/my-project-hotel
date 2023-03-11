import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children, navigateTo }) =>
  isLoggedIn ? children : <Navigate to={navigateTo} />;

ProtectedRoute.propTypes = {
  isLoggedIn: PropTypes.bool,
  children: PropTypes.object,
  navigateTo: PropTypes.string,
};

export default ProtectedRoute;
