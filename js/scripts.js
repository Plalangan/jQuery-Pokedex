var $pokemonList = $('<ul></ul>');

var pokemonRepository = (function (){
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon){
    repository.push(pokemon);
  }

  function getAll(){
    return repository;
  }

  function addListItem(pokemon){
    var $addListItem = $('<li></li>');
    var $button = $('<button class="button"></button>').text(pokemon.name).click(showModal);
    $addListItem.append($button);
    $pokemonList.append($addListItem);
    $('body').append($pokemonList);
  }


  function showDetails(pokemon){
    pokemonRepository.loadDetails(pokemon).then(function(){
      showModal(pokemon);
    });
  }

/*
  function loadList(){
    return $.ajax(apiUrl, {dataType: 'json'}).then(function(item){
    return  $.each(item.results, function(index, item){
        var pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
        console.log(pokemon);
      }).catch(function(e){
      console.error(e)
    })
  })}

  function loadDetails(item){
    var url = item.detailsUrl;
    return $.ajax(url).then(function (details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types.map(function(pokemon){
        return pokemon.type.name;
      });
    }).catch(function(e){
      console.error(e);
    });
    }

*/

function loadList(){
  return $.ajax(apiUrl, {dataType: 'json'}).then(function(item){

  return $.each(item.results, function(index, item){
      //Uncomment the line below to see index in the callback function in $.each()
      addListItem(item);
      var pokemon = {
        name: item.name,
        detailsUrl: item.url
      }
      add()
    })

    }).catch(function(e){
    /*eslint no-console: ["error", { allow: ["warn", "error"] }] */
    console.error(e);
  });
}


function loadDetails(item){
  var url = pokemon.detailsUrl;
  return $.ajax(url, {dataType: 'json'}).then(function(details){
    //Uncomment the line below to log index
    //console.log('Item details', details);
    // Now we add the details to the item
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;

    //Uncomment the line below to see types
    //console.log(item.types);
  }).catch(function(e){
    console.error(e);
  });
}

function showModal(pokemon){
  pokemonRepository.loadDetails(pokemon).then(function(){


  var $modalContainer = $('#modal-container');
  var modal = $('<div class ="modal"></div>');
  var closeButtonElement = $('<button class="closeButton"></button>').text('close');
  closeButtonElement.click(hideModal);
  var imgElement = $('<img class="pokemonImg">');
  //imgElement.attr('src', item.imageUrl);
  var nameElement = $('<h1></h1>').text('name: ' + pokemon.name);
  var heightElement = $('<p></p>').text('Height: ' + pokemon.height);

  modal.append(closeButtonElement);
  modal.append(imgElement);
  modal.append(nameElement);
  modal.append(heightElement);
  $modalContainer.append(modal);
  $('body').append($modalContainer);
  })
}

function hideModal(){
  $modalContainer.removeClass('is-visible');
}



  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  }
})();


pokemonRepository.loadList()


pokemonRepository.showModal();
