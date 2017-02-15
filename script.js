// associate a random number between 0 and 100 for each Tumblr post type
// we'll use this as our data to display in a column chart
// the value of the `data` variable will have the form:
// [{category: 'foo', count: 23}, {category: 'bar', count: 31}]
var data = rnd_hist([
  "video", "link", "photo", "audio", "chat", "quote", "answer", "text"
]);

var category = d3
  .select("body")
  .selectAll(".category") // create (empty) selection
  .data(data.sort(category_order)); // perform data join, returning 'update' selection

category // from the 'update' selection,
  .enter() // retrieve 'enter' selection
  .append('p') // for each item in the 'enter' selection, append a <p> element
    .attr('class', 'category') // whose class attribute is 'category'
    .html(function(d) { // and whose innerhtml is specified by this function
      return "The '"+d.category+"' category contains "+d.count+" thing(s).";
    });

function rnd_hist(labels) {
  var hist = [], ct = 0;
  labels.forEach(function(label) {
    ct = Math.floor(Math.random()*100);
    hist.push({category:label, count:ct});
  });
  return(hist);
};

function category_order(a, b) {
  if(a.category > b.category) return 1;
  else if(a.category < b.category) return -1;
  return 0;
};
