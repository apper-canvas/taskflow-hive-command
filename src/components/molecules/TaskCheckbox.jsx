import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const TaskCheckbox = ({ checked, onChange, className = '' }) => {
  const handleToggle = () => {
    onChange?.(!checked);
  };

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`
        relative w-5 h-5 rounded border-2 transition-all duration-200
        ${checked 
          ? 'bg-success border-success' 
          : 'border-surface-300 hover:border-success'
        }
        ${className}
      `}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <ApperIcon name="Check" className="w-3 h-3 text-white" />
        </motion.div>
      )}
    </motion.button>
  );
};

export default TaskCheckbox;