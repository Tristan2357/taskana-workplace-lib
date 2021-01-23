import { newE2EPage } from '@stencil/core/testing';

describe('task-open-application', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<task-open-application></task-open-application>');

    const element = await page.find('task-open-application');
    expect(element).toHaveClass('hydrated');
  });
});
