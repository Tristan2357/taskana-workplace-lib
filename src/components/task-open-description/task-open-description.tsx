import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'task-open-description',
  styleUrl: 'task-open-description.css',
  shadow: true,
})
export class TaskOpenDescription {
  /**
   * The Description of the Task
   */
  @Prop() description: string;

  /**
   * Notes on the Task
   */
  @Prop() note: string;

  /**
   * The due Date
   */
  @Prop() dueDate: string;

  render() {
    return <Host>
      <form>
        <label>Description
          <textarea disabled rows={5} id='task-description'
                    placeholder='Description' value={this.description}
                    name='task.description' />
        </label>
        <label>Note
          <input type='text' disabled id='task-note'
                 placeholder='Task has no Note' value={this.note}
                 name='task.note' />
        </label>
        <label>Due Date
          <input type='text' value={this.dueDate} disabled id='task-due'
                 placeholder='No deadline set'
                 name='task.due' />
        </label>
      </form>
    </Host>;
  }
}
