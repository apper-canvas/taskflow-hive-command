import ApperIcon from '@/components/ApperIcon';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  icon,
  className = '',
  ...props 
}) => {
  const variants = {
    default: 'bg-surface-100 text-surface-700',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    accent: 'bg-accent text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    error: 'bg-error text-white',
    high: 'bg-error text-white',
    medium: 'bg-warning text-white',
    low: 'bg-surface-400 text-white'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const baseClasses = `
    inline-flex items-center font-medium rounded-full
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  return (
    <span className={baseClasses} {...props}>
      {icon && <ApperIcon name={icon} className="w-3 h-3 mr-1" />}
      {children}
    </span>
  );
};

export default Badge;