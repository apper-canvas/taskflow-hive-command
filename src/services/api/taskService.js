import tasksData from '../mockData/tasks.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let tasks = [...tasksData];

const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id, 10));
    return task ? { ...task } : null;
  },

  async create(taskData) {
    await delay(300);
    const newTask = {
      ...taskData,
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, taskData) {
    await delay(250);
    const index = tasks.findIndex(t => t.Id === parseInt(id, 10));
    if (index === -1) throw new Error('Task not found');
    
    const updatedTask = {
      ...tasks[index],
      ...taskData,
      Id: tasks[index].Id, // Prevent Id modification
      completedAt: taskData.completed && !tasks[index].completed 
        ? new Date().toISOString() 
        : (!taskData.completed ? null : tasks[index].completedAt)
    };
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(200);
    const index = tasks.findIndex(t => t.Id === parseInt(id, 10));
    if (index === -1) throw new Error('Task not found');
    
    const deletedTask = tasks.splice(index, 1)[0];
    return { ...deletedTask };
  },

  async getByCategory(category) {
    await delay(250);
    return tasks.filter(t => t.category === category).map(t => ({ ...t }));
  },

  async getCompleted() {
    await delay(250);
    return tasks.filter(t => t.completed).map(t => ({ ...t }));
  },

  async searchTasks(query) {
    await delay(200);
    const lowerQuery = query.toLowerCase();
    return tasks.filter(t => 
      t.title.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery)
    ).map(t => ({ ...t }));
  }
};

export default taskService;