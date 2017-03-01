// New Script //
'use strict';

/*

  Generic
  Model - View - Controller (MVC)

  Demonstrating:
  Separation of Concerns

  Vanilla(Plain) JavaScript

*/

// Flash A Message To The Screen
function flash_msg(msg) {
  document.getElementById('messenger').innerHTML = msg;

  setTimeout(function(){
    document.getElementById('messenger').innerHTML = '';
  } , 3000);
}


/* --- The Model --- */
var models = {
  // List Of Models
  list: [
    {
      name: 'Basketball',
      image: 'img/basketball.png',
      count: 0
    },
    {
      name: 'Football',
      image: 'img/football.png',
      count: 0
    },
    {
      name: 'Baseball',
      image: 'img/baseball.jpg',
      count: 0
    },
    {
      name: 'Soccer',
      image: 'img/soccer.jpg',
      count: 0
    },
    {
      name: 'Hockey',
      image: 'img/hockey.png',
      count: 0
    }
  ],

  newModel: function(name, image) {
    if(name == '' || image == '') {
      flash_msg('Either Name Field Or Image Field Was Left Blank...');
      return;
    }
    else if (name == undefined || image == undefined) {
      flash_msg('Either Name Field Or Image Field Was Not Provided...');
      return;
    }
    models.list.push({
      name: name,
      image: image,
      count: 0
    });
    console.log('New Model Added!');
    flash_msg('New Model Added!');

    document.querySelector('input[name="newname"]').value = '';
    document.querySelector('input[name="newimage"]').value = '';

    controller.render();

  },

  destroyModel: function(model) {
    if(model) {
      var index = models.list.indexOf(model);
      if(index != -1) {
        var ask = confirm('Delete: ' + model.name + '?');
        if(ask == false) {
          return;
        }

        models.list.splice(index, 1);
        flash_msg('Model Destroyed!');

        controller.current = null;
        document.getElementById('model-name').innerHTML = '';
        document.getElementById('model-image').src = '';
        document.getElementById('model-count').innerHTML = '';
        document.getElementById('delete-btn').style.display = 'none';

        controller.render();
      }
    }
  }
}


/* --- The View --- */
var view = {
  init: function() {
    // Set All Of The Listeners
    document.getElementById('model-image').addEventListener('click', function(){
      controller.count_up();
    });
    
    document.getElementById('add-btn').addEventListener('click', function(){
      var name = document.querySelector('input[name="newname"]').value.trim();
      var image =document.querySelector('input[name="newimage"]').value.trim();
      models.newModel(name, image);
    });
    document.getElementById('delete-btn').addEventListener('click', function(){
      controller.deleteModel(controller.current);
    });

  },

  render: function() {
    // Update The DOM With Current Model's Info
    if(controller.current != null) {
      document.getElementById('model-name').innerHTML = controller.current.name;
      document.getElementById('model-image').src = controller.current.image;
      document.getElementById('model-count').innerHTML = controller.current.count;

      if( document.getElementById('delete-btn').style.display == 'none' ) {
        document.getElementById('delete-btn').style.display = 'block';
      }
    }
    else {
      document.getElementById('model-name').innerHTML = '';
      document.getElementById('model-image').src = '';
      document.getElementById('model-count').innerHTML = '';
    }
  }

}


/* --- The Controller --- */
var controller = {
  current: null,

  init: function() {
    /*
      Tell The View To Initialize Itself
      Then Tell Controller To Do The First Render
    */
    view.init();
    controller.render();
  },

  render: function() {
    // Clear Unordered-List
    document.getElementById('list').innerHTML = '';

    // Sort Model By Name
    models.list.sort(function(a, b) {
	    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
	    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
	    if (nameA < nameB) {
		    return -1;
	    }
	    if (nameA > nameB) {
		    return 1;
	    }
	    return 0;
    });

    /*
      Loop Through Each Model,
      Create A List Item,
      Add An Event Listener For Each
      That Will Set The Current Active Model
    */
    models.list.forEach(function(item, index){
      var new_li = document.createElement('li');
      new_li.innerHTML = item.name;
      new_li.className += ' transition';
      new_li.addEventListener('click', function(){
        controller.current = item;
        view.render();
      });
      document.getElementById('list').appendChild(new_li);
    });

    // Render The View
    view.render();
  },

  count_up: function() {
    // If No Model Is Active, Ignore
    if(controller.current == null) {
      return;
    }

    // Increment The Current Model's Count And Tell View To Render The Changes
    controller.current.count++;
    view.render();
  },

  deleteModel: function(model) {
    // Delete The Given Model (Should Be The Current Model)
    models.destroyModel(model);
  }

}



/* ----- Start App ----- */
controller.init();
