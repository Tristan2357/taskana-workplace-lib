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

  /** The list of tasks, that should be displayed. Note, that this component does not limit the length.*/
  @Prop() tasks: Task[];
  /** The taskId of the currently selected task*/
  @Prop() selectedId: string;
  /** This number specifies the priority under which (inclusive) tasks will get a red badge.*/
  @Prop() redPriority: number = 5;
  /** This number specifies the priority under which (inclusive) tasks will get a orange badge.*/
  @Prop() orangePriority: number = 15;

  /** This event gets emitted, when the user selects a task. It emits the taskId of the selected task.*/
  @Event() selectTask: EventEmitter<string>;

  @Listen('selectedIdChange') idChangeHandler(event: CustomEvent) {
    this.selectedId = event.detail;
  };

  render() {
    return <div>
      <mwc-list activatable>
        {this.tasks?.map((task: Task) =>
          <mwc-list-item twoline graphic='icon' class={task.taskId == this.selectedId ? 'selected' : ''}
                         onClick={() => this.selectTask.emit(task.taskId)}>
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
