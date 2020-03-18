<template>
  <div>

<b-container class="bv-example-row">
  <b-row>
    <b-col>    <b-card class="mt-3" header="Create a Station">  




    <b-form @submit="onSubmit" @reset="onReset" v-if="show">

        <!-- Station Name -->
      <b-form-group
        id="input-group-1"
        label="Station Name:"
        label-for="input-1"
        description="Enter a short name that describes the station"
      >
        <b-form-input
          id="input-1"
          v-model="form.station_name"
          required
          placeholder="Enter Station Name"
        ></b-form-input>
      </b-form-group>
        <!-- Station Name -->

<br>

        <!-- Station ID -->
            <b-form-group
        id="input-group-1"
        label="Station ID:"
        label-for="input-1"
        description="Enter a unique ID 4 Digit Integer"
      >
        <b-form-input
          id="input-1"
          v-model="form.station_id"
          required
        type="number"
          placeholder="Enter Station ID"
        ></b-form-input>
      </b-form-group>

<br>


        <!-- Station Latitiude Longitude -->
        <b-form-group
        id="input-group-1"
        label="Station Coordinates:"
        label-for="input-1"
        description="Enter Latitude and Longitude"
      >
        <b-form-input
          id="input-1"
          v-model="form.latitude"
          required
        type="number"
          step="any"
          placeholder="Enter latitude"
        ></b-form-input>

        <b-form-input
          id="input-1"
          v-model="form.longitude"
          required
          type="number"
          step="any"
          placeholder="Enter Longitude"
        ></b-form-input>
        
      </b-form-group>


      <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="Active">Active</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>



      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>

    </b-form>

 </b-card>

</b-col>

<!-- Find and update a station -->

    <b-col>

   <b-card class="mt-3" header="Update or Delete Station">  

    <b-form @submit="onSubmitFind" @reset="onReset" @update="updateStation" @delete="deleteStation" v-if="show">

        <!-- Station ID -->
            <b-form-group
        id="input-group-1"
        label="Station ID:"
        label-for="input-1"
        description="Enter a unique ID 4 Digit Integer"
      >
        <b-form-input
          id="input-1"
          v-model="station_id"
          required
           type="number"
          placeholder="Enter Station ID"
        ></b-form-input>
      </b-form-group>

<br>

<div v-if="update">

      <!-- Station Name -->
      <b-form-group
        id="update_input-group-1"
        label="Station Name:"
        label-for="input-1"
        description="Enter a short name that describes the station"
      >
        <b-form-input
          id="update_input"
          v-model="station.station_name"
          required
          placeholder="Enter Station Name"
        ></b-form-input>
      </b-form-group>
        <!-- Station Name -->


        <!-- Station Latitiude Longitude -->
        <b-form-group
        id="update_input-group-1"
        label="Station Coordinates:"
        label-for="input-1"
        description="Enter Latitude and Longitude"
      >
        <b-form-input
          id="update_input-1"
          v-model="station.latitude"
          required
        type="number"
          step="any"
          placeholder="Enter latitude"
        ></b-form-input>

        <b-form-input
          id="update_input-1"
          v-model="station.longitude"
          required
          type="number"
          step="any"
          placeholder="Enter Longitude"
        ></b-form-input>
        
      </b-form-group>

  <b-button type="update" variant="success" @click="updateStation">Update</b-button>
      <b-button type="delete" variant="danger " @click="deleteStation">Delete</b-button>

</div>

<br>
      <b-button  type="submit" variant="primary" >Find</b-button>
      <b-button type="reset" variant="danger" v-if="station_id != ''">Reset</b-button>

    </b-form>

 </b-card>

    </b-col>


  </b-row>
</b-container>


  </div>
</template>

<script>
  export default {
    
    name: 'StationForm',

    data() {
      return {
        form: {
          station_name: '',
          station_id: null,
          latitude: null,
          longitude: null,
          checked: []
        },
         updateform: {
          station_name: '',
          station_id: null,
          latitude: null,
          longitude: null,
          checked: []
        },
        station:null,
        show: true,
        update:false,
        station_id: null
      }
    },
    methods: {
      deleteStation() {

          this.$axios
              .delete('api/auth/station/delete?station_id='+ this.station_id )
              .then((res) => {
                console.log(res.data)
                
              })
              .catch((err) => {
                console.log(err.response)
                    this.$notifier.showMessage({ content: `Error ${err.response.data.message}`, color: 'error' })

              })

            //  this.update = !this.update
          },

   updateStation() {

      this.$axios
					.post('api/auth/station/update?station_id='+ this.station_id, this.station )
					.then((res) => {
            console.log(res.data)
				        // this.$router.push('login')
					})
					.catch((err) => {
						console.log(err.response)
    			      this.$notifier.showMessage({ content: `Error ${err.response.data.message}`, color: 'error' })

					})

        //  this.update = !this.update
      },


      findStation() {

      this.$axios
					.get('api/auth/station/find?station_id='+ this.station_id )
					.then((res) => {
            console.log(res.data)
            this.station = res.data.station
            this.update = true
            
				        // this.$router.push('login')
					})
					.catch((err) => {
						console.log(err.response)
    			      this.$notifier.showMessage({ content: `Error ${err.response.data.message}`, color: 'error' })

					})

        //  this.update = !this.update
      },

      createStation(){

                    console.log(this.form)
                    this.$axios
					.post('api/auth/station/register', this.form)
					.then((res) => {
						console.log(res.data)
    			      this.$notifier.showMessage({ content: `Station Created Successfully`, color: 'success' })
				        // this.$router.push('login')
					})
					.catch((err) => {
						console.log(err.response)
    			      this.$notifier.showMessage({ content: `Error ${err.response.data.message}`, color: 'error' })

					})

      },
      onSubmit(evt) {
        evt.preventDefault()
        this.createStation()
      },
      onSubmitFind(evt) {
        evt.preventDefault()
        this.findStation()

      },
      onReset(evt) {
        evt.preventDefault()
        this.update = false
        // Reset our form values
        this.form.station_name = ''
        this.form.station_id = ''
        this.form.latitude = null
        this.form.longitude = null
        this.form.checked = []
        this.station_id = null,
        this.updateform.station_name = ''
        this.updateform.latitude = null
        this.updateform.longitude= null
        this.station = null
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>