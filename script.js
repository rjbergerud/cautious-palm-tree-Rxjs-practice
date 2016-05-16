var requestStream = Rx.Observable.just('https://api.github.com/users');

requestStream.subscribe(function(requestUrl) {
  jQuery.getJSON(requestUrl, function(responseData) {
    // console.log(responseData);
  });
})

requestStream.subscribe(function(requestUrl) {
  var responseStream = Rx.Observable.create(function(observer) {
    jQuery.getJSON(requestUrl)
    .done(function(response) { observer.onNext(response)})
    .fail(function(jqXHR, status, error) { observer.onError(error)})
    .always(function() { observer.onCompleted(); });
  })

  responseStream.subscribe(function(response) {
    //Do something now with thte response
  })
})

var responseStream = requestStream.flatMap(function(requestUrl) {
  return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
})

responseStream.subscribe(function() {
  //render here
})

var refreshButton = document.querySelector('.refresh');
console.log(refreshButton);
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

refreshClickStream.subscribe(function(response) {
  console.log(response);
});

var body = document.querySelector('body')
var bodyStream = Rx.Observable.fromEvent(body, 'mouseover');



//Colouring >>>

bodyStream.subscribe(function(response) {
  console.log(response);
})
bodyStream.subscribe(function(response) {
  var d = document.createElement('div');
  d.className = 'blue';
  d.setAttribute('style', 'position: absolute; left: ' + response.clientX + 'px; top: ' + response.clientY + 'px;')
  body.appendChild(d)
})
