
document.addEventListener('DOMContentLoaded', function() {

// Driver info section

const fetchButton = document.getElementById('fetchButton');
  if (fetchButton) {
    fetchButton.addEventListener('click', saveDriverInput);
  }

function saveDriverInput() {

  const input = document.getElementById('name').value;
  const formattedName = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();

  console.log('User entered number:', formattedName)

  fetchDriverData(formattedName);

}

function fetchDriverData(formattedName) {
  const url = `https://api.openf1.org/v1/drivers?last_name=${formattedName}&session_key=9158`;

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

// Racing telemetry section

const fetchButton2 = document.getElementById('fetchButton2');
if (fetchButton2) {
  fetchButton2.addEventListener('click', saveRacingInput);
}


function saveRacingInput() {

  const telemetry = document.getElementById('telemetryNumber').value;
  console.log('User entered telemetry:', telemetry)

  const lapNumber = document.getElementById('lap').value;
  console.log('User entered lap:', lapNumber)

  fetchRacingData(telemetry, lapNumber);

}

function fetchRacingData(telemetry, lapNumber) {
  const url = `https://api.openf1.org/v1/laps?session_key=latest&driver_number=${telemetry}&lap_number=${lapNumber}`;
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
        console.error('No info found:', telemetry, laptime);
        document.getElementById('data-container2').innerHTML = 'No circuit information found.';
        return;
      }
      const race = data[0]; 
      if (!race) { // Check if track data exists
        console.error('No race data found.');
        document.getElementById('data-container2').innerHTML = 'No race data available.';
        return;
      }

    // Create an h1 element to display the starting date and time in iso 8601 format
    const startdate = document.createElement('h3');
    startdate.textContent = `Lap start time: ${race.date_start}`;

    // Create an h1 element to display the driver number
    const drivernum = document.createElement('h1');
    drivernum.textContent = `Racing Number: ${race.driver_number}`;

    // Create h1 element to display laptime
    const laptime = document.createElement('h1');
    laptime.textContent = `Lap time: ${race.lap_duration}`;

    // Create h3 element to display lap number
    const lapnumber = document.createElement('h1');
    lapnumber.textContent = `Lap number: ${race.lap_number}`;

    // Create h3 element to display sector 1 time
    const s1 = document.createElement('h3');
    s1.textContent = `Sector 1 time: ${race.duration_sector_1}`;
    
    // Create h3 element to display sector 2 time
    const s2 = document.createElement('h3');
    s2.textContent = `Sector 2 time: ${race.duration_sector_2}`;

    // Create h3 element to display sector 3 time
    const s3 = document.createElement('h3');
    s3.textContent = `Sector 3 time: ${race.duration_sector_3}`;

    // Create h3 element to display speedtrap 
    const speedtrap = document.createElement('h3');
    speedtrap.textContent = `Speed trap: ${race.st_speed} km/h`;

    // Create h3 element to display out lap
    const outlap = document.createElement('h3');

    // display mesg if true
    if (race.is_pit_out_lap) {
    outlap.textContent = `This lap is an out-lap`;
    }

    else {
      outlap.textContent = `This lap is not an out-lap`;
    }


    // Clear the data container and add the new h1 element
    const container2 = document.getElementById('data-container2');

    // Clear any existing content
    container2.innerHTML = ''; 

    container2.appendChild(drivernum);
    container2.appendChild(lapnumber);
    container2.appendChild(laptime);
    container2.appendChild(s1);
    container2.appendChild(s2);
    container2.appendChild(s3);
    container2.appendChild(speedtrap);
    container2.appendChild(startdate);
    container2.appendChild(outlap);
    
    })
  .catch(error => {
    console.error('Error fetching data:', error); // Log any errors
      document.getElementById('data-container2').innerHTML = 'An error occurred while fetching data.';
  });

}

// Circuit Section

const fetchButton3 = document.getElementById('fetchButton3');
if (fetchButton3) {
  fetchButton3.addEventListener('click', saveCountryInput);
}

function saveCountryInput() {

  const Country = document.getElementById('country1').value;

  const countryName = Country.charAt(0).toUpperCase() + Country.slice(1).toLowerCase();

  console.log('User entered country:', countryName)

  fetchCountryData(countryName);
  fetchWeekendData(countryName);

}

function fetchCountryData(countryName) {
  const url = `https://api.openf1.org/v1/meetings?year=2024&country_name=${countryName}`;
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
   
  
    })
  .catch(error => {
    console.error('Error fetching data:', error); // Log any errors
      document.getElementById('data-container3').innerHTML = 'An error occurred while fetching data.';
  });

}

// Weekend section

function fetchWeekendData(countryName) {
  const url = `https://api.openf1.org/v1/sessions?country_name=${countryName}&year=2024`;
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
        console.error('No GP information found for the weekend:', Country);
        document.getElementById('data-container3').innerHTML = 'No circuit information found.';
        return;
      }

    const container3 = document.getElementById('data-container3');
   
    // Loop through the array and display each stint
    data.forEach(track => {

      // Create elements for each stint's data
      const stintElement2 = document.createElement('div');
      stintElement2.innerHTML = `
        <h1>Session: ${track.session_name}</h1>
        <h3>Session type: ${track.session_type}</h3>
        <h3>Date start: ${track.date_start}</h3>
        <h3>Date end: ${track.date_end}</h3>
        <h3>Location: ${track.location}</h3>
        <h3>Country: ${track.country_name}</h3>
        <h3>Year: ${track.year}</h3>
        <hr> <!-- Add a horizontal line between stints -->
      `;

      // Append each stint's data to the container.
      container3.appendChild(stintElement2);
    });
     
    })
  .catch(error => {
    console.error('Error fetching data:', error); // Log any errors
      document.getElementById('data-container3').innerHTML = 'An error occurred while fetching data.';
  });

}

// Stint section

const fetchButton4 = document.getElementById('fetchButton4');
if (fetchButton4) {
  fetchButton4.addEventListener('click', saveStintInput);
}


function saveStintInput() {

  const Stint = document.getElementById('stint').value;

  console.log('User entered country:', Stint)

  fetchStintData(Stint);

}

function fetchStintData(Stint) {
  const url = `https://api.openf1.org/v1/stints?session_key=latest&driver_number=${Stint}`;
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
        console.error('No circuit information found for the stint:', Stint);
        document.getElementById('data-container4').innerHTML = 'No circuit information found.';
        return;
      }

    // Clear the data container
    const container4 = document.getElementById('data-container4');
    container4.innerHTML = ''; // Clear any existing content

    // Loop through the array and display each stint
    data.forEach(stint => {

      // Create elements for each stint's data
      const stintElement = document.createElement('div');
      stintElement.innerHTML = `
        <h1>Stint ${stint.stint_number}</h1>
        <h3>Stint started on lap: ${stint.lap_start}</h3>
        <h3>Stint ended on lap: ${stint.lap_end}</h3>
        <h3>Tire compound: ${stint.compound}</h3>
        <h3>Tire age at start of stint: ${stint.tyre_age_at_start}</h3>
        <hr> <!-- Add a horizontal line between stints -->
      `;

      // Append each stint's data to the container.
      container4.appendChild(stintElement);
    });
     
    })
  .catch(error => {
    console.error('Error fetching data:', error); // Log any errors
      document.getElementById('data-container4').innerHTML = 'An error occurred while fetching data.';
  });

}

// Race control section

const fetchButton5 = document.getElementById('fetchButton5');
if (fetchButton5) {
  fetchButton5.addEventListener('click', saveControlInput);
}

function saveControlInput() {

  const control = document.getElementById('control').value;

  console.log('User entered race control:', control)

  fetchControlData(control);

}

function fetchControlData(control) {
  const url = `https://api.openf1.org/v1/race_control?&driver_number=${control}`;
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
        console.error('No circuit information found for the control:', control);
        document.getElementById('data-container5').innerHTML = 'No race control information found.';
        return;
      }

    // Clear the data container
    const container5 = document.getElementById('data-container5');
    container5.innerHTML = ''; // Clear any existing content

    // Loop through the array and display each stint
    data.forEach(raceControl => {

      // Create elements for each stint's data
      const raceControlElement = document.createElement('div');
      raceControlElement.innerHTML = `
        <h1>Lap: ${raceControl.lap_number}</h1>
        <h3>Flag: ${raceControl.flag}</h3>
        <h3>Event: ${raceControl.message}</h3>
        <hr> <!-- Add a horizontal line between stints -->
      `;

      // Append each stint's data to the container.
      container5.appendChild(raceControlElement);
    });
     
    })
  .catch(error => {
    console.error('Error fetching data:', error); // Log any errors
      document.getElementById('data-container5').innerHTML = 'An error occurred while fetching data.';
  });

}

// Pit Stop section

const fetchButton6 = document.getElementById('fetchButton6');
  if (fetchButton6) {
    fetchButton6.addEventListener('click', savePitInput);
  }

function savePitInput() {

  const Pit = document.getElementById('pit').value;

  console.log('User entered pit driver:', Pit)

  fetchPitData(Pit);
}

function fetchPitData(Pit) {
  const url = `https://api.openf1.org/v1/pit?session_key=latest&driver_number=${Pit}`;

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
        console.error('No circuit information found for driver pit:', Pit);
        document.getElementById('data-container5').innerHTML = 'No race pit information found.';
        return;
      }

    // Clear the data container
    const container6 = document.getElementById('data-container6');
    container6.innerHTML = ''; // Clear any existing content

    // Loop through the array and display each stint
    data.forEach(PitStop => {

      // Create elements for each stint's data
      const pitStopElement = document.createElement('div');
      pitStopElement.innerHTML = `
        <h3>Lap ${PitStop.lap_number}</h1>
        <h1>Pit duration ${PitStop.pit_duration}s</h1>
        <hr> <!-- Add a horizontal line between pits -->
      `;

      // Append each stint's data to the container.
      container6.appendChild(pitStopElement);
    });
     
    })
  .catch(error => {
    console.error('Error fetching data:', error); // Log any errors
      document.getElementById('data-container6').innerHTML = 'An error occurred while fetching data.';
  });

}


// drop-down menu
document.querySelectorAll('.section-title').forEach(title => {
  title.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const arrow = this.querySelector('.arrow');

      // Toggle the display of the section content
      if (content.style.display === 'none' || content.style.display === '') {
          content.style.display = 'block';
          arrow.classList.add('expanded');  // Rotate arrow
      } else {
          content.style.display = 'none';
          arrow.classList.remove('expanded');  // Reset arrow
      }
  });
});



});
