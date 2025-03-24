// External dependencies
import React from "react";

// Styles
import styles from './SettingForm.module.css';

interface Props {
  title?: string;
  className?: string;
}

export const SettingForm: React.FC<React.PropsWithChildren<Props>> = ({children, title, className}) => {
  return (
    <div className={styles.settingForm}>
      <div className={styles.settingForm__header}>
        <p className={styles.settingForm__title}>{ title ?? "Configuration" }</p> 
      </div>

      <div className={`${styles.settingForm__content} ${className || ''}`}>
        { children }
      </div>
    </div>
  )
}
