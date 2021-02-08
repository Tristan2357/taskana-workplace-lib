import { newSpecPage } from '@stencil/core/testing';
import { TaskList } from '../task-list';

describe('task-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaskList],
      html: `<task-list></task-list>`,
    });
    expect(page.root).toEqualHtml(`
      <task-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </task-list>
    `);
  });
});
