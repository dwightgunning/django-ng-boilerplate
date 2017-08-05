import { DjangongboilerplatePage } from './app.po';

describe('djangongboilerplate App', () => {
  let page: DjangongboilerplatePage;

  beforeEach(() => {
    page = new DjangongboilerplatePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
