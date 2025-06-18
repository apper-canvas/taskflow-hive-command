import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import Input from '@/components/atoms/Input';
import Textarea from '@/components/atoms/Textarea';
import Button from '@/components/atoms/Button';
import PrioritySelector from '@/components/molecules/PrioritySelector';
import ApperIcon from '@/components/ApperIcon';

const TaskModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  task = null,
  categories = [] 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Work',
    priority: 'medium',
    dueDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        category: task.category || 'Work',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd\'T\'HH:mm') : ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'Work',
        priority: 'medium',
        dueDate: ''
      });
    }
    setErrors({});
  }, [task, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const taskData = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
        completed: task?.completed || false
      };
      
      await onSave(taskData);
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-display text-surface-900">
                {task ? 'Edit Task' : 'Create New Task'}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                icon="X"
                onClick={onClose}
                className="p-2 hover:bg-surface-100 rounded-full"
              />
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Task Title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter task title..."
                error={errors.title}
                autoFocus
              />
              
              <Textarea
                label="Description (Optional)"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Add more details about this task..."
                rows={3}
              />
              
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-surface-200 focus:outline-none focus:border-primary transition-all duration-200"
                >
                  {categories.map(category => (
                    <option key={category.Id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-error">{errors.category}</p>
                )}
              </div>
              
              <PrioritySelector
                value={formData.priority}
                onChange={(value) => handleChange('priority', value)}
              />
              
              <Input
                label="Due Date (Optional)"
                type="datetime-local"
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                icon="Calendar"
              />
              
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={loading}
                  icon={loading ? 'Loader2' : 'Save'}
                >
                  {loading ? 'Saving...' : (task ? 'Update Task' : 'Create Task')}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskModal;