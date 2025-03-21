'use client';

import { useState, useEffect, useRef } from 'react';
import useOverlay from '@/app/lib/hooks/common/useOverlay';
import useClickOutside from '@/app/lib/hooks/common/useClickOutside';
import clsx from 'clsx';
import ChevronDownSvg from '@/app/assets/svg/ChevronDownSvg';
import styles from './Select.module.scss';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  defaultValue?: string;
  onChange: (value: string) => void;
}

const Select = ({ options, defaultValue, onChange }: SelectProps) => {
  const [selected, setSelected] = useState<Option>(options[0]);

  const { isOpen, close, toggle } = useOverlay();

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, close);

  const handleOptionSelect = (option: Option) => {
    setSelected(option);
    close();
    onChange(option.value);
  };

  useEffect(() => {
    const getDefaultOption = () => {
      return options.find((opt) => opt.value === defaultValue) || options[0];
    };

    const defaultOption = getDefaultOption();
    setSelected(defaultOption);
  }, []);

  return (
    <div className={styles.container} ref={dropdownRef}>
      <div className={styles.display} onClick={toggle}>
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
