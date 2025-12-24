function initMap(_maps) {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 9,
      center: {lat: -18.897541, lng: -48.250389}
    });
  
    const markers = [
      {
        position: {lat: -19.150518, lng: -47.93783},
        title: 'Tapuirama'
      },
      {
        position: {lat: -18.93799, lng: -48.001682},
        title: 'Miranda'
      },
      {
        position: {lat: -18.699629, lng: -48.185656},
        title: 'Araguari'
      },
      {
        position: {lat: -18.605582, lng: -48.676981},
        title: 'Tupaciguara'
      },
      {
        position: {lat: -18.858493, lng: -48.270578},
        title: 'Flamboyant'
      },
      {
        position: {lat: -19.019166166631546, lng: -48.32761067116449},
        title: 'Arena Race'
      },
      {
        position: {lat: -19.2233301, lng: -48.1438999},
        title: 'Nova Agro'
      },
      {
        position: {lat: -19.701395, lng: -47.97367},
        title: 'Uberaba'
      },
      {
        position: {lat: -18.618225, lng: -49.4347763},
        title: 'Cachoeira Dourada - Bayer - MG'
      },
      {
        position: {lat: -18.523012, lng: -49.503942},
        title: 'Cachoeira Dourada - MG'
      },
      {
        position: {lat: -18.857854, lng: -48.618167},
        title: 'Xapetuba'
      },
      {
        position: {lat: -19.043306, lng: -47.958537},
        title: 'Indianópolis'
      },
      {
        position: {lat: -18.886031, lng: -48.682524},
        title: 'Monte Alegre'
      },
      {
        position: {lat: -19.175421, lng: -48.250942},
        title: 'Harmonia'
      },
      {
        position: {lat: -19.0836268, lng: -48.1377142},
        title: 'Floresta do Lobo'
      },
      {
        position: {lat: -19.0246856, lng: -48.070786},
        title: 'Cruz Branca'
      },
      {
        position: {lat: -18.9102459, lng: -48.2611798},
        title: 'Center Shopping'
      }
    ];
  
    for (let i = 0; i < markers.length; i++) {
      const marker = new google.maps.Marker({
        position: markers[i].position,
        map: map,
        title: markers[i].title,
        icon: 'images/map_marker_icon2.png'
      });
    }
  }