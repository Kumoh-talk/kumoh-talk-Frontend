'use client';

import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import ChevronDownSvg from '@/app/assets/svg/ChevronDownSvg';
import styles from './Select.module.scss';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
}

const Select = ({ options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.container} ref={dropdownRef}>
      <div className={styles.display} onClick={toggleDropdown}>
        <span>{selected?.label}</span>
        <div className={styles.arrow}>
          <ChevronDownSvg />
        </div>
      </div>
      <ul className={clsx(styles.list, { [styles.open]: isOpen })}>
        {options.map((option) => (
          <li
            key={option.value}
            className={clsx(styles.listItem, {
              [styles.selected]: selected?.value === option.value,
            })}
            onClick={() => handleOptionSelect(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
