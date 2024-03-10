interface MainWindowManager {
  open: (files?: string[]) => void;
}
class WindowManger {
  main?: MainWindowManager;
  setMainWindow = (mainWindowManager: MainWindowManager) => {
    this.main = mainWindowManager;
  };
}

export default new WindowManger();
