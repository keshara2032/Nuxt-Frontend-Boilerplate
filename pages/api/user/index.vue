<template>
<div class="back-ground">

<h1>Index Page</h1>

</div>

<!-- 
  <div v-if="location">
    Your location data is {{ location.coords.latitude }}, {{ location.coords.longitude}}
  </div> -->
				<!-- <button @click="locateMe">Locate Me</button> -->

	
</template>

<script>

import LoginForm from '../../../components/LoginForm'
import Test from '../../../components/test'

	export default {

		components: {
			// Navbar,
			LoginForm
		},
		middleware: 'auth-user',
	
		data: () => ({

			draggable: true,
			overlay:true,
			popupContent: "Sentian HQ",
			zoom: 17,
			center: [55.607741796855734, 13.018133640289308],
			marker: [55.607741796855734, 13.018133640289308],
			iconSize: [55, 55],
			location: null,
			gettingLocation: false,
			errorStr: null,
			map:null,
			stations: [],
			details: false,
			icon:null,
			url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
			markerLatLng: [47.313220, -1.319482],
			
		    markers: [
				{
				id: 'm1',
				position: { lat: 51.505, lng: -0.09 },
				tooltip: 'tooltip for marker1',
				draggable: true,
				visible: true,
				station: null

				},
				{
				id: 'm2',
				position: { lat: 51.8905, lng: -0.09 },
				tooltip: 'tooltip for marker2',
				draggable: true,
				visible: false,
				}

			],
	
		}),


		mounted() {

	
			//do we support geolocation
			if (!("geolocation" in navigator)) {
			this.errorStr = "Geolocation is not available.";
			
			return;
			}
			// get position

			this.gettingLocation = true;
			navigator.geolocation.getCurrentPosition(pos => {
			this.gettingLocation = false;
			this.location = pos;
			this.center = [pos.coords.latitude,pos.coords.longitude]
			this.marker = [pos.coords.latitude,pos.coords.longitude]


			}, err => {
			this.gettingLocation = false;
			this.errorStr = err.message;
			})


			this.icon =  L.icon({
				iconUrl: '/bike_icon.png',
				// shadowUrl: '/user_icon_shadow.png',
				iconSize:     [45, 45], // size of the icon

			});		
			
			this.getStation()

			setInterval(() => {

				if(this.$auth.loggedIn)
				this.getStation()
			}, 10000);

		},

		methods: {


			    getStation(){
				     this.$axios
					.get('api/auth/station/locateAll')
					.then((res) => {

						// this.stations = res.data.docks
						// console.log(res.data.stations)

						res.data.stations.forEach((element) => {

						var marker = {
										id: element.station_name,
										position: { lat: element.latitude, lng: element.longitude },
										tooltip: 'tooltip for marker2',
										draggable: false,
										visible: true,
										station: element,
										docks: [],
										bike: []
									 }	

									element.docks.forEach((element) => {
										marker.docks.push(element)
										// markers.bike.push()

											element.bike.forEach((element) => {

												marker.bike.push(element)

											
											});



									});


						var foundIndex = this.markers.findIndex(x => x.id == marker.id);	
						if(foundIndex > 0)
						this.markers[foundIndex] = marker;
						else{
						this.markers.push(marker)
						}
						
						});

				        // this.$router.push('login')
					})
					.catch((err) => {
						console.log(err.response)
					})

				},


				addMarker(lat,lon,html){


				},
			
			
				async getLocation() {
				
				return new Promise((resolve, reject) => {

					if(!("geolocation" in navigator)) {
					reject(new Error('Geolocation is not available.'));
					}

					navigator.geolocation.getCurrentPosition(pos => {
					resolve(pos);
					}, err => {
					reject(err);
					});

				});
				},

			greet: function(station){
				this.details = !this.details
				this.getStation() // Gives an error
			},


			locateMe: async function() {


				try {
					console.log(this.location)

					this.map.setView(L.latLng(this.location.coords.latitude,this.location.coords.longitude), 20)
			this.gettingLocation = false;


				} catch(e) {
					this.errorStr = e.message;
					console.log(this.errorStr)

				}
				
				}

		},

		updated() {
			//do we support geolocation
			if (!("geolocation" in navigator)) {
			this.errorStr = "Geolocation is not available.";
			return;
			}
			navigator.geolocation.getCurrentPosition(pos => {
			this.location = pos;
			this.center = [pos.coords.latitude,pos.coords.longitude]
			this.marker = [pos.coords.latitude,pos.coords.longitude]


			}, err => {
			this.errorStr = err.message;
			}
			);

			const mapComponent = this.$refs.map
			const map = mapComponent.mapObject // the leaflet map object
			this.map = map

		}

};
</script>


<style scoped>

.mini-map {
  width: 100%;
  height: 800px;
}
.star{
	background-color: #4CAF50; /* Green */
	background: red;
	color: #000;
  font-size: 4.5em;
    border-radius: 4px;
	  height: 26px; 
  width: 26px;  
} 

.custom-control {
  background: #fff;
  padding: 0 0.5em;
  border: 1px solid #aaa;
  border-radius: 0.6em;
}

</style>