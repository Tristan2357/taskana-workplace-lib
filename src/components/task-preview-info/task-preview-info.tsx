import { Component, h, Prop, State, Watch } from '@stencil/core';
import { CustomAttribute, Task } from '../../models/task';
import { ClassificationSummary } from '../../models/classification-summary';
import { classifications } from '../../data/classifications.json';
import '@material/mwc-textfield';
import '@material/mwc-textarea';
import '@material/mwc-button';
import '@material/mwc-select';
import '@material/mwc-list';
import { tasks } from '../../data/list-example.json';

@Component({
  tag: 'task-preview-info',
  styleUrl: 'task-preview-info.css',
  shadow: true,
})
export class TaskPreviewInfo {

  @State() infoActive: boolean = true;
  @State() statusActive: boolean = false;
  @State() fieldsActive: boolean = false;
  @State() attributesActive: boolean = false;
  @State() callbackActive: boolean = false;
  @State() taskState: Task;

  @Prop() task: Task;
  @Prop() classifications: ClassificationSummary[];

  @Watch('task')
  watchTaskHandler(task) {
    this.taskState = task;
    this.taskState.customAttributes = this.taskState.customAttributes || [];
    this.taskState.callbackInfo = this.taskState.callbackInfo || [];
  }

  componentWillLoad() { // TODO remove before actual use
    if (!this.task) {
      this.task = tasks[4];
    }
    if (!this.classifications) this.classifications = classifications;
  }

  private customFieldsGenerator(): any[] {
    let ar = [];
    const CUSTOMFIELDCOUNT = 16;
    for (let i = 1; i <= CUSTOMFIELDCOUNT;) {
      ar.push(<div class='row'>
        <mwc-textfield outlined value={this.taskState?.['custom' + (i++)] || ''}
                       placeholder={'Custom ' + i} label={'Custom ' + i} />
        <mwc-textfield outlined value={this.taskState?.['custom' + (i++)] || ''}
                       placeholder={'Custom ' + i} label={'Custom ' + i} />
      </div>);
    }
    return ar;
  }

  render() {
    return <div>
      <div class='head'>
        <span>
          <h4>{this.task?.name}</h4>
        </span>
        <div class='flex right'>
          <mwc-button unelevated label='Go back' icon='arrow_back' trailingIcon />
          <mwc-button outlined label='Complete Task' icon='check' trailingIcon />
          <mwc-button id='transferMenuButton' outlined label='Transfer Task' icon='transfer_within_a_station'
                      trailingIcon />
        </div>
      </div>
      <div>
        <mwc-button label='1 - Information' expandContent trailingIcon class='accordion-button'
                    icon={!this.infoActive ? 'expand_more' : 'expand_less'}
                    onClick={() => this.infoActive = !this.infoActive} />
        <div class={this.infoActive ? 'hidden not' : 'hidden'}>
          <div class='row'>
            <mwc-textfield outlined required value={this.taskState?.name}
                           placeholder='Name' label='Name' />
            <mwc-textfield outlined required value={this.taskState?.primaryObjRef?.company}
                           placeholder='Company description' label='Company' />
          </div>
          <div class='row'>
            <mwc-textfield outlined required value={this.taskState?.primaryObjRef?.system}
                           placeholder='System description' label='System' />
            <mwc-textfield outlined required value={this.taskState?.primaryObjRef?.systemInstance}
                           placeholder='System instance description' label='System instance' />
          </div>
          <div class='row'>
            <mwc-textfield outlined required value={this.taskState?.primaryObjRef?.type}
                           placeholder='Reference type' label='Reference type' />
            <mwc-textfield outlined required value={this.taskState?.primaryObjRef?.value}
                           placeholder='Reference value' label='Reference value' />
          </div>
          <div class='row'>
            <mwc-select outlined required label='Classification'>
              {this.classifications?.map(classification => <mwc-list-item value={classification.classificationId}
                                                                          selected={classification.classificationId == this.taskState?.classificationSummary?.classificationId}>
                {classification.name}
              </mwc-list-item>)}
            </mwc-select>
            <mwc-textfield outlined class='smoll' type='number' value={this.taskState?.priority}
                           placeholder='0' label='Priority' />
            <mwc-textfield outlined /*type='date'*/
                           value={this.taskState?.due || new Date().toISOString().substr(0, 10)} //TODO format due date or change type
                           label='Due date' />
          </div>
          <div class='row'>
            <mwc-textfield outlined value={this.taskState?.parentBusinessProcessId}
                           placeholder='Parent business process id' label='Parent business process id' />
            <mwc-textfield outlined value={this.taskState?.businessProcessId}
                           placeholder='Business process id' label='Business process id' />
          </div>
          <div class='row'>
            <mwc-textfield outlined value={this.taskState?.owner}
                           placeholder='Owner' label='Owner' />
            <mwc-textarea outlined rows={5} label='Note'
                          placeholder='Note' value={this.taskState?.note} />
          </div>
        </div>
      </div>
      <div>
        <mwc-button label='2 - Status details' expandContent trailingIcon class='accordion-button'
                    icon={!this.statusActive ? 'expand_more' : 'expand_less'}
                    onClick={() => this.statusActive = !this.statusActive} />
        <div class={this.statusActive ? 'hidden not' : 'hidden'}>
          <div class='row'>
            <mwc-textfield outlined disabled value={this.taskState?.modified}
                           placeholder='Modification date' label='Modification date' />
            <mwc-textfield outlined disabled value={this.taskState?.completed || 'Task has not been Completed'}
                           placeholder='Completion date' label='Completion date' />
          </div>
          <div class='row'>
            <mwc-textfield outlined disabled value={this.taskState?.state}
                           placeholder='State' label='State' />
            <mwc-textfield outlined disabled value={this.taskState?.read}
                           placeholder='Task read' label='Task read' />
          </div>
          <div class='row'>
            <mwc-textfield outlined disabled value={this.taskState?.claimed}
                           placeholder='Claim date' label='Claim date' />
            <mwc-textfield outlined disabled value={this.taskState?.planned}
                           placeholder='Planned date' label='Planned date' />
          </div>
          <div class='row'>
            <mwc-textfield outlined disabled value={this.taskState?.created}
                           placeholder='Creation date' label='Creation date' />
            <mwc-textfield outlined disabled value={this.taskState?.transferred}
                           placeholder='Transferred' label='Transferred' />
          </div>
        </div>
      </div>
      <div>
        <mwc-button label='3 - Custom fields' expandContent trailingIcon class='accordion-button'
                    icon={!this.statusActive ? 'expand_more' : 'expand_less'}
                    onClick={() => this.fieldsActive = !this.fieldsActive} />
        <div class={this.fieldsActive ? 'hidden not' : 'hidden'}>
          {this.customFieldsGenerator()}
        </div>
      </div>
      <div>
        <mwc-button label='4 - Custom attributes' expandContent trailingIcon class='accordion-button'
                    icon={!this.attributesActive ? 'expand_more' : 'expand_less'}
                    onClick={() => this.attributesActive = !this.attributesActive} />
        <div class={this.attributesActive ? 'hidden not' : 'hidden'}>
          <table>
            <tr>
              <th>Attribute</th>
              <th>Property</th>
            </tr>
            {this.taskState?.customAttributes.map(cAtt =>
              <tr>
                <td>
                  <mwc-textfield value={cAtt.key}
                                 placeholder='Attribute' />
                </td>
                <td>
                  <mwc-textfield value={cAtt.value}
                                 placeholder='Property' />
                </td>
              </tr>,
            )}
          </table>
          <div class='row'>
            <mwc-button unelevated onClick={() => {
              this.taskState =
                {
                  ...this.taskState,
                  customAttributes: [...(this.taskState.customAttributes || []), new CustomAttribute()],
                };
            }
            } label='Add new attribute' icon='add' />
          </div>
        </div>
      </div>
      <div>
        <mwc-button label='5 - Callback information' expandContent trailingIcon className='accordion-button'
                    icon={!this.callbackActive ? 'expand_more' : 'expand_less'}
                    onClick={() => this.callbackActive = !this.callbackActive} />
        <div class={this.callbackActive ? 'hidden not' : 'hidden'}>
          <table>
            <tr>
              <th>Attribute</th>
              <th>Property</th>
            </tr>
            {this.taskState?.callbackInfo.map(caBack =>
              <tr>
                <td>
                  <mwc-textfield value={caBack.key}
                                 placeholder='Attribute' />
                </td>
                <td>
                  <mwc-textfield value={caBack.value}
                                 placeholder='Property' />
                </td>
              </tr>,
            )}
          </table>
          <div class='row'>
            <mwc-button unelevated onClick={() => {
              this.taskState =
                {
                  ...this.taskState,
                  callbackInfo: [...(this.taskState.callbackInfo || []), new CustomAttribute()],
                };
            }
            } label='Add new callback information' icon='add' />
          </div>
        </div>
      </div>
    </div>;
  }

}
