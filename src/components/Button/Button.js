import React, { forwardRef } from 'react';
import styles from './button.module.scss';
import classnames from 'classnames';

export const buttonTypes = {
  toAdd: 'toAdd',
  toUpdate: 'toUpdate',
  toDelete: 'toDelete',
  toCancel: 'toCancel',
};

const Button = forwardRef((props, ref) => {
  let { type, kind, children, ...rest } = props;
  type = type === 'submit' ? 'submit' : 'button'
  kind = !kind ? 'toAdd' : kind
  return (
    <button type={type}
      className={classnames(
        styles.button,
        styles[`button__${buttonTypes[kind]}`],
      )}
      {...rest} ref={ref}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;