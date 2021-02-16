import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { Menu } from '@material/mwc-menu';
import { Task } from '../../models/task';
import { TaskResource } from '../../models/task-resource';
import { Workbasket } from '../../models/workbasket';
import { WorkbasketResource } from '../../models/workbasket-resource';
import '@material/mwc-button';
import '@material/mwc-menu';
import * as listExample from '../../data/list-example.json';
import * as workbasketsExample from '../../data/workbaskets.json';

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

  componentWillLoad() {
    // this is just for demo purposes TODO remove before actual use
    const taskResource: TaskResource = listExample;
    const workbasketResource: WorkbasketResource = workbasketsExample;
    if (!this.task) {
      this.task = taskResource.tasks[0];
    }
    if (!this.workbaskets) {
      this.workbaskets = workbasketResource.workbaskets;
    }
  }

  componentDidLoad() {
    this.menu.anchor = this.menuButton;
  }

  render() {
    return <div class='flex'>
      <div>
        <h4>{this.task?.name}</h4>
      </div>
      <div>
        <mwc-button unelevated label='Go back' icon='arrow_back' trailingIcon onClick={this.backEvent.emit} />

        <mwc-button outlined label='Complete Task' icon='check' trailingIcon
                    onClick={() => this.completeEvent.emit(this.task.taskId)} />

        <mwc-button id='transferMenuButton' outlined label='Transfer Task' icon='transfer_within_a_station' trailingIcon
                    ref={b => this.menuButton = b}
                    onClick={() => {
                      this.menu.show();
                    }} />
        <mwc-menu id='transferMenu' fixed ref={m => this.menu = m}>
          {this.workbaskets.map(workbasket =>
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
