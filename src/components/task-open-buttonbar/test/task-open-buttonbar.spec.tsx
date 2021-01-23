import { newSpecPage } from '@stencil/core/testing';
import { TaskOpenButtonbar } from '../task-open-buttonbar';

describe('task-open-buttonbar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaskOpenButtonbar],
      html: `<task-open-buttonbar></task-open-buttonbar>`,
    });
    expect(page.root).toEqualHtml(`
      <task-open-buttonbar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </task-open-buttonbar>
    `);
  });
});
