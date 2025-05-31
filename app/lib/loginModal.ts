let openLoginModal: (() => void) | null = null;

export function setLoginModalOpener(opener: () => void) {
  openLoginModal = opener;
}

export function showLoginModal() {
  if (openLoginModal) {
    openLoginModal();
  }
}
