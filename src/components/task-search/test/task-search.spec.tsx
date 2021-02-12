import { newSpecPage } from '@stencil/core/testing';
import { TaskSearch } from '../task-search';

describe('task-search', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaskSearch],
      html: `<task-search></task-search>`,
    });
    expect(page.root).toEqualHtml(`
      <task-search>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </task-search>
    `);
  });
});
