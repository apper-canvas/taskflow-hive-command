import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const EmptyState = ({ 
  title, 
  description, 
  actionLabel, 
  onAction, 
  icon = 'CheckSquare',
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`text-center py-16 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="mb-6"
      >
        <div className="w-24 h-24 bg-surface-100 rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name={icon} className="w-12 h-12 text-surface-400" />
        </div>
      </motion.div>
      
      <h3 className="text-xl font-bold font-display text-surface-900 mb-2">
        {title}
      </h3>
      
      <p className="text-surface-500 mb-8 max-w-md mx-auto">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="primary"
            icon="Plus"
            onClick={onAction}
            className="px-6 py-3"
          >
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;