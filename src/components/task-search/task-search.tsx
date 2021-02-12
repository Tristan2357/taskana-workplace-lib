import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'task-search',
  styleUrl: 'task-search.css',
  shadow: true,
})
export class TaskSearch {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
