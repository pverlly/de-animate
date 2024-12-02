function disableAnimationsAndTransitions() {
  // Remove transições e animações CSS
  const style = document.createElement('style');
  style.innerHTML = `
      * {
          animation: none !important;
          transition: none !important;
          scroll-behavior: auto !important;
      }
  `;

  document.head.appendChild(style);

  // Função para interromper animações CSS inseridas dinamicamente
  const observer = new MutationObserver(() => {
      document.querySelectorAll('*').forEach((el) => {
          if (getComputedStyle(el).animationName !== 'none') {
              el.style.animation = 'none';
          }
          if (getComputedStyle(el).transition !== 'none') {
              el.style.transition = 'none';
          }
      });
  });

  observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
  });

  // Interrompe eventuais animações feitas via JavaScript
  const stopAnimations = () => {
      let highestId = window.setTimeout(() => {});
      for (let i = 0; i <= highestId; i++) {
          window.clearTimeout(i);
          window.clearInterval(i);
      }
  };

  // Parar animações imediatamente e garantir que elas sejam desativadas no futuro
  stopAnimations();
  setInterval(stopAnimations, 1000);
}


function disableWebFonts() {
  const fontStyle = document.createElement('style');
  fontStyle.innerHTML = `
      * {
          font-family: sans-serif !important;
      }
      
      *:hover, *:focus {
          transition: none !important;
      }
  `;
  document.head.appendChild(fontStyle);
}


function removeVideos() {
  document.querySelectorAll('video, iframe').forEach(el => el.remove());
  const videoObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
              mutation.addedNodes.forEach(node => {
                  if (node.tagName === 'VIDEO' || node.tagName === 'IFRAME') {
                      node.remove();
                  }
              });
          }
      });
  });
  videoObserver.observe(document.body, { childList: true, subtree: true });
}


function removeImages() {
  document.querySelectorAll('img').forEach(img => img.remove());
  const imgObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
              mutation.addedNodes.forEach(node => {
                  if (node.tagName === 'IMG') {
                      node.remove();
                  }
              });
          }
      });
  });
  imgObserver.observe(document.body, { childList: true, subtree: true });
}


function disableAll() {
  disableAnimationsAndTransitions();
  disableWebFonts();
  removeVideos();
  removeImages();
}


(() =>
{
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  // Desativa todas as funcionalidades ao carregar a página
  disableAll();


  browser.runtime.onMessage.addListener((message) =>
  {
    switch (message.command)
    {
      case 'disable-animations':
        console.log("disable-animations");
        disableAnimationsAndTransitions();
        break;
      case 'disable-web-fonts':
        console.log("disable-web-fonts");
        disableWebFonts();
        break;
      case 'remove-videos':
        console.log("remove-videos");
        removeVideos();
        break;
      case 'remove-images':
        console.log("remove-images");
        removeImages();
        break;
      default:
        console.log(message.command)
        break;
    }
  });

})();