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
      const driver = data[0]; 

    // Create an h1 element to display the full name
    const fullNameElement = document.createElement('h1');
    fullNameElement.textContent = driver.full_name;

    // Create h3 element to display driver number
    const driverNumberElement = document.createElement('h3');
    driverNumberElement.textContent = `Driver Number: ${driver.driver_number}`;
    
    // Create h3 element to display country code
    const countryCodeElement = document.createElement('h3');
    countryCodeElement.textContent = `Country: ${driver.country_code}`;

    // Create h3 element to display racing team
    const teamNameElement = document.createElement('h3');
    teamNameElement.textContent = `Team: ${driver.team_name}`;

    // Create an img element to display the headshot
    const headshotElement = document.createElement('img');
    headshotElement.src = driver.headshot_url;
    headshotElement.alt = `${driver.full_name} headshot`;
    headshotElement.style.width = '9%'; 
  

    // Clear the data container and add the new h1 element
    const container = document.getElementById('data-container');

    // Clear any existing content
    container.innerHTML = ''; 

    container.appendChild(fullNameElement);
    container.appendChild(driverNumberElement);
    container.appendChild(countryCodeElement);
    container.appendChild(teamNameElement);
    container.appendChild(headshotElement);

    })
  .catch(error => {
    console.error('Problem', error);
  });

}



document.getElementById('menuToggle').addEventListener('click', function() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('active');

});

  
    
    
    
    
