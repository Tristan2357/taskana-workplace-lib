import { Component, Event, EventEmitter, h, Listen, Prop } from '@stencil/core';
import { Task } from '../../models/task';
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
  @Prop() redPriority: number = 5;
  @Prop() orangePriority: number = 15;

  @Event() selectedIdChange: EventEmitter;

  @Listen('selectedIdChange') idChangeHandler(event: CustomEvent) {
    this.selectedId = event.detail;
  };

  render() {
    return <div>
      <mwc-list activatable>
        {this.tasks?.map((task: Task) =>
          <mwc-list-item twoline graphic='icon' class={task.taskId == this.selectedId ? 'selected' : ''}
                         onClick={() => this.selectedIdChange.emit(task.taskId)}>
            <span>{task.name}<i>{task.owner ? ', ' + task.owner : ''}</i></span>
            <span slot='secondary'>{task.state} &nbsp; Due: {task.due}</span>
            <span
              class={'badge ' + (task.priority <= this.redPriority ? 'red' : (task.priority <= this.orangePriority ? 'orange' : 'green'))}
              slot='graphic'>
                {task.priority}</span>
          </mwc-list-item>,
        )}
      </mwc-list>
    </div>;
  }
}
