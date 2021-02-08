import { newE2EPage } from '@stencil/core/testing';

describe('task-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<task-list></task-list>');

    const element = await page.find('task-list');
    expect(element).toHaveClass('hydrated');
  });
});
