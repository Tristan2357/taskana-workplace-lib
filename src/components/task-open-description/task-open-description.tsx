import { Component, h, Prop } from '@stencil/core';
import { Task } from '../../models/task';
import '@material/mwc-textarea';
import '@material/mwc-textfield';

@Component({
  tag: 'task-open-description',
  styleUrl: 'task-open-description.css',
  shadow: true,
})
export class TaskOpenDescription {

  @Prop() task: Task;

  render() {
    return <div>
      <mwc-textarea outlined rows={5} disabled label='Description'
                    placeholder='Description' value={this.task?.description} />
      <mwc-textfield outlined disabled value={this.task?.note}
                     placeholder='Task has no Note' label='Note' />
      <mwc-textfield outlined disabled value={this.task?.due}
                     placeholder='No deadline set' label='Due Date' />
    </div>;
  }
}
