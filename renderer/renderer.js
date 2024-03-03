function animateButton(){
    const button = document.querySelector('.animated-button');
    button.classList.add('animated');
    
    // Remove the 'animated' class after the animation duration
    setTimeout(() => {
      button.classList.remove('animated');
    }, 1000);
  }