import { Component, h, Prop } from '@stencil/core';
import { Task } from '../../models/task';
import { ClassificationSummary } from '../../models/classification-summary';
import { classifications } from '../../data/classifications.json';
import '@material/mwc-textfield';
import '@material/mwc-textarea';
import '@material/mwc-select';
import '@material/mwc-list';

@Component({
  tag: 'task-preview-info',
  styleUrl: 'task-preview-info.css',
  shadow: true,
})
export class TaskPreviewInfo {

  @Prop() task: Task;

  @Prop() classifications: ClassificationSummary[];

  componentWillLoad() {
    if (!this.classifications) this.classifications = classifications;
  }

  render() {
    return <div>
      <div class='row'>
        <mwc-textfield outlined required value={this.task?.name}
                       placeholder='Name' label='Name' />
        <mwc-textfield outlined required value={this.task?.primaryObjRef?.company}
                       placeholder='Company description' label='Company' />
      </div>
      <div class='row'>
        <mwc-textfield outlined required value={this.task?.primaryObjRef?.system}
                       placeholder='System description' label='System' />
        <mwc-textfield outlined required value={this.task?.primaryObjRef?.systemInstance}
                       placeholder='System instance description' label='System instance' />
      </div>
      <div class='row'>
        <mwc-textfield outlined required value={this.task?.primaryObjRef?.type}
                       placeholder='Reference type' label='Reference type' />
        <mwc-textfield outlined required value={this.task?.primaryObjRef?.value}
                       placeholder='Reference value' label='Reference value' />
      </div>
      <div class='row'>
        <mwc-select outlined required label='Classification'>
          {this.classifications?.map(cl => <mwc-list-item value={cl.classificationId}>
            {cl.name}
          </mwc-list-item>)}
        </mwc-select>
        <mwc-textfield outlined class='smoll' type='date' value={this.task?.due || new Date().toISOString().substr(0, 10)}
                       label='Due date' />
        <mwc-textfield outlined class='smoll' type='number' value={this.task?.priority}
                       placeholder='0' label='Priority' />
      </div>
      <div class='row'>
        <mwc-textfield outlined value={this.task?.parentBusinessProcessId}
                       placeholder='Parent business process id' label='Parent business process id' />
        <mwc-textfield outlined value={this.task?.businessProcessId}
                       placeholder='Business process id' label='Business process id' />
      </div>
      <div class='row'>
        <mwc-textfield outlined value={this.task?.owner}
                       placeholder='Owner' label='Owner' />
        <mwc-textarea outlined rows={5} label='Note'
                      placeholder='Note' value={this.task?.note} />
      </div>
    </div>;
  }

}
