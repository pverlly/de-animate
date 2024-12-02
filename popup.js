document.addEventListener('DOMContentLoaded', function()
{
  // Escuta o evento de clique dos checkboxes
  const disableAnimations = document.getElementById('disableAnimations');
  const disableWebFonts = document.getElementById('disableWebFonts');
  const removeVideos = document.getElementById('removeVideos');
  const removeImages = document.getElementById('removeImages');

  // Desativa as animações
  disableAnimations.addEventListener('change', function()
  {
    if(disableAnimations.checked)
    {
      browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        browser.tabs.sendMessage(tabs[0].id, { command: 'disableAnimations' })
      })
    }
    else
    {
      alert('Reload the page to apply the changes');
    }
  })

  // Desativa as fontes web
  disableWebFonts.addEventListener('change', function()
  {
    if(disableWebFonts.checked)
    {
      browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        browser.tabs.sendMessage(tabs[0].id, { command: 'disableAnimations' })
      })
    }
    else
    {
      alert('Reload the page to apply the changes');
    }
  })

  // Remove os vídeos
  removeVideos.addEventListener('change', function()
  {
    if(removeVideos.checked)
    {
      browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        browser.tabs.sendMessage(tabs[0].id, { command: 'removeVideos' })
      }) 
    }
    else
    {
      alert('Reload the page to apply the changes');
    }
  })

  // Remove as imagens
  removeImages.addEventListener('change', function()
  {
    if(removeImages.checked)
    {
      browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        browser.tabs.sendMessage(tabs[0].id, { command: 'removeImages' })
      }) 
    }
    else
    {
      alert('Reload the page to apply the changes');
    }
  })

});
