
import React from 'react';

const CustomDropDownMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
            {children}
        </div>
      );
    },
  );

  export default CustomDropDownMenu;