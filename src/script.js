// update navigation bar depending on the page
function updateNavigation() {
    // get position of each section and store in an array
    const positions = [];
    document.querySelectorAll('.contProgress a').forEach(function(link) {
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      positions.push(targetElement.offsetTop);
    });
  
    const scrollPosition = window.scrollY+100;
  
    positions.forEach(function(positions, index) {
      const link = document.querySelectorAll('.contProgress a')[index];
      if (scrollPosition >= positions) {
        document.querySelectorAll('.contProgress a').forEach(function(link) {
          link.classList.remove('selectedProg');
        });
        link.classList.add('selectedProg');
      }
    });
  }
  
  // scroll to target section
  document.querySelectorAll('.contProgress a').forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    });
  });
  
  
  window.addEventListener('scroll', function() {
    updateNavigation();
  });
  
  
  // ----------------------------------------------------------------------
  
  document.addEventListener("DOMContentLoaded", function() {
      // Fetch the nationalities data
      fetch('./nationalities.txt')
        .then(response => response.text())
        .then(data => {
          var nationalities = data.split('\n');
          
          // Get the dropdown element for nationality
          var nationalityDropdown = document.getElementById("dropdownNationality");
  
          // Loop through the nationalities array and populate the dropdown
          nationalities.forEach(nationality => {
              var option = document.createElement("option");
              option.textContent = nationality.trim(); // Remove any leading/trailing whitespace
              nationalityDropdown.appendChild(option);
          });
        })
        .catch(error => {
          console.error(error);
        });
  
      // Fetch the data containing city and barangays
      fetch('./ncr-list.json')
        .then(response => response.json())
        .then(data => {
          var citiesDropdown = document.getElementById("dropdownCity");
          var barangayDropdown = document.getElementById("dropdownBarangay");
          
          // Populate the cities dropdown
          for (var city in data.cities) {
              if (data.cities.hasOwnProperty(city)) {
                  var option = document.createElement("option");
                  option.textContent = city;
                  citiesDropdown.appendChild(option);
              }
          }
  
          // Event listener for city selection change
          citiesDropdown.addEventListener("change", function() {
              var selectedCity = citiesDropdown.value;
              var barangays = data.cities[selectedCity];
  
              // Clear existing options in the barangay dropdown
              barangayDropdown.innerHTML = "";
  
              // Populate the barangay dropdown with options based on the selected city
              barangays.forEach(barangay => {
                  var option = document.createElement("option");
                  option.textContent = barangay;
                  barangayDropdown.appendChild(option);
              });
          });
        })
        .catch(error => {
          console.error(error);
        });
  });
  