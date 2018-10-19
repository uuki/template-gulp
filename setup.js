const config = require('./config')
const execSync = require('child_process').execSync
const tasksDir = config.base.tasksDir
const tasks = Object.keys(config.tasks)
const activeTasks = []

tasks.forEach(key => {
  if (config.tasks[key]) activeTasks.push(`file:${ config.base.tasksDir }/${ key }`);
})

execSync(`yarn add -D ${ activeTasks.join(' ') }`, { stdio: [0, 1, 2] })