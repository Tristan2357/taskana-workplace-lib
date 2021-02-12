import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { Task } from '../../models/task';
import { TaskResource } from '../../models/task-resource';
import * as listExample from '../../data/list-example.json';
import * as workbasketsExample from '../../data/workbaskets.json';
import { Workbasket } from '../../models/workbasket';
import { WorkbasketResource } from '../../models/workbasket-resource';

@Component({
  tag: 'task-open-buttonbar',
  styleUrl: 'task-open-buttonbar.css',
  shadow: true,
})
export class TaskOpenButtonbar {

  @Prop() task: Task;

  @Prop() workbaskets: Workbasket[];

  @Event() backEvent: EventEmitter;

  @Event() completeEvent: EventEmitter;

  @Event() transferEvent: EventEmitter;

  componentWillLoad() {
    // this is just for demo purposes
    const taskResource: TaskResource = listExample;
    const workbasketResource: WorkbasketResource = workbasketsExample;
    if (!this.task) {
      this.task = taskResource.tasks[0];
    }
    if (!this.workbaskets) {
      this.workbaskets = workbasketResource.workbaskets;
    }
  }

  render() {
    return <div class='flex'>
      <div>
        <h4>{this.task?.name}</h4>
      </div>
      <div>
        <button class='btn primary' title='Save changes in current workbasket' onClick={this.backEvent.emit}>Go Back
          <span class='material-icons'>arrow_back</span>
        </button>
        <button class='btn' title='Revert changes to previous saved state'
                onClick={() => this.completeEvent.emit(this.task.taskId)}>Complete Task
          <span class='material-icons'>check</span>
        </button>
        <div class='dropdown'>
          <button class='btn dropbtn' title='Transfer task to another workbasket'>Transfer Task
            <span class='material-icons'>transfer_within_a_station</span>
          </button>
          <div class='dropdown-content'>
            {this.workbaskets.map(workbasket =>
              <span onClick={() => this.transferEvent.emit({
                taskId: this.task.taskId,
                workbasketId: workbasket.workbasketId,
              })}>{workbasket.name}</span>,
            )}</div>
        </div>
      </div>
    </div>;
  }
}
