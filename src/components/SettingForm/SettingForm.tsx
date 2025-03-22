import React from "react"

export const SettingForm: React.FC<React.PropsWithChildren<Props>> = ({children, title, className}) => {
  return (
    <div className="h-100" style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
      <div className="py-3 px-5 is-flex is-justify-content-space-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)'}}>
        <p className="is-size-6 has-text-weight-bold" style={{ textTransform: 'uppercase' }}>{ title ?? "Configuration" }</p> 
      </div>

      <div className={`${className} px-5 py-3`}>
        { children }
      </div>
    </div>
  )
}

interface Props {
  title?: string;
  className?: string;
}
