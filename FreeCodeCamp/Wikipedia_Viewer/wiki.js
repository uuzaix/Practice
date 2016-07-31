window.onload = function() {
  $("#wiki-btn").click(function(){
    var win = window.open("https://en.wikipedia.org/wiki/Special:Random", '_blank');
    if (win) {
      console.log("aaa");
      win.focus();
    }
    else {
      alert('Please allow popups for this website');
    }
  });
  $("#form").submit(function() {
    var user_input = $("#wiki-search").val();
    var apiLink = "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&format=json&gsrsearch=";
    $.ajax({
      url: apiLink+user_input,
      dataType: "jsonp",
      success: function(data){
      console.log(data.query.pages);
      var items = [];
      $.each (data.query.pages, function(key, value) {
        items.push('<a href=https://en.wikipedia.org/?curid=' + value.pageid + '><li><p><b>' + value.title + '</b></p><br><p>' + value.extract + '</p><br></li>');
      })
      $("#search-results").html('<ul>' + items.join("") + '</ul>');
    }
  });
    $("#wiki-search").val("");
    return false;
  });
}


