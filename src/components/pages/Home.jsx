import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { taskService, categoryService } from '@/services';
import CategorySidebar from '@/components/organisms/CategorySidebar';
import TaskList from '@/components/organisms/TaskList';
import TaskModal from '@/components/organisms/TaskModal';
import EmptyState from '@/components/organisms/EmptyState';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [tasksResult, categoriesResult] = await Promise.all([
          taskService.getAll(),
          categoryService.getAll()
        ]);
        
        setTasks(tasksResult);
        setCategories(categoriesResult);
      } catch (err) {
        setError(err.message || 'Failed to load data');
        toast.error('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];
    
    // Filter by category
    if (activeCategory === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (activeCategory !== 'all') {
      filtered = filtered.filter(task => task.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(lowerSearchTerm) ||
        task.description.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Sort by completion status, then by priority, then by due date
    return filtered.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      
      return 0;
    });
  }, [tasks, activeCategory, searchTerm]);

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const activeTasksCount = tasks.filter(task => !task.completed).length;

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        const updatedTask = await taskService.update(editingTask.Id, taskData);
        setTasks(prev => prev.map(task => 
          task.Id === editingTask.Id ? updatedTask : task
        ));
        toast.success('Task updated successfully');
      } else {
        const newTask = await taskService.create(taskData);
        setTasks(prev => [newTask, ...prev]);
        toast.success('Task created successfully');
      }
    } catch (error) {
      toast.error('Failed to save task');
      throw error;
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      const updatedTask = await taskService.update(taskId, { completed });
      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ));
      
      if (completed) {
        toast.success('Task completed! 🎉');
      }
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(task => task.Id !== taskId));
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setSearchTerm('');
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const getEmptyStateContent = () => {
    if (searchTerm) {
      return {
        title: 'No tasks found',
        description: `No tasks match "${searchTerm}". Try adjusting your search terms.`,
        actionLabel: 'Clear Search',
        onAction: () => setSearchTerm(''),
        icon: 'Search'
      };
    }
    
    if (activeCategory === 'completed') {
      return {
        title: 'No completed tasks',
        description: 'Complete some tasks to see them here. Every finished task is a step towards your goals!',
        actionLabel: 'View All Tasks',
        onAction: () => setActiveCategory('all'),
        icon: 'CheckCircle'
      };
    }
    
    if (activeCategory !== 'all') {
      return {
        title: `No ${activeCategory.toLowerCase()} tasks`,
        description: `You don't have any tasks in the ${activeCategory} category yet.`,
        actionLabel: 'Create New Task',
        onAction: handleCreateTask,
        icon: 'FolderOpen'
      };
    }
    
    return {
      title: 'Ready to get productive?',
      description: 'Create your first task and start organizing your day. Every great accomplishment begins with a single task.',
      actionLabel: 'Create Your First Task',
      onAction: handleCreateTask,
      icon: 'Plus'
    };
  };

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <EmptyState
          title="Something went wrong"
          description={error}
          actionLabel="Try Again"
          onAction={() => window.location.reload()}
          icon="AlertCircle"
        />
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <CategorySidebar
        categories={categories}
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
        tasksCount={tasks.length}
        completedCount={completedTasksCount}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex-shrink-0 bg-white border-b border-surface-200 px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold font-display text-surface-900">
                {activeCategory === 'all' ? 'All Tasks' :
                 activeCategory === 'completed' ? 'Completed Tasks' :
                 activeCategory}
              </h2>
              <p className="text-surface-500 mt-1">
                {activeCategory === 'completed' 
                  ? `${completedTasksCount} completed tasks`
                  : `${activeTasksCount} active tasks`
                }
              </p>
            </div>
            
            <Button
              variant="primary"
              icon="Plus"
              onClick={handleCreateTask}
              className="px-6 py-3 text-lg"
            >
              New Task
            </Button>
          </div>
          
          <SearchBar
            onSearch={handleSearch}
            onClear={() => setSearchTerm('')}
            placeholder={`Search ${activeCategory === 'all' ? 'all' : activeCategory.toLowerCase()} tasks...`}
            className="max-w-md"
          />
        </header>
        
        <main className="flex-1 overflow-y-auto p-8">
          {filteredTasks.length === 0 ? (
            <EmptyState {...getEmptyStateContent()} />
          ) : (
            <TaskList
              tasks={filteredTasks}
              loading={loading}
              onToggleComplete={handleToggleComplete}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          )}
        </main>
      </div>
      
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
        categories={categories}
      />
    </div>
  );
};

export default Home;