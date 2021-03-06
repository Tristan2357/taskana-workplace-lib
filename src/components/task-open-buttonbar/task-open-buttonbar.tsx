import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { Menu } from '@material/mwc-menu';
import { Task } from '../../models/task';
import { Workbasket } from '../../models/workbasket';
import '@material/mwc-button';
import '@material/mwc-menu';

@Component({
  tag: 'task-open-buttonbar',
  styleUrl: 'task-open-buttonbar.css',
  shadow: true,
})
export class TaskOpenButtonbar {

  /** The current Task, this is used to get context for the events*/
  @Prop() task: Task;
  /** The list of to the user available workbaskets. This is used to provide a dropdown to transfer the task to another workbasket.*/
  @Prop() workbaskets: Workbasket[];


  /**This event gets emitted, when the user wants to go leave the current page and return to the preview of the task.*/
  @Event() back: EventEmitter<void>;
  /**This event gets emitted, when the user marks the current task as completed. It emits the taskId of the completed task.*/
  @Event() completeTask: EventEmitter<string>;
  /**This event gets emitted,when the user wants to transfer the task to another workbasket. It emits an object, which contains the taskId and the workbasketId, to which the task should be transferred to.*/
  @Event() transferTask: EventEmitter<{ taskId: string, workbasketId: string }>;

  menu!: Menu;
  menuButton!: HTMLElement;

  componentDidLoad() {
    this.menu.anchor = this.menuButton;
    this.menu.corner = 'BOTTOM_LEFT';
  }

  render() {
    return <div class='flex'>
      <div>
        <h4>{this.task?.name}</h4>
      </div>
      <div>
        <mwc-button outlined label='Go back' icon='arrow_back' trailingIcon onClick={this.back.emit} />

        <mwc-button unelevated label='Complete Task' icon='check' trailingIcon
                    onClick={() => this.completeTask.emit(this.task.taskId)} />

        <mwc-button outlined label='Transfer Task' icon='transfer_within_a_station' trailingIcon
                    ref={b => this.menuButton = b}
                    onClick={() => {
                      this.menu.show();
                    }} />
        <mwc-menu fixed ref={m => this.menu = m}>
          {this.workbaskets?.map(workbasket =>
            <mwc-list-item onClick={() => this.transferTask.emit({
              taskId: this.task.taskId,
              workbasketId: workbasket.workbasketId,
            })}>{workbasket.name}</mwc-list-item>,
          )}
        </mwc-menu>
      </div>
    </div>;
  }
}
