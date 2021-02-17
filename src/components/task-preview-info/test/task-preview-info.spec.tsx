import { newSpecPage } from '@stencil/core/testing';
import { TaskPreview } from '../task-preview.component';

describe('task-preview-info', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaskPreview],
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
