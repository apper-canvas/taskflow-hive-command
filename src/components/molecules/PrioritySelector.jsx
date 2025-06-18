import { motion } from 'framer-motion';
import Badge from '@/components/atoms/Badge';

const PrioritySelector = ({ value, onChange, className = '' }) => {
  const priorities = [
    { value: 'high', label: 'High', color: 'high' },
    { value: 'medium', label: 'Medium', color: 'medium' },
    { value: 'low', label: 'Low', color: 'low' }
  ];

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-surface-700">
        Priority
      </label>
      <div className="flex gap-2">
        {priorities.map((priority) => (
          <motion.button
            key={priority.value}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(priority.value)}
            className={`
              relative overflow-hidden
              ${value === priority.value ? 'ring-2 ring-primary ring-offset-2' : ''}
            `}
          >
            <Badge variant={priority.color} size="md">
              {priority.label}
            </Badge>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default PrioritySelector;