import { newSpecPage } from '@stencil/core/testing';
import { TaskPreviewInfo } from '../task-preview-info';

describe('task-preview-info', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaskPreviewInfo],
      html: `<task-preview-info></task-preview-info>`,
    });
    expect(page.root).toEqualHtml(`
      <task-preview-info>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </task-preview-info>
    `);
  });
});
