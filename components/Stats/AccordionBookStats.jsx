import React, { useState } from 'react';

export default function AccordionBookStats({ bookStats }) {
  const [isActive, setIsActive] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsActive(!isActive);
    }
  };

  // Needs year, total count, (entire book data) image url

  return (
    <div>
      <div className="accordion-item" key={Math.random()}>
        <div
          role="menuitem"
          tabIndex={0}
          className="accordion-title"
          onClick={() => setIsActive(!isActive)}
          // onKeyDown={handleKeyDown}
        >
          {/* {years.map(year => (
            <div>{year}</div>
          ))} */}
          <div>year</div>

          <div>{isActive ? '-' : '+'}</div>
        </div>
        {isActive && <div className="accordion-content">Content</div>}
      </div>
    </div>
  );
}

