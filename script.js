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


// ------------------------------------------------------------------------------------------------
// populate dropdown

document.addEventListener("DOMContentLoaded", function() {
  // fetch the json containing city and barangays
  fetch('./src/ncr-list.json')
    .then(response => response.json())
    .then(data => {
      var dropdownCity = document.getElementById("dropdownCity");
      var dropdownBarangay = document.getElementById("dropdownBarangay");

      // get the cities in json and store in js variable
      var cities = Object.keys(data.cities);

      for (let i = 0; i < cities.length; i++) {
        const option = document.createElement("option");
        console.log(cities[i]);
        option.textContent = cities[i];
        dropdownCity.appendChild(option);
      }

      // get the selected city
      dropdownCity.addEventListener("change", function() {
          var selectedCity = dropdownCity.value;
          var barangays = data.cities[selectedCity];

          // clear the content of dropdown
          dropdownBarangay.innerHTML = ""; 

          // populate the barangay based on selected city
          for (let i = 0; i < barangays.length; i++) {
            const option = document.createElement("option");
            option.textContent = barangays[i];
            dropdownBarangay.appendChild(option);
          }
      });
    })
    .catch(error => {
      console.error(error);
    });
});
