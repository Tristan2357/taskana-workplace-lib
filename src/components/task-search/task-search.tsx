import { Component, h } from '@stencil/core';

@Component({
  tag: 'task-search',
  styleUrl: 'task-search.css',
  shadow: true,
})
export class TaskSearch {

  render() {
    return <div class='flex'>
      <div>
        <button class='btn'>
          <span class='material-icons caret'>keyboard_arrow_down</span>
        </button>
        <input />
      </div>
      <button class='btn right'>
        <img src='../../assets/wb-empty.svg' width='20' height='20' alt='' />
      </button>
    </div>;
  }
}
