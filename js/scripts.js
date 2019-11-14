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
   $addListItem.click(function(){
      showDetails(pokemon)
    });

    var $button = $('<button class="button"></button>').text(pokemon.name);
    $addListItem.append($button);
    $pokemonList.append($addListItem);
    $('body').append($pokemonList);
  }




function loadList(){
  return $.ajax(apiUrl, {dataType: 'json'}).then(function(item){

  return $.each(item.results, function(index, item){
      //Uncomment the line below to see index in the callback function in $.each()
      addListItem(item);
      var pokemon = {
        name: item.name,
        detailsUrl: item.url
      }
      add(pokemon);
      loadDetails(pokemon);
    })

    }).catch(function(e){
    /*eslint no-console: ["error", { allow: ["warn", "error"] }] */
    console.error(e);
  });
}


function loadDetails(item){
  var url = item.detailsUrl;
  return $.ajax(url).then(function(details){
    //Uncomment the line below to log index
    //console.log('Item details', details);
    // Now we add the details to the item
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = Object.keys(details.types);

    //Uncomment the line below to see types
    //console.log(item.types);
  }).catch(function(e){
    console.error(e);
  });
};



function showModal(pokemon){
  pokemonRepository.loadDetails(pokemon).then(function(){


  var $modalContainer = $('.modal-container').addClass("is-visible");
  var closeButtonElement = $('.closeButton').text('close').click(function(){
    hideModal();
  });
//  var imgElement = $('.pokemonImg').attr('src', item.imageUrl);
  var nameElement = $('.pokemonName').text('Name: ' + pokemon.name);
  var heightElement = $('.pokemonHeight').text('Height:' + pokemon.height);

  $modal.append(closeButtonElement);
  $modal.append(imgElement);
  $modal.append(nameElement);
  $modal.append(heightElement);

  $modalContainer.append($modal);
  $('body').append($modal);
})
};


function hideModal(){
  $('.modal-container').removeClass('is-visible');
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





pokemonRepository.loadList();
