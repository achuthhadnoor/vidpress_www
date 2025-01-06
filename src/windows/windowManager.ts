export interface licenseWindowManager {
  open: () => void;
  isOpen: () => boolean;
  close: () => void;
}

export interface mainWindowManager {
  open: () => void;
  close: () => void;
  isOpen: () => boolean;
}

export class WindowManager {
  license?: licenseWindowManager;
  main?: mainWindowManager;

  closeAll = () => {
    this.license?.close();
    this.main?.close();
  };

  setLicenseWindow = (licenseManager: licenseWindowManager) => {
    this.license = licenseManager;
  };

  setMainWindow = (mainManager: mainWindowManager) => {
    this.main = mainManager;
  };
}

export const windowManager = new WindowManager();
