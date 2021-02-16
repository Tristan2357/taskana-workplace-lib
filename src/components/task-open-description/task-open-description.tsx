import { Component, h, Prop } from '@stencil/core';
import { Task } from '../../models/task';
import '@material/mwc-textarea';
import '@material/mwc-textfield';
import { TaskResource } from '../../models/task-resource';
import * as listExample from '../../data/list-example.json';

@Component({
  tag: 'task-open-description',
  styleUrl: 'task-open-description.css',
  shadow: true,
})
export class TaskOpenDescription {

  @Prop() task: Task;

  componentWillLoad() {
    // this is just for demo purposes TODO remove before actual use
    const taskResource: TaskResource = listExample;
    if (!this.task) {
      this.task = (taskResource.tasks)[4];
    }
  }

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
