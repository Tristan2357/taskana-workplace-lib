import { Component, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { Workbasket } from '../../models/workbasket';
import { Menu } from '@material/mwc-menu';
import '@material/mwc-icon';
import '@material/mwc-button';
import '@material/mwc-menu';
import '@material/mwc-list';
import '@material/mwc-textfield';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

type SortBy = 'CLASSIFICATION_KEY' | 'POR_TYPE' | 'POR_VALUE' | 'STATE' | 'NAME' | 'DUE' | 'PLANNED' | 'PRIORITY';
type OrderBy = 'ASCENDING' | 'DESCENDING';

export interface TaskFilterOptions {
  'workbasket-id'?: string[];
  'por.type'?: string[];
  'por.value'?: string[];

  'name-like'?: string[];
  'owner-like'?: string[];
  priority?: number[];

  'sort-by'?: SortBy;
  order?: OrderBy;

}

@Component({
  tag: 'task-search',
  styleUrl: 'task-search.css',
  shadow: true,
})
export class TaskSearch {
  private workbasketIds: string;
  private porType: string;
  private porValue: string;
  private nameLike: string;
  private ownerLike: string;
  private priority: number;
  private sortBy: SortBy = 'PRIORITY';
  private order: OrderBy = 'ASCENDING';

  private workbasketTextField: HTMLElement;
  private sortButton: HTMLElement;
  private workbasketMenu: Menu;
  private sortMenu: Menu;

  @State() expandedFilter: boolean;
  @State() workbasketSearch: string;
  @State() workbasketNames: string[];

  /** A list of existing Workbaskets, which the user is allowed to access.
   * this list gets used to display a dropdown for easier filtering by Workbasket*/
  @Prop() workbaskets: Workbasket[];

  /** This event gets emitted, when the "Add" button has been pressed.*/
  @Event() addTaskEvent: EventEmitter<void>;

  /** This event gets emitted, when a user has pressed the "Search" button.
   * It emits a TaskFilterOptions object, which contains all the parameters for the specified search.*/
  @Event() searchTasksEvent: EventEmitter<TaskFilterOptions>;

  @Watch('workbaskets')
  handleWorkbasketsChange(workbaskets: Workbasket[]) {
    this.workbasketNames = workbaskets.map(w => w.name);
  }

  @Watch('workbasketSearch')
  handleWorkbasketSearch(workbasketSearchTerm: string) {
    const filteredWorkbaskets = this.workbaskets.filter(workbasket => workbasket.name == workbasketSearchTerm);
    if (filteredWorkbaskets.length) filteredWorkbaskets.forEach(wb => this.workbasketIds = wb.workbasketId);
    else this.workbasketIds = undefined;
  }

  private handleSearchTasks() {
    let taskFilterOptions: TaskFilterOptions = {
      'workbasket-id': [this.workbasketIds],
      'por.type': [this.porType],
      'por.value': [this.porValue],
      'name-like': [this.nameLike],
      'owner-like': [this.ownerLike],
      priority: [this.priority],
      'sort-by': this.sortBy,
      order: this.order,
    };
    console.log(taskFilterOptions);
    this.searchTasksEvent.emit(taskFilterOptions);
  }

  private handleSortingParams() {
    const selected = this.sortMenu.selected as ListItemBase[];
    if (selected != null) {
      selected.forEach((value: ListItemBase) => this[value.group] = value.text.substr(5).toUpperCase());
    }

  }

  componentDidLoad() {
    this.workbasketMenu.anchor = this.workbasketTextField;
    this.workbasketMenu.corner = 'BOTTOM_LEFT';
    this.workbasketMenu.defaultFocus = 'NONE';
    this.sortMenu.anchor = this.sortButton;
    this.sortMenu.corner = 'BOTTOM_LEFT';
  }

  render() {
    return <div>
      <div class='flex breathing lots'>
        <div class='flex column'>
          <mwc-button unelevated label='Add' icon='add' trailingIcon onClick={this.addTaskEvent} />
          <mwc-button outlined onClick={() => this.expandedFilter = !this.expandedFilter}>
            <mwc-icon>keyboard_arrow_{this.expandedFilter ? 'up' : 'down'}</mwc-icon>
          </mwc-button>
        </div>
        <div class='flex column grow'>
          <mwc-textfield label='Search for Workbasket' placeholder='Workbasket'
                         value={this.workbasketSearch}
                         ref={t => this.workbasketTextField = t}
                         onInput={e => {
                           this.workbasketMenu.open = true;
                           this.workbasketSearch = e.target.value;
                         }} />
          <mwc-menu tabindex={-1} fixed ref={m => this.workbasketMenu = m} onSelected={(e: SingleSelectedEvent) => {
            this.workbasketSearch = this.workbasketMenu.items[e.detail.index]?.value || this.workbasketSearch;
          }}>
            {this.workbasketNames?.filter(name => name?.toLowerCase().includes(this.workbasketSearch?.toLowerCase())).map(name =>
              <mwc-list-item value={name}>{name}</mwc-list-item>)}
          </mwc-menu>
          <div class='flex s100'>
            <mwc-textfield label='Type' placeholder='Type' onInput={e => this.porType = e.target.value} />
            <mwc-textfield label='Value' placeholder='Value' onInput={e => this.porValue = e.target.value} />
          </div>
        </div>
        <div class='flex column right'>
          <mwc-button outlined ref={b => this.sortButton = b}
                      onClick={() => this.sortMenu.show()}>
            <mwc-icon>sort</mwc-icon>
          </mwc-button>
          <mwc-menu fixed multi ref={m => this.sortMenu = m} graphic='icon'
                    onSelected={() => this.handleSortingParams()}>
            <mwc-list-item noninteractive>Sort Direction</mwc-list-item>
            <mwc-list-item selected={this.order == 'ASCENDING'} group='order'>
              <mwc-icon>check</mwc-icon>
              <span>Ascending</span></mwc-list-item>
            <mwc-list-item selected={this.order == 'DESCENDING'} divider group='order'>
              <mwc-icon>check</mwc-icon>
              <span>Descending</span></mwc-list-item>
            <mwc-list-item noninteractive>Sort Value</mwc-list-item>
            <mwc-list-item selected={this.sortBy == 'PRIORITY'} group='sortBy'>
              <mwc-icon>check</mwc-icon>
              <span>Priority</span></mwc-list-item>
            <mwc-list-item selected={this.sortBy == 'NAME'} group='sortBy'>
              <mwc-icon>check</mwc-icon>
              <span>Name</span></mwc-list-item>
            <mwc-list-item selected={this.sortBy == 'DUE'} group='sortBy'>
              <mwc-icon>check</mwc-icon>
              <span>Due</span></mwc-list-item>
            <mwc-list-item selected={this.sortBy == 'PLANNED'} group='sortBy'>
              <mwc-icon>check</mwc-icon>
              <span>Planned</span></mwc-list-item>
          </mwc-menu>
          <mwc-button unelevated onClick={() => this.handleSearchTasks()}>
            <mwc-icon class='white'>search</mwc-icon>
          </mwc-button>
        </div>
      </div>
      <div class={(this.expandedFilter ? 'not' : '') + ' hidden'}>
        <div class='flex breathing'>
          <mwc-textfield label='Filter task name' placeholder='Name' onInput={e => this.nameLike = e.target.value} />
          <mwc-textfield type='number' label='Priority' onInput={e => this.priority = e.target.value} />
        </div>
        <div class='flex breathing'>
          <mwc-textfield label='Filter owner' placeholder='Owner' onInput={e => this.ownerLike = e.target.value} />
        </div>
      </div>
    </div>;
  }
}
