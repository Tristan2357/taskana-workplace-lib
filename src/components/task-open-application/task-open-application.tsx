import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'task-open-application',
  styleUrl: 'task-open-application.css',
  shadow: true,
})
export class TaskOpenApplication {

  /*The link to which the iFrame leads to*/
  @Prop() link: string;

  render() {
    return (
      <Host>
        <iframe src={this.link}/> {/*think about if this is a useful component => NO*/}
      </Host>
    );
  }

}
