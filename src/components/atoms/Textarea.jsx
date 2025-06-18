import { forwardRef } from 'react';

const Textarea = forwardRef(({ 
  label,
  error,
  rows = 3,
  className = '',
  containerClassName = '',
  ...props 
}, ref) => {
  const textareaClasses = `
    w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
    focus:outline-none focus:ring-0 focus:border-primary resize-vertical
    ${error ? 'border-error' : 'border-surface-200 hover:border-surface-300'}
    ${className}
  `;

  return (
    <div className={`relative ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-surface-700 mb-2">
          {label}
        </label>
      )}
      
      <textarea
        ref={ref}
        rows={rows}
        className={textareaClasses}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;