import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'task-open-buttonbar',
  styleUrl: 'task-open-buttonbar.css',
  shadow: true,
})
export class TaskOpenButtonbar {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
