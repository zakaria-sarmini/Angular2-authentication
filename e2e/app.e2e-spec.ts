import { AuthenticationPage } from './app.po';

describe('authentication App', function() {
  let page: AuthenticationPage;

  beforeEach(() => {
    page = new AuthenticationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
