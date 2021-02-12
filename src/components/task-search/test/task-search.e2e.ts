import { newE2EPage } from '@stencil/core/testing';

describe('task-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<task-search></task-search>');

    const element = await page.find('task-search');
    expect(element).toHaveClass('hydrated');
  });
});
