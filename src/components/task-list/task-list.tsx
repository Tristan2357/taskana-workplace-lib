import { Component, Event, EventEmitter, h, Listen, Prop } from '@stencil/core';
import { Task } from '../../models/task';
import * as listExample from '../../data/list-example.json';
import { TaskResource } from '../../models/task-resource';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item.js';

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
    // this is just for demo purposes TODO remove before actual use
    const taskResource: TaskResource = listExample;
    if (!this.tasks) {
      this.tasks = taskResource.tasks;
      this.selectedId = this.tasks[4].taskId;
    }

  }

  render() {
    return <div>
      {this.tasks ?
        <mwc-list activatable>
          {this.tasks.map((task: Task) =>
            <mwc-list-item twoline graphic='icon' class={task.taskId == this.selectedId ? 'selected' : ''}
                           onClick={() => this.selectedIdChange.emit(task.taskId)}>
              <span>{task.name}<i>{task.owner ? ', ' + task.owner : ''}</i></span>
              <span slot='secondary'>{task.state} &nbsp; Due: {task.due}</span>
              <span class={'badge ' + (task.priority <= 5 ? 'red' : (task.priority <= 15 ? 'orange' : 'green'))}
                    slot='graphic'>
                {task.priority}</span>{/* TODO priority anpassbar*/}
            </mwc-list-item>,
          )}
        </mwc-list>
        : <h3>Please select a workbasket</h3>
      }
    </div>;
  }
}
