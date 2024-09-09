
document.addEventListener('DOMContentLoaded', function() {
// Driver info section

const fetchButton = document.getElementById('fetchButton');
  if (fetchButton) {
    fetchButton.addEventListener('click', saveDriverInput);
  }


function saveDriverInput() {

  const num = document.getElementById('number').value;

  console.log('User entered number:', num)

  fetchDriverData(num);

}


function fetchDriverData(num) {
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
    const container = document.getElementById('data-container1');

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


// Circuit section

const fetchButton3 = document.getElementById('fetchButton3');
if (fetchButton3) {
  fetchButton3.addEventListener('click', saveCountryInput);
}


function saveCountryInput() {

  const Country = document.getElementById('country1').value;

  console.log('User entered country:', Country)

  fetchCountryData(Country);

}

function fetchCountryData(Country) {
  const url = `https://api.openf1.org/v1/meetings?year=2023&country_name=${Country}`;
  console.log('Fetching data from:', url); // Log the URL being called


  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error ('Network response was not ok');
      }
      return response.json(); // if ok
    })

    .then(data => {
      console.log('Data received from API:', data); // Log the full response data for debugging


      if (data.length === 0) { // Handle empty data
        console.error('No circuit information found for the country:', Country);
        document.getElementById('data-container3').innerHTML = 'No circuit information found.';
        return;
      }
      const track = data[0]; 
      if (!track) { // Check if track data exists
        console.error('No track data found for the selected country.');
        document.getElementById('data-container3').innerHTML = 'No track data available.';
        return;
      }

    // Create an h1 element to display the official name
    const officialname = document.createElement('h1');
    officialname.textContent = track.meeting_official_name;

    // Create an h1 element to display the country
    const countryname = document.createElement('h1');
    countryname.textContent = track.country_name;

    // Create h3 element to display circuit
    const location = document.createElement('h3');
    location.textContent = `Circuit location: ${track.location}`;
    
    // Create h3 element to display date
    const datestart = document.createElement('h3');
    datestart.textContent = `Grand Prix date: ${track.date_start}`;

    // Create h3 element to display gmt offset
    const gmt = document.createElement('h3');
    gmt.textContent = `GMT offset: ${track.gmt_offset}`;
  
    // Clear the data container and add the new h1 element
    const container3 = document.getElementById('data-container3');

    // Clear any existing content
    container3.innerHTML = ''; 

    container3.appendChild(officialname);
    container3.appendChild(countryname);
    container3.appendChild(location);
    container3.appendChild(datestart);
    container3.appendChild(gmt);

    })
  .catch(error => {
    console.error('Error fetching data:', error); // Log any errors
      document.getElementById('data-container3').innerHTML = 'An error occurred while fetching data.';
  });

}

});
