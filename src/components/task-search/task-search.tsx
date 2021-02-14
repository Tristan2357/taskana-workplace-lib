import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import { Workbasket } from '../../models/workbasket';
import { WorkbasketResource } from '../../models/workbasket-resource';
import * as workbasketsExample from '../../data/workbaskets.json';

@Component({
  tag: 'task-search',
  styleUrl: 'task-search.css',
  shadow: true,
})
export class TaskSearch {
  @State() searchBy: string = 'wb';

  @Prop() workbaskets: Workbasket[];

  @Event() searchValueChangedEvent: EventEmitter<string>;

  @Event() selectWorkbasketEvent: EventEmitter<string>;

  private searchChangeHandler(event) {
    let { value } = event.currentTarget;
    this.searchValueChangedEvent.emit(value);
  }

  componentWillLoad() {
    // this is just for demo purposes
    const workbasketResource: WorkbasketResource = workbasketsExample;
    if (!this.workbaskets) {
      this.workbaskets = workbasketResource.workbaskets;
    }
  }

  render() {
    return <div class='flex'>
      <div>
        <button class='btn'>
          <span class='material-icons no-text'>keyboard_arrow_down</span>
        </button>
        {this.searchBy == 'wb' ?
          <div class='dropdown no-hover'>
            <input type='text' placeholder='Search for Workbasket' onInput={event => this.searchChangeHandler(event)} />
            <div class='dropdown-content'>
              {/* TODO: think about how search works and how a good way to abstract and simplify looks
              maybe a search object with all options*/}
              {this.workbaskets?.map(workbasket =>
                <span onClick={() => this.selectWorkbasketEvent.emit(workbasket.workbasketId)}>
                  {workbasket.name}</span>,
              )}</div>
          </div>
          :
          <div>
            <input class='t-v' id='type' type='text' placeholder='Type' />
            <input class='t-v' id='value' type='text' placeholder='Value'/>
            <button class='btn primary'>
              <span class='material-icons no-text'>search</span>
            </button>
          </div>}

      </div>
      <div class='dropdown'>
        <button class='btn right'>{'Search by '}
          <img src='../../assets/wb-empty.svg' width='20' height='20' alt='' />
        </button>
        <div class='dropdown-content'>
          <div class='flex' onClick={() => this.searchBy = 'wb'}>
            <img src='../../assets/wb-empty.svg' width='20' height='20' alt='' />
            <span>Workbasket</span>
          </div>
          <div class='flex' onClick={() => this.searchBy = 'tv'}>
            <span class='material-icons'><b>T</b></span>
            <span>Type and Value</span>
          </div>
        </div>
      </div>
    </div>;
  }
}
