import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'task-open-application',
  styleUrl: 'task-open-application.css',
  shadow: true,
})
export class TaskOpenApplication {

  @Prop() link: string;

  render() {
    return (
      <Host>
        <iframe src={this.link}/> //TODO think about if this is a useful component
      </Host>
    );
  }

}
