// Highlight and scroll for 'Book your trip now' button
$(document).on('click', '#bookTripBtn', function(e) {
  e.preventDefault();
  // Scroll to Accommodation & Transport section
  const accomSection = document.getElementById('accommodation');
  if (accomSection) {
    accomSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  // Highlight hotel, flights, and transport cards
  const highlightCards = [
    // Hotel card
    accomSection.querySelector('.col-md-4:nth-child(1) .card'),
    // Flights card
    accomSection.querySelector('.col-md-4:nth-child(2) .card'),
    // Transport card
    accomSection.querySelector('.col-md-4:nth-child(3) .card')
  ];
  highlightCards.forEach(function(card) {
    if (card) {
      card.classList.add('highlight-flash');
      setTimeout(function() {
        card.classList.remove('highlight-flash');
      }, 1800);
    }
  });
});

// Add highlight-flash CSS
const style = document.createElement('style');
style.innerHTML = `
  .highlight-flash {
    box-shadow: 0 0 0 4px #a770ef, 0 8px 32px #7fbcff99 !important;
    border-color: #a770ef !important;
    transition: box-shadow 0.3s, border-color 0.3s;
    animation: flashAnim 1.5s linear 1;
  }
  @keyframes flashAnim {
    0% { box-shadow: 0 0 0 0 #a770ef; }
    30% { box-shadow: 0 0 0 8px #a770ef; }
    60% { box-shadow: 0 0 0 4px #a770ef; }
    100% { box-shadow: 0 0 0 0 #a770ef; }
  }
`;
document.head.appendChild(style);

$(function () {
  // Background image rotation
  let bgCounter = 0;
  const bgClasses = ['', 'bg-alt-1', 'bg-alt-2', 'bg-alt-3'];
  
  function rotateBackground() {
    $('#hero').removeClass(bgClasses.join(' '));
    $('#hero').addClass(bgClasses[bgCounter]);
    bgCounter = (bgCounter + 1) % bgClasses.length;
  }
  
  // Rotate background every 8 seconds
  setInterval(rotateBackground, 8000);
  
  // Initial background rotation after page load
  setTimeout(rotateBackground, 1000);

  // Data for destinations
  const destinations = [
    {
      id: 1,
      name: "Maldives",
      type: ["beach", "relaxation"],
      description: "Tropical paradise with white sandy beaches and crystal-clear waters.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Swiss Alps",
      type: ["mountains", "adventure"],
      description: "Snow-capped peaks perfect for skiing and hiking.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "New York City",
      type: ["city", "adventure"],
      description: "The city that never sleeps, full of culture and excitement.",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      name: "Bali",
      type: ["beach", "relaxation", "adventure"],
      description: "Island with beautiful beaches, temples, and vibrant culture.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      name: "Kyoto",
      type: ["city", "cultural", "relaxation"],
      description: "Historic city with temples, gardens, and traditional tea houses.",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      name: "Amazon Rainforest",
      type: ["adventure", "mountains"],
      description: "Explore the world's largest tropical rainforest.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 7,
      name: "Santorini",
      type: ["beach", "relaxation", "city"],
      description: "Breathtaking Greek island with stunning sunsets and white buildings.",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 8,
      name: "Patagonia",
      type: ["mountains", "adventure"],
      description: "Wild landscapes with glaciers, mountains, and diverse wildlife.",
      image: "https://images.unsplash.com/photo-1518005020951-eccb49424724?auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Render destination cards
  function renderDestinations(destList) {
    $('#destinationResults').empty();
    destList.forEach(dest => {
        const card = `
          <div class="col-md-4 mb-4 destination-card" data-types="${dest.type.join(',')}">
            <div class="card h-100">
              <img src="${dest.image}" class="card-img-top" alt="${dest.name} - ${dest.type.join(', ')} destination">
              <div class="card-body">
                <h5 class="card-title">${dest.name}</h5>
                <p class="card-text">${dest.description}</p>
                <p class="text-muted"><small>${dest.type.join(', ')}</small></p>
              </div>
              <div class="card-footer">
                <button class="btn btn-primary w-100 select-destination" data-id="${dest.id}">Select Destination</button>
              </div>
            </div>
          </div>
      `;
      $('#destinationResults').append(card);
    });
  }

  // Initial render
  renderDestinations(destinations);

  // Search and filter functionality
  $('#destinationSearch').on('input', filterDestinations);
  $('.dest-filter').on('change', filterDestinations);

  function filterDestinations() {
    const searchTerm = $('#destinationSearch').val().toLowerCase();
    const selectedTypes = [];
    $('.dest-filter:checked').each(function() {
      selectedTypes.push($(this).val());
    });

    const filtered = destinations.filter(dest => {
      const matchesSearch = dest.name.toLowerCase().includes(searchTerm) || 
                           dest.description.toLowerCase().includes(searchTerm);
      const matchesType = selectedTypes.length === 0 || 
                         selectedTypes.some(type => dest.type.includes(type));
      return matchesSearch && matchesType;
    });

    renderDestinations(filtered);
  }

  // Activity data
  const activities = [
    { id: 1, name: "City Tour", cost: 50 },
    { id: 2, name: "Beach Relaxation", cost: 20 },
    { id: 3, name: "Mountain Hiking", cost: 75 },
    { id: 4, name: "Cultural Experience", cost: 40 },
    { id: 5, name: "Water Sports", cost: 60 },
    { id: 6, name: "Sightseeing", cost: 35 }
  ];

  // Render activities
  activities.forEach(activity => {
    const activityCard = `
      <div class="col-md-4">
        <div class="card activity-card" data-id="${activity.id}" data-cost="${activity.cost}">
          <div class="card-body text-center">
            <h5>${activity.name}</h5>
            <p>$${activity.cost}</p>
            <div class="form-check">
              <input class="form-check-input activity-checkbox" type="checkbox" id="activity-${activity.id}">
              <label class="form-check-label" for="activity-${activity.id}">Add to Plan</label>
            </div>
          </div>
        </div>
      </div>
    `;
      $('#activitiesList').append(activityCard);
    });

  // Add/remove activities from 'My Plan'
  $(document).on('change', '.activity-checkbox', function () {
    const card = $(this).closest('.activity-card');
    const activityId = card.data('id');
    const activityName = card.find('h5').text();
    const activityCost = card.data('cost');

    if (this.checked) {
      const activityItem = `<span class="activity-item" data-id="${activityId}" data-cost="${activityCost}">${activityName}</span>`;
      if ($('#myPlan .text-muted').length) {
        $('#myPlan').html(activityItem);
      } else {
        $('#myPlan').append(activityItem);
      }
    } else {
      $(`#myPlan .activity-item[data-id=${activityId}]`).remove();
      if ($('#myPlan').children().length === 0) {
        $('#myPlan').html('<small class="text-muted">Select activities to add to your plan.</small>');
      }
    }
    updateBudgetActivityCost();
  });

  // Make My Plan sortable
  $('#myPlan').sortable({
    placeholder: "ui-state-highlight",
    update: function (event, ui) {
      // You can add logic here if you need to save the order
    }
  }).disableSelection();

  // Make Itinerary droppable and sortable
  $('#itinerary').droppable({
    accept: ".activity-item",
    drop: function (event, ui) {
      const activity = ui.draggable.clone().removeClass('activity-item').addClass('itinerary-item');
      if ($(this).find('.text-muted').length) {
        $(this).html(activity);
      } else {
        $(this).append(activity);
      }
      // Optional: remove from 'My Plan' after adding to itinerary
      ui.draggable.remove();
      if ($('#myPlan').children().length === 0) {
        $('#myPlan').html('<small class="text-muted">Select activities to add to your plan.</small>');
      }
    }
  }).sortable({
    placeholder: "ui-state-highlight"
  });

  // Budget Tracker
  $('#flightCost, #accommodationCost, #activityCost').on('input', calculateBudget);

  function updateBudgetActivityCost() {
    let totalActivityCost = 0;
    $('#myPlan .activity-item').each(function() {
      totalActivityCost += $(this).data('cost');
    });
    $('#activityCost').val(totalActivityCost.toFixed(2));
    calculateBudget();
  }

  function calculateBudget() {
    const flightCost = parseFloat($('#flightCost').val()) || 0;
    const accommodationCost = parseFloat($('#accommodationCost').val()) || 0;
    const activityCost = parseFloat($('#activityCost').val()) || 0;

    const total = flightCost + accommodationCost + activityCost;
    $('#totalBudget').text(total.toFixed(2));

    // Example of progress bar logic
    const budgetGoal = 5000; // Example goal
    const percentage = Math.min((total / budgetGoal) * 100, 100);
    $('#budgetProgress').css('width', percentage + '%').attr('aria-valuenow', percentage);
  }

  // Contact Form Validation
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    if (this.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // Show success message
      $('#contactSuccess').removeClass('d-none');
      // Reset form after a delay
      setTimeout(() => {
        $('#contactSuccess').addClass('d-none');
        this.reset();
        $(this).removeClass('was-validated');
      }, 4000);
    }
    $(this).addClass('was-validated');
  });

  // Modal details
  $(document).on('click', '.select-destination', function() {
    const destId = $(this).data('id');
    const dest = destinations.find(d => d.id === destId);
    
    $('#detailsModalLabel').text(dest.name);
    $('#detailsModalBody').html(`
      <img src="${dest.image}" class="img-fluid rounded mb-3" alt="${dest.name}">
      <p>${dest.description}</p>
      <p><strong>Type:</strong> ${dest.type.join(', ')}</p>
    `);
    $('#bookingLink').attr('href', '#').removeClass('d-none'); // Replace with actual booking link
    
    const detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));
    detailsModal.show();
  });
});
