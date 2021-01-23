import { newSpecPage } from '@stencil/core/testing';
import { TaskOpenApplication } from '../task-open-application';

describe('task-open-application', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaskOpenApplication],
      html: `<task-open-application></task-open-application>`,
    });
    expect(page.root).toEqualHtml(`
      <task-open-application>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </task-open-application>
    `);
  });
});
