$( function() {
  $('[data-toggle="popover"]').popover();

  $( ".sortable" ).sortable();
  $( ".sortable" ).disableSelection();
  $( ".sortable_widget" ).sortable({handle: ".widget .wheader"});
  $( ".sortable_widget" ).disableSelection();
  $( ".widget" ).resizable({
      maxHeight: 600,
      maxWidth: 1000,
      minHeight: 200,
      minWidth: 200
    });

  $('#datepicker1').datepicker();

  mapboxgl.accessToken = 'pk.eyJ1IjoiYWNjYWlsIiwiYSI6ImNqMXE1ZDZvZzAwMGQycWtkN2o3a3psa2gifQ.wh7Wtg2qyBqeg5Wzv8qd7A';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9'
  });

  load_config();

  $("#settings").on("click", () => {$("#search_config_overlay").show();});
  $(".settings_panel .close").on("click", () => {$("#search_config_overlay").hide();});
  $(".info_panel .settings_spin").on("click", () => {$("#info_config_overlay").show();});
  $(".info_config .close").on("click", () => {$("#info_config_overlay").hide();});
  $(".add_widget").on("click", () => {$("#widget_add_overlay").show();});
  $(".add_widget_panel .close").on("click", () => {$("#widget_add_overlay").hide();});

  $("#xray").on("click", toggle_tooltips);
  $("#search_box").on("input", search_input);
  $(".widget .close").on("click", function() {$(this).closest("li").remove();});
  $(".search_config .checkbox input").on("click", toggle_search);
} );

const load_config = () => {
  default_search_config();
  for(config_key in localStorage.search_config) {
    $(".search_config .checkbox input[data-search='"+ config_key +"']").attr("checked", localStorage.search_config[config_key]);
  }
}

const default_search_config = () => {
  if(localStorage.search_config === undefined) {
    localStorage.search_config = JSON.stringify({"account_number": "checked", "address": "checked", "email": "checked", "invoice_number": "undefined", "meter_number": "undefined", "name": "checked", "ssn": "undefined"});
  }
}

function toggle_tooltips () {
  var tooltip_number;
  if ($("#xray").is(':checked')) {
    tooltip_number = "tip2";
  } else {
    tooltip_number = "tip1";
  }

  $(".tooltips").each(function() {
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

const update_json = (json, key, value) => {
  const json_obj = JSON.parse(json);
  json_obj.key = value;
  return JSON.stringfy(json_obj);
}

function toggle_search () {
  default_search_config();
  const config_key = $(this).data("search");
  localStorage.search_config.config_key = $(this).attr("checked");
  console.log(JSON.parse(localStorage.search_config));
  $(".search_result td[data-search='" + $(this).data("search") + "']").toggleClass("search_active");
}