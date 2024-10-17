const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach((menuItem) => {
  menuItem.addEventListener('mouseover', () => {
    menuItem.style.fontWeight = 'bold';
    menuItem.style.backgroundColor = '#ccc';
  });

  menuItem.addEventListener('mouseout', () => {
    menuItem.style.fontWeight = 'normal';
    menuItem.style.backgroundColor = '#f0f0f0';
  });
});