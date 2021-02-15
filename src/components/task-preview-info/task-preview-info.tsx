import { Component, h, Prop } from '@stencil/core';
import { Task } from '../../models/task';
import '@material/mwc-textfield';
import '@material/mwc-textarea';
import '@material/mwc-select';

@Component({
  tag: 'task-preview-info',
  styleUrl: 'task-preview-info.css',
  shadow: true,
})
export class TaskPreviewInfo {

  @Prop() task: Task;

  render() {
    return <div>
      <mwc-textfield outlined required value={this.task?.name}
                     placeholder='Name' label='Name'/>
      <mwc-textfield outlined required value={this.task?.primaryObjRef?.company}
                     placeholder='Company description' label='Company' />
      <mwc-textfield outlined required value={this.task?.primaryObjRef?.system}
                     placeholder='System description' label='System' />
      <mwc-textfield outlined required value={this.task?.primaryObjRef?.systemInstance}
                     placeholder='System instance description' label='System instance' />
      <mwc-textfield outlined required value={this.task?.primaryObjRef?.type}
                     placeholder='Reference type' label='Reference type' />
      <mwc-textfield outlined required value={this.task?.primaryObjRef?.value}
                     placeholder='Reference value' label='Reference value' />
      <mwc-select></mwc-select>

      <mwc-textfield outlined value={this.task?.parentBusinessProcessId}
                     placeholder='Parent business process id' label='Parent business process id' />
      <mwc-textfield outlined value={this.task?.businessProcessId}
                     placeholder='Business process id' label='Business process id' />
      <mwc-textfield outlined value={this.task?.owner}
                     placeholder='Owner' label='Owner' />
      <mwc-textarea outlined rows={5} label='Note'
                    placeholder='Note' value={this.task?.note} />
    </div>;
  }

}
