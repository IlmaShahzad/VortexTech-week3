import { useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css';

const FILTERS = ['All', 'Active', 'Completed'];

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  const addTask = (text, priority) => {
    setTasks((prev) => [
      { id: Date.now(), text, priority, completed: false },
      ...prev,
    ]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true;
  });

  return (
    <div className="app-wrapper">
      {/* Decorative blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <div className="app-card">
        {/* Header */}
        <header className="app-header">
          <div className="header-top">
            <div className="header-icon">✅</div>
            <div>
              <h1 className="app-title">Task Manager</h1>
              <p className="app-subtitle">Stay focused, get things done.</p>
            </div>
          </div>

          {tasks.length > 0 && (
            <div className="progress-section">
              <div className="progress-meta">
                <span>{completedCount} of {tasks.length} completed</span>
                <span className="progress-pct">{progress}%</span>
              </div>
              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </header>

        {/* Input */}
        <TaskInput onAdd={addTask} />

        {/* Filter tabs */}
        {tasks.length > 0 && (
          <div className="filter-tabs">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-tab ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
                <span className="filter-count">
                  {f === 'All'
                    ? tasks.length
                    : f === 'Active'
                    ? tasks.filter((t) => !t.completed).length
                    : completedCount}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Task list */}
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />

        {/* Empty state */}
        {filteredTasks.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              {filter === 'Completed' ? '🎉' : filter === 'Active' ? '🌟' : '📋'}
            </div>
            <p className="empty-title">
              {filter === 'Completed'
                ? 'No completed tasks yet'
                : filter === 'Active'
                ? 'All tasks completed!'
                : 'No tasks yet'}
            </p>
            <p className="empty-sub">
              {filter === 'All' && 'Add your first task above to get started.'}
              {filter === 'Active' && 'Great job finishing everything!'}
              {filter === 'Completed' && 'Complete a task to see it here.'}
            </p>
          </div>
        )}

        {/* Footer */}
        {completedCount > 0 && (
          <div className="card-footer">
            <button className="clear-btn" onClick={clearCompleted}>
              🗑 Clear completed ({completedCount})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
