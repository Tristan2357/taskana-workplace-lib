import { newE2EPage } from '@stencil/core/testing';

describe('task-preview-info', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<task-preview-info></task-preview-info>');

    const element = await page.find('task-preview-info');
    expect(element).toHaveClass('hydrated');
  });
});
