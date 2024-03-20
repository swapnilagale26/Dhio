const validatePhone = (evt) => {
  const theEvent = evt || window.event;
  let key = theEvent.keyCode || theEvent.which;
  // Handle paste
  if (theEvent.type === 'paste') {
      key = evt.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      key = String.fromCharCode(key);
  }
  const regex = /[0-9]|\./;
  if( !regex.test(key) && evt.key !== 'Backspace' && evt.key !== 'Meta') {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

// eslint-disable-next-line no-useless-escape
const validateEmail = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export { validateEmail, validatePhone };

