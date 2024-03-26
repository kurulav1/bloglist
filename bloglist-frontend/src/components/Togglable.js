import { useState, useImperativeHandle, forwardRef } from 'react';
import './Togglable.css'; // Import custom CSS

const Togglable = forwardRef((props, ref) => {
  const { defaultVisible = false } = props;
  const [visible, setVisible] = useState(defaultVisible);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <div className="togglable-container">
      <div className={visible ? 'd-none' : ''}>
        <button onClick={toggleVisibility} className="btn btn-primary">{props.buttonLabel}</button>
      </div>
      {visible && (
        <div className="togglable-content">
          {props.children}
          <button onClick={toggleVisibility} className="btn btn-secondary">Cancel</button>
        </div>
      )}
    </div>
  );
});

export default Togglable;
