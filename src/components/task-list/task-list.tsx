import { Component, Event, EventEmitter, h, Listen, Prop } from '@stencil/core';
import { Task } from '../../models/task';
import * as listExample from '../../data/list-example.json';
import { TaskResource } from '../../models/task-resource';

@Component({
  tag: 'task-list',
  styleUrl: 'task-list.css',
  shadow: true,
})
export class TaskList {

  @Prop() tasks: Task[];

  @Prop() selectedId: string;

  @Event() selectedIdChange: EventEmitter;

  @Listen('selectedIdChange') idChangeHandler(event: CustomEvent) {
    this.selectedId = event.detail;
  };

  componentWillLoad() {
    // this is just for demo purposes
    const taskResource: TaskResource = listExample;
    if (!this.tasks) {
      this.tasks = taskResource.tasks;
    }
  }

  render() {
    return <div>
      {this.tasks ?
        <ul class='noPad'>
          {this.tasks.map((task: Task) =>
            <dl class={'listItem ' + (task.taskId == this.selectedId ? 'selected' : '')}
                onClick={() => this.selectedIdChange.emit(task.taskId)}>
              <div class='badgeCasing'>
                <span class={'badge ' + (task.priority <= 5 ? 'red' : (task.priority <= 15 ? 'orange' : 'green'))}>
                {task.priority}</span>
              </div>
              <div>
                <dt class='row'>
                  <span class='top'>{task.name}</span>
                  <i class='top'>{task.owner ? ', ' + task.owner : ''}</i>
                </dt>
                <dd class='row'>
                  <span class='bottom'>{task.state}</span>
                  <span class='bottom right'>Due: {task.due}</span> {/*Align to right of box?*/}
                </dd>
              </div>
            </dl>,
          )}
        </ul>
        : <h3>Please select a workbasket</h3>
      }
    </div>;
  }
}
