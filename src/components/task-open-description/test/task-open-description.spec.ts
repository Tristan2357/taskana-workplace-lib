import { newSpecPage } from '@stencil/core/testing';
import { TaskOpenDescription } from '../task-open-description.component';

describe('task-open-description', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [TaskOpenDescription],
      html: '<task-open-description></task-open-description>',
    });
    expect(root).toEqualHtml(`
      <task-open-description>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </task-open-description>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [TaskOpenDescription],
      html: `<task-open-description first="Stencil" last="'Don't call me a framework' JS"></task-open-description>`,
    });
    expect(root).toEqualHtml(`
      <task-open-description first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </task-open-description>
    `);
  });
});
