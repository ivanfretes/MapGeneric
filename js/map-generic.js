var MapGeneric = MapGeneric || {};

MapGeneric.Map = function(provider, domSelector, coodInit, ground){
	this.init = null;
	this.map = null;
	
	// Proveedores de mapas
	this.mapProvider = {
		'google' : MapGeneric.GoogleMap,
		'here' : MapGeneric.HereMap,
		'osm' : MapGeneric.OSM,
		'leaflet' : MapGeneric.LeafletMap,
		'openlayer' : MapGeneric.OpenLayerMap
		
	}; 


	// Configuraciones basicas
	this.mapBasicConfig = {
		domSelector : domSelector, 
		coodInit : coodInit,
		ground : ground, 
	} 
	
	// Proveedor de mapa seleccionado
	this.mapProviderSelected = this.mapProvider[provider];
	
	
}

MapGeneric.Map.prototype.initialize = function(){
	this.mapProviderSelected();
	this.init();
}

MapGeneric.GoogleMap = function(){
	var mapConfig = this.mapBasicConfig;
	
	// Listado de terrenos
	this.groundList =  [
		google.maps.MapTypeId.ROADMAP,
        google.maps.MapTypeId.SATELLITE,
        google.maps.MapTypeId.HYBRID,
        google.maps.MapTypeId.TERRAIN 
	];
	
	
	// Configuraciones por defecto del google map
	this.googleMapConfig = {
		center: mapConfig.coodInit,
		zoom: 16,
		mapTypeId : this.groundList[0]
	}
		

	this.init = function(){
		this.map = new google.maps.Map(
			this.mapBasicConfig.domSelector, 
			this.googleMapConfig
		);	
	}
	
}


MapGeneric.HereMap = function(){
	
}

MapGeneric.LeafletMap = function(){
	var coordTmp = this.mapBasicConfig.coodInit;
	var coordInit = Object.keys(coordTmp).map(function(pointName){ 
		return coordTmp[pointName]; 
	});

	this.init = function(){
		var map = L.map('leaflet-map').setView(coordInit, 13);
	}
}

MapGeneric.OpenLayerMap = function(){
	var coordTmp = this.mapBasicConfig.coodInit;
	
	var coordInit = Object.keys(coordTmp).map(function(pointName){ 
		return coordTmp[pointName]; 
	});
	
	
	this.viewConfig = new ol.View({
    	center: coordInit,
        zoom: 16
    });

    

	this.init = function(){
		this.map = new ol.Map({
			layers: [
			  new ol.layer.Tile({
				source: new ol.source.OSM()
			  })
			],
			target: 'openlayer-map',
			view: this.viewConfig
		});
	}
}

// Creamos un nuevo Mapa Generico del tipo Google Maps

var googleMap = new MapGeneric.Map(
	'google', 
	document.getElementById('google-map'), 
	{
		lat: -25.287724, 
		lng: -57.607870
	}, 
	'ROADMAP'
);
googleMap.initialize();

// Creamos un nuevo Mapa Generico del tipo Leaflet
var leaflet = new MapGeneric.Map(
	'leaflet', 
	document.getElementById('leaflet-map'), 
	{
		lat: -25.287724, 
		lng: -57.607870
	}, 
	//'ROADMAP'
);
leaflet.initialize();


// Creamos un nuevo Mapa Generico del tipo Leaflet
var openlayer = new MapGeneric.Map(
	'openlayer', 
	document.getElementById('leaflet-map'), 
	{
		lat: -25.287724, 
		lng: -57.607870
	}, 
	//'ROADMAP'
);
openlayer.initialize();






