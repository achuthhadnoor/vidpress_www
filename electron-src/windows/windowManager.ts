interface MainWindowManager {
  open: (files?: string[]) => void;
  hideWindow: () => void;
}
interface LicenseWindowManager {
  open: (files?: string[]) => void;
}
class WindowManger {
  main?: MainWindowManager;
  license?: LicenseWindowManager;
  setMainWindow = (mainWindowManager: MainWindowManager) => {
    this.main = mainWindowManager;
  };
  setLicenseWindow = (licenseWindowManager: LicenseWindowManager) => {
    this.license = licenseWindowManager;
  };
}

export default new WindowManger();
