document.getElementById('fetchButton').addEventListener('click', saveInput);

function saveInput() {

  const num = document.getElementById('number').value;

  console.log('User entered number:', num)

  fetchData(num);

}


function fetchData(num) {
  const url = `https://api.openf1.org/v1/drivers?driver_number=${num}&session_key=latest`;



fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error ('Network response was not ok');
    }
    return response.json(); // if ok
  })

  .then(data => {
    document.getElementById('data-container').innerText = JSON.stringify(data, null, 2);
  })
.catch(error => {
  console.error('Problem', error);
});

}

document.getElementById('menuToggle').addEventListener('click', function() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('active');
});

  
    
    
    
    
