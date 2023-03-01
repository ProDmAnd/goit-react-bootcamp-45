import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ success, error, ...restProps }) => {
  const className = success ? css.green : error ? css.red : css.button;
  return (
    <button
      {...restProps}
      className={[className, restProps.className].join(' ')}
    />
  );
};

Button.propTypes = {
  success: PropTypes.bool,
  error: PropTypes.bool,
};

export default Button;
