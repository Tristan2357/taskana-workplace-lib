import { Component, h } from '@stencil/core';

@Component({
  tag: 'task-preview-info',
  styleUrl: 'task-preview-info.css',
  shadow: true,
})
export class TaskPreviewInfo {

  render() {
    return <div>
      <task-list></task-list>
    </div>;
  }

}
