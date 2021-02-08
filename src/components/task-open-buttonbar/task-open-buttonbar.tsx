import { Component, h, Prop } from '@stencil/core';
import { Task } from '../../models/task';
import { TaskResource } from '../../models/task-resource';
import * as listExample from '../../data/list-example.json';

@Component({
  tag: 'task-open-buttonbar',
  styleUrl: 'task-open-buttonbar.css',
  shadow: true,
})
export class TaskOpenButtonbar {

  @Prop() task: Task;

  componentWillLoad() {
    // this is just for demo purposes
    const taskResource: TaskResource = listExample;
    if (!this.task) {
      this.task = taskResource.tasks[0];
    }
  }

  render() {
    return <div class='flex'>
      <div>
        <h4>{this.task?.name}</h4>
      </div>
      <div>
        <button class='btn primary' title='Save changes in current workbasket'>Go Back
          <span class='material-icons'>arrow_back</span>
        </button>
        <button class='btn' title='Revert changes to previous saved state'>Complete Task
          <span class='material-icons'>check</span>
        </button>
        <button class='btn' title='Transfer task to another workbasket'>Transfer Task
          <span class='material-icons'>transfer_within_a_station</span>
        </button>
      </div>
    </div>;
  }
}
