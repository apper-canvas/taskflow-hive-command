import { motion } from 'framer-motion';
import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns';
import TaskCheckbox from '@/components/molecules/TaskCheckbox';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const TaskItem = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  className = '' 
}) => {
  const handleToggleComplete = () => {
    onToggleComplete?.(task.Id, !task.completed);
  };

  const handleEdit = () => {
    onEdit?.(task);
  };

  const handleDelete = () => {
    onDelete?.(task.Id);
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    
    const date = parseISO(dateString);
    
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d, yyyy');
  };

  const getDueDateStatus = (dateString) => {
    if (!dateString) return null;
    
    const date = parseISO(dateString);
    
    if (isPast(date) && !isToday(date)) return 'overdue';
    if (isToday(date)) return 'due-today';
    return 'upcoming';
  };

  const dueDateFormatted = formatDueDate(task.dueDate);
  const dueDateStatus = getDueDateStatus(task.dueDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2, shadow: '0 4px 20px rgba(0,0,0,0.1)' }}
      className={`
        bg-white rounded-xl p-6 border border-surface-200 shadow-sm
        transition-all duration-200 group
        ${task.completed ? 'opacity-60' : ''}
        ${className}
      `}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <TaskCheckbox 
            checked={task.completed} 
            onChange={handleToggleComplete}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 
                className={`
                  font-display font-semibold text-lg text-surface-900 mb-2
                  ${task.completed ? 'line-through text-surface-500' : ''}
                `}
              >
                {task.title}
              </h3>
              
              {task.description && (
                <p 
                  className={`
                    text-surface-600 text-sm line-clamp-2 mb-3
                    ${task.completed ? 'text-surface-400' : ''}
                  `}
                >
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center gap-3">
                <Badge variant={task.priority} size="sm">
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
                
                {dueDateFormatted && (
                  <div className="flex items-center gap-1">
                    <ApperIcon 
                      name="Clock" 
                      className={`
                        w-4 h-4
                        ${dueDateStatus === 'overdue' ? 'text-error' : 
                          dueDateStatus === 'due-today' ? 'text-warning' : 
                          'text-surface-400'}
                      `}
                    />
                    <span 
                      className={`
                        text-sm
                        ${dueDateStatus === 'overdue' ? 'text-error font-medium' : 
                          dueDateStatus === 'due-today' ? 'text-warning font-medium' : 
                          'text-surface-500'}
                      `}
                    >
                      {dueDateFormatted}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                icon="Edit2"
                onClick={handleEdit}
                className="p-2 hover:bg-surface-100"
              />
              <Button
                variant="ghost"
                size="sm"
                icon="Trash2"
                onClick={handleDelete}
                className="p-2 hover:bg-error hover:bg-opacity-10 hover:text-error"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;