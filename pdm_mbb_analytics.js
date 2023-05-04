jQuery(document).ready(function ($) {
  // set the initial index to 0
  let currentIndex = 0;
  let data;

  // function to render the data on the page
  function renderData(dataToShow) {
    $.each(dataToShow, function (index, value) {
      let template = `
        <tr class="pdm_mbb_single_ip_tracking">
          <td class="pdm_mbb_customer_date">${value.date}</td>
          <td class="pdm_mbb_customer_action">${value.action}</td>
          <td class="pdm_mbb_customer_page">${value.page}</td>
          <td class="pdm_mbb_customer_referral">${value.referral}</td>
          <td class="pdm_mbb_customer_location">
            <img src="/img/${value.location.flag}" alt=${value.location.country}>
            <span>${value.location.city}, ${value.location.state} ${value.location.zip}, ${value.location.country}</span>
          </td>
        </tr>
      `;

      $(".pdm_mbb_analytics_table tbody").append(template);
    });

    // hide loading indicator
    $(".pdm_mbb_anlytics_loading_screen").hide();
  }

  // fetch the data from your JSON file
  $.ajax({
    url: "https://iamomarfaruk.github.io/uidemo.github.io/pdm_mbb_analytics.json",
    dataType: "json",
    success: function (response) {
      data = response;

      // slice the data to get the first 5 elements
      let dataToShow = data.slice(currentIndex, currentIndex + 5);

      // display the data on the page
      renderData(dataToShow);

      // increment the index by 5
      currentIndex += 5;

      // show the "Load More" button if there is more data
      if (currentIndex < data.length) {
        $(".pdm_mbb_loadmore").show();
      } else {
        $(".pdm_mbb_loadmore").hide();
      }

      // hide the loading indicator
      $(".pdm_mbb_anlytics_loading_screen").hide();
    },
    error: function () {
      // show error message
      $(".pdm_mbb_anlytics_error_screen").show();

      // hide load more button
      $("#pdm_mbb_loadmore_button").hide();

      // hide loading screen
      $(".pdm_mbb_anlytics_loading_screen").hide();
    },
  });

  // add a click event listener to the "Load More" button
  $("#pdm_mbb_loadmore_button").click(function () {
    // slice the data to get the next 5 elements
    let dataToShow = data.slice(currentIndex, currentIndex + 5);

    // display the data on the page
    renderData(dataToShow);

    // increment the index by 5
    currentIndex += 5;

    // hide the "Load More" button if there is no more data
    if (currentIndex >= data.length) {
      $(".pdm_mbb_loadmore").hide();
    }
  });
});
