import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'task-search',
  styleUrl: 'task-search.css',
  shadow: true,
})
export class TaskSearch {
  @State() searchBy: string = 'wb';

  render() {
    return <div class='flex'>
      <div>
        <button class='btn'>
          <span class='material-icons caret'>keyboard_arrow_down</span>
        </button>
        {this.searchBy == 'wb' ? <input type='text' placeholder='Search for Workbasket'/> : ''}

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
