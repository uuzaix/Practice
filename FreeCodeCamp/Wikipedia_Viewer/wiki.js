window.onload = function() {
  $(".wiki-btn").click(function(){
    var url = "https://en.wikipedia.org/wiki/Special:Random";
    var win = window.open("https://en.wikipedia.org/wiki/Special:Random", '_blank');
    if (win) {
      console.log("aaa");
      win.focus();
    }
    else {
      alert('Please allow popups for this website');
    }
  });
  // $("#search-btn").submit(function() {
  //   var dat = $("#wiki-search").val();
  //   console.log(dat);
  // })
  $('#wiki-search').bind('submit', function () {
    var elements = this.elements;
    console.log(elements)
  });
}
