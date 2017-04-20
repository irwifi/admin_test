$( function() {
  // $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();

  $( ".sortable" ).sortable();
  $( ".sortable" ).disableSelection();

  $('#datepicker1').datepicker({
    orientation: 'auto bottom',
    autoclose : true,
    todayHighlight : true,
    endDate: "current"
  });

  mapboxgl.accessToken = 'pk.eyJ1IjoiYWNjYWlsIiwiYSI6ImNqMXE1ZDZvZzAwMGQycWtkN2o3a3psa2gifQ.wh7Wtg2qyBqeg5Wzv8qd7A';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9'
  });

  $("#settings").on("click", () => {$("#overlay").show();});
  $(".settings_panel .close").on("click", () => {$("#overlay").hide();});
  $("#xray").on("click", toggle_tooltips);
  $("#search_box").on("input", search_input);
} );

function toggle_tooltips () {
  var tooltip_number;
  if ($("#xray").is(':checked')) {
    tooltip_number = "tip2";
  } else {
    tooltip_number = "tip1";
  }

  $(".tooltips").each(function(){
    if($(this).data(tooltip_number) == "") {
      $(this).addClass("blank");
    } else {
      $(this).removeClass("blank");
    }

    $(this).attr("data-content", $(this).data(tooltip_number));
  });
}

function search_input () {
  var search_text = $("#search_box").val().toLowerCase();
  if (search_text.length > 0) {
     $(".search_result tbody tr").hide();
     $(".search_result td.search_active[data-lower*='" + search_text + "']").parent("tr").show();
    // $(".search_result td.search_active:contains('" + search_text + "')").parent("tr").show();
    if($(".search_result td.search_active[data-lower*='" + search_text + "']").length > 0) {
      $(".search_result").show();
    }
  } else {
    $(".search_result").hide();
  }
}