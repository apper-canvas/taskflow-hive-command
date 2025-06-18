import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from '@/components/organisms/TaskItem';

const TaskList = ({ 
  tasks, 
  loading, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask,
  className = '' 
}) => {
  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-6 border border-surface-200"
          >
            <div className="animate-pulse">
              <div className="flex items-start gap-4">
                <div className="w-5 h-5 bg-surface-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-5 bg-surface-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-surface-200 rounded w-1/2 mb-3"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-surface-200 rounded-full w-16"></div>
                    <div className="h-6 bg-surface-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <AnimatePresence>
        {tasks.map((task, index) => (
          <motion.div
            key={task.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
          >
            <TaskItem
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;