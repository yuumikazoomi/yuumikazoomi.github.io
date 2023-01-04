const AnimateSettingsMenu = () => {
  const settingsMenu = document.querySelector('.side-bar');
  const settingsBtn = document.querySelector('.heading button');
  const exitBtn = document.querySelector('.side-bar .heading button');
  settingsBtn.addEventListener('click',()=>{
    settingsMenu.classList.add('visible');
  })
  exitBtn.addEventListener('click',()=>{
    settingsMenu.classList.remove('visible');
  })
}
  AnimateSettingsMenu();