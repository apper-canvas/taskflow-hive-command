import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const CategoryPill = ({ 
  category, 
  isActive, 
  onClick, 
  showCount = true,
  className = '' 
}) => {
  const handleClick = () => {
    onClick?.(category);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left
        transition-all duration-200 group
        ${isActive 
          ? 'bg-primary text-white shadow-md border-l-4 border-l-accent' 
          : 'bg-white hover:bg-surface-50 hover:shadow-sm border border-surface-200'
        }
        ${className}
      `}
    >
      <div 
        className={`
          w-8 h-8 rounded-lg flex items-center justify-center
          ${isActive ? 'bg-white bg-opacity-20' : 'bg-surface-100'}
        `}
        style={{ 
          backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : undefined,
          color: isActive ? 'white' : category.color 
        }}
      >
        <ApperIcon name={category.icon} className="w-4 h-4" />
      </div>
      
      <div className="flex-1 min-w-0">
        <span className="font-medium">{category.name}</span>
      </div>
      
      {showCount && (
        <span 
          className={`
            text-sm px-2 py-1 rounded-full
            ${isActive 
              ? 'bg-white bg-opacity-20 text-white' 
              : 'bg-surface-100 text-surface-600'
            }
          `}
        >
          {category.taskCount}
        </span>
      )}
    </motion.button>
  );
};

export default CategoryPill;