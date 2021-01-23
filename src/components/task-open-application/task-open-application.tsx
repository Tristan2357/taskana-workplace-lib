import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'task-open-application',
  styleUrl: 'task-open-application.css',
  shadow: true,
})
export class TaskOpenApplication {

  render() {
    return (
      <Host>
        <iframe src={this.link}/> //TODO think about if this is a useful component
      </Host>
    );
  }

}
