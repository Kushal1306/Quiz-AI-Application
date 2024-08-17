
export function InputBox({id,label, placeholder, onChange,type="text",value, className='w-full px-2 py-1 border rounded border-slate-200',labelClassName='text-m font-medium text-left py-2'}) {
    return <div>
      <div className={labelClassName}>
        {label}
      </div>
      <input 
      id={id}
      type={type}
      value={value}
      onChange={onChange} placeholder={placeholder} className={className} />
    </div>
  }