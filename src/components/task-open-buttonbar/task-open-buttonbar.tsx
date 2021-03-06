import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { Menu } from '@material/mwc-menu';
import { Workbasket } from '../../models/workbasket';
import '@material/mwc-button';
import '@material/mwc-menu';

@Component({
  tag: 'task-open-buttonbar',
  styleUrl: 'task-open-buttonbar.css',
  shadow: true,
})
export class TaskOpenButtonbar {

  /** The name of the current Task*/
  @Prop() taskName: string;
  /** The list of to the user available workbaskets. This is used to provide a dropdown to transfer the task to another workbasket.*/
  @Prop() workbaskets: Workbasket[];

  /**This event gets emitted, when the user wants to go leave the current page and return to the preview of the task.*/
  @Event() back: EventEmitter<void>;
  /**This event gets emitted, when the user marks the current task as completed.*/
  @Event() completeTask: EventEmitter<void>;
  /**This event gets emitted,when the user wants to transfer the task to another workbasket. It emits the workbasketId, to which the task should be transferred to.*/
  @Event() transferTask: EventEmitter<string>;

  menu!: Menu;
  menuButton!: HTMLElement;

  componentDidLoad() {
    this.menu.anchor = this.menuButton;
    this.menu.corner = 'BOTTOM_LEFT';
  }

  render() {
    return <div class='flex'>
      <div>
        <h4>{this.taskName}</h4>
      </div>
      <div>
        <mwc-button outlined label='Go back' icon='arrow_back' trailingIcon onClick={this.back.emit} />

        <mwc-button unelevated label='Complete Task' icon='check' trailingIcon
                    onClick={this.completeTask.emit} />

        <mwc-button outlined label='Transfer Task' icon='transfer_within_a_station' trailingIcon
                    ref={b => this.menuButton = b}
                    onClick={() => {
                      this.menu.show();
                    }} />
        <mwc-menu fixed ref={m => this.menu = m}>
          {this.workbaskets?.map(workbasket =>
            <mwc-list-item onClick={() => {
              const event = this.transferTask.emit(workbasket.workbasketId);
              this.menu.close();
              return event;
            }}>
              {workbasket.name}</mwc-list-item>,
          )}
        </mwc-menu>
      </div>
    </div>;
  }
};
