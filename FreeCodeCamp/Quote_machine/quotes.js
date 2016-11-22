var currentQuote;
var currentAuthor;

function getNextQuote() {
  var cb = Math.round(new Date().getTime() / 1000); //to prevent cashing
  $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=" + cb, function (data) {
    currentQuote = data[0].content;
    currentAuthor = data[0].title;
    $("#quoteContent").html("<blockquote class='foo'><p>" + currentQuote + "</p><footer>" + currentAuthor + "</footer></blockquote>");
  });
}


var colors = ["#FFE699", "#FFDB6E", "#F4C949", "#E4B21E", "#B0870D", "#A7F865", "#A0F05D", "#92DF52", "#74AD44", "#84EFD7", "#84EFD7", "#61E3C6", "#61E3C6", "#44D4B3"];
function selectColor() {
  var color = colors[Math.floor(Math.random() * colors.length)];
  $(".vertical-center").css("background-color", color);
}

$(document).ready(function () {
  getNextQuote();
  selectColor();
  $("#nextQuote").on("click", function () {
    getNextQuote();
    selectColor();
  })
  $("#tweetQuote").on("click", function () {
    if (currentQuote.length > 100) {
      currentQuote = currentQuote.slice(0, 100) + "..."
    }
    $("#tweetQuote").attr('href', 'https://twitter.com/intent/tweet?text=' + '"' + currentQuote + '" - ' + currentAuthor);
  })
})