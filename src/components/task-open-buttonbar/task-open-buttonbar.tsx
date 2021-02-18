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

  @Prop() task: Task;

  @Prop() workbaskets: Workbasket[];

  @Event() backEvent: EventEmitter;

  @Event() completeEvent: EventEmitter;

  @Event() transferEvent: EventEmitter;

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
        <mwc-button outlined label='Go back' icon='arrow_back' trailingIcon onClick={this.backEvent.emit} />

        <mwc-button unelevated label='Complete Task' icon='check' trailingIcon
                    onClick={() => this.completeEvent.emit(this.task.taskId)} />

        <mwc-button outlined label='Transfer Task' icon='transfer_within_a_station' trailingIcon
                    ref={b => this.menuButton = b}
                    onClick={() => {
                      this.menu.show();
                    }} />
        <mwc-menu fixed ref={m => this.menu = m}>
          {this.workbaskets?.map(workbasket =>
            <mwc-list-item onClick={() => this.transferEvent.emit({
              taskId: this.task.taskId,
              workbasketId: workbasket.workbasketId,
            })}>{workbasket.name}</mwc-list-item>,
          )}
        </mwc-menu>
      </div>
    </div>;
  }
}
