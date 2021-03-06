import { Component, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { CustomAttribute, Task } from '../../models/task';
import { ClassificationSummary } from '../../models/classification-summary';
import '@material/mwc-textfield';
import '@material/mwc-textarea';
import '@material/mwc-button';
import '@material/mwc-select';
import '@material/mwc-menu';
import '@material/mwc-list';
import '@material/mwc-icon';
import { Menu } from '@material/mwc-menu';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';

@Component({
  tag: 'task-preview',
  styleUrl: 'task-preview.css',
  shadow: true,
})
export class TaskPreview {
  private menu: Menu;
  private menuButton: HTMLElement;
  private resetState: Task;

  @State() infoActive: boolean = true;
  @State() statusActive: boolean = false;
  @State() fieldsActive: boolean = false;
  @State() attributesActive: boolean = false;
  @State() callbackActive: boolean = false;
  @State() taskState: Task;

  /** The task, which should be displayed*/
  @Prop() task: Task;
  /** The List of classifications, which exist. This is used to show the user a dropdown to specify the classification of the task.*/
  @Prop() classifications: ClassificationSummary[];

  /** This event gets emitted, when the user saves the Task. It emits the Task, that should be saved.*/
  @Event() saveTask: EventEmitter<Task>;
  /** This event gets emitted, when the user wants to open the task to work on it. It emits the taskId.*/
  @Event() openTask: EventEmitter<string>;
  /** This event gets emitted, when the user wants to delete the current Task. It emits the taskId.
   *  This component does NOT include a second dialog, which confirms the users choice to delete the task. Please make sure your application includes a PopUp to confirm, if the user actually wants to delete the task.*/
  @Event() deleteTask: EventEmitter<string>;
  /** This event gets emitted, when the user closes the current Task.*/
  @Event() close: EventEmitter<void>;

  @Watch('task')
  handleTaskChange(task) {
    this.taskState = { ...task };
    this.taskState.customAttributes = this.taskState.customAttributes || [];
    this.taskState.callbackInfo = this.taskState.callbackInfo || [];
    this.resetState = { ...this.taskState };
  }

  componentDidLoad() {
    this.menu.anchor = this.menuButton;
    this.menu.corner = 'BOTTOM_LEFT';
    this.handleTaskChange(this.task);
  }

  private customFieldsGenerator(): any[] {
    let ar = [];
    const CUSTOM_FIELD_COUNT = 16;
    for (let i = 1; i <= CUSTOM_FIELD_COUNT; i+=2) {
      ar.push(<div class='row'>
        <mwc-textfield outlined value={this.taskState?.['custom' + i] || ''}
                       placeholder={'Custom ' + i} label={'Custom ' + i}
                       onInput={(e) => this.handleSimpleChange(e, 'custom' + i)} />
        <mwc-textfield outlined value={this.taskState?.['custom' + (i+1)] || ''}
                       placeholder={'Custom ' + (i+1)} label={'Custom ' + (i+1)}
                       onInput={(e) => this.handleSimpleChange(e, 'custom' + (i+1))} />
      </div>);
    }
    return ar;
  }

  handleSimpleChange(event, ref) {
    this.taskState = { ...this.taskState, [ref]: event.target.value };
  }

  handlePrimaryObjRefChange(event, ref) {
    this.taskState = {
      ...this.taskState,
      primaryObjRef: { ...this.taskState.primaryObjRef, [ref]: event.target.value },
    };
  }

  handleClassificationSelectChange(event: SingleSelectedEvent) {
    this.taskState = {
      ...this.taskState,
      classificationSummary: this.classifications[event.detail.index],
    };
    this.classifications = {...this.classifications}; // Yes this is because Stencils has no real changedetection
  }

  handleAttributeChange(event, ref: string, index: number) {
    this.taskState[ref][index] = event.target.value;
    this.taskState = { ...this.taskState,
      [ref]: [...this.taskState[ref]]
    }
  }

  render() {
    return <div>
      <div class='head'>
        <span>
          <h4>{this.task?.name}</h4>
        </span>
        <div class='flex right'>
          <mwc-button unelevated label='Save Task' icon='save' trailingIcon onClick={() => this.saveTask.emit(this.taskState)}/>
          <mwc-button outlined label='Open Task' icon='open_in_new'
                      trailingIcon onClick={() => this.openTask.emit(this.task.taskId)}/>
          <mwc-button utlined icon='more_vert'
                      trailingIcon
                      ref={b => this.menuButton = b}
                      onClick={() => {
                        this.menu.show();
                      }} />
          <mwc-menu fixed ref={m => this.menu = m}>
            <mwc-list-item graphic="icon" onClick={() => {
              this.taskState = { ...this.resetState }
            }}>
              <mwc-icon slot='graphic'>undo</mwc-icon>
              Undo Changes
            </mwc-list-item>
            <mwc-list-item class='danger' graphic="icon" onClick={() => this.deleteTask.emit(this.taskState.taskId)}>
              <mwc-icon class='danger' slot='graphic'>delete</mwc-icon>
              Delete Task
            </mwc-list-item>
            <mwc-list-item class='grey' graphic="icon" onClick={this.close.emit}>
              <mwc-icon class='grey' slot='graphic'>close</mwc-icon>
              Close
            </mwc-list-item>
          </mwc-menu>
        </div>
      </div>
      <div>
        <mwc-button label='1 - Information' expandContent trailingIcon class='accordion-button'
                    icon={!this.infoActive ? 'expand_more' : 'expand_less'}
                    onClick={() => this.infoActive = !this.infoActive} />
        <div class={this.infoActive ? 'hidden not' : 'hidden'}>
          <div class='row'>
            <mwc-textfield outlined required value={this.taskState?.name}
                           placeholder='Name' label='Name' onInput={(e) => this.handleSimpleChange(e, 'name')}/>
            <mwc-textfield outlined required value={this.taskState?.primaryObjRef?.company}
                           placeholder='Company description' label='Company' onInput={(e) => this.handlePrimaryObjRefChange(e, 'company')}/>
          </div>
          <div class='row'>
            <mwc-textfield outlined required value={this.taskState?.primaryObjRef?.system}
                           placeholder='System description' label='System' onInput={(e) => this.handlePrimaryObjRefChange(e, 'system')}/>
            <mwc-textfield outlined required value={this.taskState?.primaryObjRef?.systemInstance}
                           placeholder='System instance description' label='System instance' onInput={(e) => this.handlePrimaryObjRefChange(e, 'systemInstance')}/>
          </div>
          <div class='row'>
            <mwc-textfield outlined required value={this.taskState?.primaryObjRef?.type}
                           placeholder='Reference type' label='Reference type' onInput={(e) => this.handlePrimaryObjRefChange(e, 'type')}/>
            <mwc-textfield outlined required value={this.taskState?.primaryObjRef?.value}
                           placeholder='Reference value' label='Reference value' onInput={(e) => this.handlePrimaryObjRefChange(e, 'value')}/>
          </div>
          <div class='row'>
            <mwc-select outlined required label='Classification'>
              {this.classifications?.map(classification => <mwc-list-item value={classification.classificationId}
                                                                          selected={classification.classificationId == this.taskState?.classificationSummary?.classificationId}>
                {classification.name}
              </mwc-list-item>)}
            </mwc-select>
            <mwc-textfield outlined class='smoll' type='number' value={this.taskState?.priority}
                           placeholder='0' label='Priority' onInput={(e) => this.handleSimpleChange(e, 'priority')}/>
            <mwc-textfield outlined /*type='date'*/
                           value={this.taskState?.due || new Date().toISOString().substr(0, 10)}
                           label='Due date' onInput={(e) => this.handleSimpleChange(e, 'due')}/>
          </div>
          <div class='row'>
            <mwc-textfield outlined value={this.taskState?.parentBusinessProcessId}
                           placeholder='Parent business process id' label='Parent business process id' onInput={(e) => this.handleSimpleChange(e, 'parentBusinessProcessId')}/>
            <mwc-textfield outlined value={this.taskState?.businessProcessId}
                           placeholder='Business process id' label='Business process id' onInput={(e) => this.handleSimpleChange(e, 'businessProcessId')}/>
          </div>
          <div class='row'>
            <mwc-textfield outlined value={this.taskState?.owner}
                           placeholder='Owner' label='Owner' onInput={(e) => this.handleSimpleChange(e, 'owner')}/>
            <mwc-textarea outlined rows={5} label='Note'
                          placeholder='Note' value={this.taskState?.note} onInput={(e) => this.handleSimpleChange(e, 'note')}/>
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
            {this.taskState?.customAttributes.map((cAtt, index) =>
              <tr>
                <td>
                  <mwc-textfield value={cAtt.key}
                                 placeholder='Attribute' onInput={(e) => this.handleAttributeChange(e, 'customAttributes', index)}/>
                </td>
                <td>
                  <mwc-textfield value={cAtt.value}
                                 placeholder='Property' onInput={(e) => this.handleAttributeChange(e, 'customAttributes', index)}/>
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
            {this.taskState?.callbackInfo.map((caBack, index) =>
              <tr>
                <td>
                  <mwc-textfield value={caBack.key}
                                 placeholder='Attribute' onInput={(e) => this.handleAttributeChange(e, 'callbackInfo', index)}/>
                </td>
                <td>
                  <mwc-textfield value={caBack.value}
                                 placeholder='Property' onInput={(e) => this.handleAttributeChange(e, 'callbackInfo', index)}/>
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
