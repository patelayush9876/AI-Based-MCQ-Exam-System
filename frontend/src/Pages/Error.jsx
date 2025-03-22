import { Link, useLocation } from 'react-router-dom';

const Error = () => {

  const location = useLocation();
  const from = location.state?.from;

  const message = from
    ? "You don't have authorization to access this page"
    : "Oops... Something went wrong";
    
  return (
    <div className="error">
      <h1>Error 404</h1>
      <p>{message}</p>
      <Link to={'/'}>Go Home</Link>
    </div>
  )
}

export default Error