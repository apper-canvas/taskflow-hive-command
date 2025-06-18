import { motion } from 'framer-motion';
import CategoryPill from '@/components/molecules/CategoryPill';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const CategorySidebar = ({ 
  categories, 
  activeCategory, 
  onCategorySelect,
  tasksCount,
  completedCount,
  className = '' 
}) => {
  const allTasksCategory = {
    Id: 'all',
    name: 'All Tasks',
    icon: 'List',
    taskCount: tasksCount
  };

  const completedTasksCategory = {
    Id: 'completed',
    name: 'Completed',
    icon: 'CheckCircle',
    taskCount: completedCount
  };

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`
        w-80 bg-surface-50 border-r border-surface-200 overflow-y-auto
        ${className}
      `}
    >
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display text-surface-900">
                TaskFlow
              </h1>
              <p className="text-sm text-surface-500">Stay productive</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 mb-8">
          <CategoryPill
            category={allTasksCategory}
            isActive={activeCategory === 'all'}
            onClick={() => onCategorySelect('all')}
          />
          
          <CategoryPill
            category={completedTasksCategory}
            isActive={activeCategory === 'completed'}
            onClick={() => onCategorySelect('completed')}
          />
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-surface-700 uppercase tracking-wide">
              Categories
            </h3>
          </div>
          
          <div className="space-y-2">
            {categories.map(category => (
              <CategoryPill
                key={category.Id}
                category={category}
                isActive={activeCategory === category.name}
                onClick={() => onCategorySelect(category.name)}
              />
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t border-surface-200">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Target" className="w-6 h-6 text-accent" />
            </div>
            <p className="text-sm text-surface-600 font-medium mb-2">
              {completedCount} tasks completed today
            </p>
            <p className="text-xs text-surface-500">
              Keep up the great work!
            </p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default CategorySidebar;