import PropTypes from 'prop-types';
import React from 'react';
const Dialog = function Dialog(props) {
  let { title, content, children } = props;
  children = React.Children.toArray(children);
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>{title}</h2>
        <span>x</span>
      </div>
      <div>{content}</div>
      {children.length > 0 && <div>{children}</div>}

      <br />
    </div>
  );
};

/**
 * 属性规则校验
 */
Dialog.defaultProps = {
  title: '温馨提示',
};

Dialog.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
};

export default Dialog;
