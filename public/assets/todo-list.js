$(document).ready(function(){

  $('form').on('submit', function(){

      var ids = new Date().getTime() + "-" + randomNumber(5,1000);
      var item = $('form input');
      var todo = {item: item.val(), id: ids };

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var id = $(this).attr('id');
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + id,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});


var randomNumber = function(min,max) {
      return Math.floor(Math.random()*(max-min+1)+min);
}
