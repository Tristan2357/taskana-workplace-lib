import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'task-search',
  styleUrl: 'task-search.css',
  shadow: true,
})
export class TaskSearch {
  @State() expandedFilter: boolean;

  /*TODO Events*/

  componentWillLoad() {

  }

  render() {
    return <div>
      <div class='flex breathing lots'>
        <div class='flex column'>
          <mwc-button unelevated label='Add' icon='add' trailingIcon />
          <mwc-button outlined onClick={() => this.expandedFilter = !this.expandedFilter}>
            <mwc-icon>keyboard_arrow_{this.expandedFilter ? 'up' : 'down'}</mwc-icon>
          </mwc-button>
        </div>
        <div class='flex column grow'>
          <mwc-textfield label='Search for Workbasket' placeholder='Workbasket' />
          {/* TODO Menu?*/}{/*TODO Input Handling and updating*/}
          <div class='flex grow'>
            <mwc-textfield label='Type' placeholder='Type' />
            <mwc-textfield label='Value' placeholder='Value' />
          </div>
        </div>
        <div class='flex column right'>
          <mwc-button outlined>
            <mwc-icon>sort</mwc-icon>
          </mwc-button>
          <mwc-button unelevated>
            <mwc-icon class='white'>search</mwc-icon>
          </mwc-button>
        </div>
      </div>
      <div class={(this.expandedFilter ? 'not' : '') + ' hidden'}>
        <div class='flex breathing'>
          <mwc-textfield label='Filter task name' placeholder='Name' />
          <mwc-textfield type='number' label='Priority' />
        </div>
        <div class='flex breathing'>
          <mwc-textfield label='Filter owner' placeholder='Owner' />
        </div>
      </div>
    </div>;
  }
}
