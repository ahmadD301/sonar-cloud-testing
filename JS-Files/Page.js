class Page {
  isOpen = false;

  constructor() {
    this.openPage();
  }

  printMenu() {
    console.clear();
  }
  openPage() {
    this.isOpen = true;
  }
}

module.exports = Page;
