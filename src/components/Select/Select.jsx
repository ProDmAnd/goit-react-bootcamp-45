import React, { memo, useState } from 'react';
import s from './Select.module.css';

/**
 * 
@param {{
  title:string,
  selected:string,
  options: any[],
  onSelect:any,
}} param0 
 * @returns 
 */
const Select = ({
  title = '',
  selected = '',
  options,
  onSelect = () => {},
}) => {
  const [expanded, setExpanded] = useState(false);
  const selectOptions = Array.isArray(options) ? options : [];
  console.log(`Select ${title} rerender`);
  return (
    <>
      <div>
        Обраний {title}: {selected}
      </div>
      <div className={s.selectTitle} onClick={() => setExpanded(prev => !prev)}>
        Натисніть щоб обрати
      </div>

      {expanded && (
        <div>
          <ul>
            {selectOptions.map(option => (
              <li
                className={s.selectRow}
                style={selected === option ? { color: 'green' } : {}}
                key={option}
                onClick={() => onSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default memo(Select, (prev, next) => {
  return (
    prev.options === next.options &&
    prev.title === next.title &&
    prev.selected === next.selected
  );
});
