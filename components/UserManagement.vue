<template>
<div>
  <b-tabs content-class="mt-3">
   <b-tab active>
      <template v-slot:title>
        <b-spinner type="grow" small variant="success"></b-spinner> Users
      </template>

  <b-container fluid>
          
  <b-container style="margin:auto;">

    <!-- User Interface controls -->
    <b-row>
      <b-col >
        <b-form-group
          label="Sort"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="sortBySelect"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-select v-model="sortBy" id="sortBySelect" :options="sortOptions" class="w-75">
              <template v-slot:first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>
            <b-form-select v-model="sortDesc" size="sm" :disabled="!sortBy" class="w-25">
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col >
        <b-form-group
          label="Initial sort"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="initialSortSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="sortDirection"
            id="initialSortSelect"
            size="sm"
            :options="['asc', 'desc', 'last']"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col >
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter On"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          description="Leave all unchecked to filter on all data"
          class="mb-0">
          <b-form-checkbox-group v-model="filterOn" class="mt-1">
            <b-form-checkbox value="name">Name</b-form-checkbox>
            <b-form-checkbox value="age">Age</b-form-checkbox>
            <b-form-checkbox value="isActive">Active</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>


      <b-col class="my-1">
        <b-form-group
          label="Per page"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <!-- <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col> -->

      
    </b-row>

        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>

  </b-container>
    <!-- Main table element -->
    <b-table
      show-empty
      small
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >
      <template v-slot:cell(name)="row">
          <b-form-input style="border:0px;" v-model="row.item.name.first"
/>
        <!-- {{ row.value.first }} {{ row.value.last }} -->
      </template>


      <template v-slot:cell(email)="row">
          <b-form-input style="border:0px;" v-model="row.item.email"  type="email"/>
        <!-- {{ row.value.first }} {{ row.value.last }} -->
      </template>

        <template v-slot:cell(age)="row" >
          
          <b-form-input style="border:0px; text-align: center; margin: auto;" v-model="row.item.age"  type="number"  />
        <!-- {{ row.value.first }} {{ row.value.last }} -->
      </template>

        <template v-slot:cell(mobile)="row">
          <b-form-input style="border:0px; text-align: center; margin: auto; " v-model="row.item.mobile"  />
        <!-- {{ row.value.first }} {{ row.value.last }} -->
      </template>


        <template v-slot:cell(role)="row" >
          <b-form-input style="border:0px; text-align: center; margin: auto;" v-model="row.item.role"    />
        <!-- {{ row.value.first }} {{ row.value.last }} -->
      </template>

        <template v-slot:cell(isActive)="row">
          <!-- <b-form-input style="border:0px;" v-model="row.item.isActive" list="activeState"  autocomplete="off"  type="bool" /> -->
              <b-form-checkbox
      id="checkbox-1"
      v-model="row.item.isActive"
      name="checkbox-1"
      value="true"
      unchecked-value="false"
      style="border:0px; text-align: center; margin: auto; "
    >
    </b-form-checkbox>
        <!-- {{ row.value.first }} {{ row.value.last }} -->
      </template>

      <template v-slot:cell(actions)="row">
        <b-button size="sm" variant="danger" @click="deleteUser(row.item)" class="mr-1">
          Remove User
        </b-button>
        <b-button size="sm" variant="success" @click="updateUser(row.item)" class="mr-1">
         Update User
        </b-button>
      </template>

 
    </b-table>

    <!-- Info modal -->
    <!-- <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal> -->
    
  </b-container>


    </b-tab>

    <b-tab>
      <template v-slot:title>
        <b-spinner type="grow" small variant="danger"></b-spinner> Admins
      </template>

<!-- Admin Management Console -->
  <b-container fluid>
          

    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Sort"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="sortBySelect"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-select v-model="sortBy" id="sortBySelect" :options="sortOptions" class="w-75">
              <template v-slot:first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>
            <b-form-select v-model="sortDesc" size="sm" :disabled="!sortBy" class="w-25">
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Initial sort"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="initialSortSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="sortDirection"
            id="initialSortSelect"
            size="sm"
            :options="['asc', 'desc', 'last']"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter On"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          description="Leave all unchecked to filter on all data"
          class="mb-0">
          <b-form-checkbox-group v-model="filterOn" class="mt-1">
            <b-form-checkbox value="name">Name</b-form-checkbox>
            <b-form-checkbox value="age">Age</b-form-checkbox>
            <b-form-checkbox value="isActive">Active</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      show-empty
      small
      stacked="md"
      :items="admins"
      :fields="adminfields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >
      <template v-slot:cell(name)="row">
          <b-form-input style="border:0px;" v-model="row.item.name.first"/>
        <!-- {{ row.value.first }} {{ row.value.last }} -->
      </template>

      <template v-slot:cell(email)="row">
          <b-form-input style="border:0px;" v-model="row.item.email"  type="email"/>
        <!-- {{ row.value.first }} {{ row.value.last }} -->
      </template>

        <template v-slot:cell(age)="row" >
          
          <b-form-input style="border:0px; text-align: center; margin: auto;" v-model="row.item.age"  type="number"  />
        <!-- {{ row.value.first }} {{ row.value.last }} -->
      </template>


        <template v-slot:cell(role)="row" >
          <b-form-input style="border:0px; text-align: center; margin: auto;" v-model="row.item.role"    />
        <!-- {{ row.value.first }} {{ row.value.last }} -->
      </template>

        <template v-slot:cell(mobile)="row">
          <b-form-input style="border:0px; text-align: center; margin: auto; " v-model="row.item.mobile"  />
        <!-- {{ row.value.first }} {{ row.value.last }} -->
      </template>

        <template v-slot:cell(isActive)="row">
          <!-- <b-form-input style="border:0px;" v-model="row.item.isActive" list="activeState"  autocomplete="off"  type="bool" /> -->
              <b-form-checkbox
      id="checkbox-1"
      v-model="row.item.isActive"
      name="checkbox-1"
      value="true"
      unchecked-value="false"
      style="border:0px; text-align: center; margin: auto; "
    >
    </b-form-checkbox>
        <!-- {{ row.value.first }} {{ row.value.last }} -->
      </template>

      <template v-slot:cell(actions)="row">
        <b-button size="sm" variant="danger" @click="deleteUser(row.item)" class="mr-1">
          Remove User
        </b-button>
        <b-button size="sm" variant="success" @click="updateUser(row.item)" class="mr-1">
         Update User
        </b-button>
      </template>

 
    </b-table>

    <!-- Info modal -->
    <!-- <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal> -->
    
  </b-container>










    </b-tab>

  </b-tabs>

<datalist id="activeState" >
    <option v-for="state in states"  :key="state.id" >{{ state }}</option>
  </datalist>



</div>



</template>

<script>
  export default {
      name: 'UserManagement',
       
    data() {
      return {
        users:[],
        items: [
        ],
        admins:[],
        fields: [
          { key: 'name', label: 'Person Full name', sortable: true, sortDirection: 'desc' ,       class: 'text-center',},
          { key: 'email', label: 'Registered Email', sortable: true, sortDirection: 'desc' ,      class: 'text-center'},
          { key: 'age', label: 'Person age', sortable: true, class: 'text-center' },
          { key: 'mobile', label: 'Mobile', sortable: true, class: 'text-center' },
          { key: 'bike', label: 'Current Bike', sortable: true, class: 'text-center' },
          { key: 'role', label: 'Role', sortable: true, class: 'text-center' },

          {
            key: 'isActive',
            label: 'is Active',
            class: 'text-center',
            formatter: (value, key, item) => {
              return value ? 'Yes' : 'No'
            },
            sortable: true,
            
            sortByFormatted: true,
            filterByFormatted: true
          },
          { key: 'actions', label: 'Actions',      class: 'text-center' }
        ],
        adminfields: [
          { key: 'name', label: 'Person Full name', sortable: true, sortDirection: 'desc' ,       class: 'text-center',},
          { key: 'email', label: 'Registered Email', sortable: true, sortDirection: 'desc' ,      class: 'text-center'},
          { key: 'age', label: 'Person age', sortable: true, class: 'text-center' },
          { key: 'mobile', label: 'Mobile', sortable: true, class: 'text-center' },
          { key: 'role', label: 'Role', sortable: true, class: 'text-center' },

          {
            key: 'isActive',
            label: 'is Active',
            class: 'text-center',
            formatter: (value, key, item) => {
              return value ? 'Yes' : 'No'
            },
            sortable: true,
            
            sortByFormatted: true,
            filterByFormatted: true
          },
          { key: 'actions', label: 'Actions',      class: 'text-center' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        states: [true,false],
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },

    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length

    
        this.loadUsers()





    },
    methods: {

    async updateUser(userObj) {

            console.log(userObj)
            

          await this.$axios
					.post('api/auth/update?email=' + userObj.email,userObj)
					.then((res) => {

                     this.loadUsers()

    			      this.$notifier.showMessage({ content: `User Updated Successfully`, color: 'success' })
				        // this.$router.push('login')
					})
					.catch((err) => {
						console.log(err.response)
                      this.$notifier.showMessage({ content: `Error ${err.response.data.message}`, color: 'error' })
                      

          })
          

         
      },

      async loadUsers() {


                     await  this.$axios
					.get('api/auth/findall' )
					.then((res) => {
                        this.users = res.data.users
                        // console.log(this.users)
                        this.items = []
                        this.admins = []

                     this.users.forEach(element => {

                     if(element.role === 'user' ){

                      this.items.push({ isActive: element.active, age: element.age, role: element.role,
                      name: { first: element.name, last: '' },
                      mobile:element.mobile , email:element.email , _rowVariant: (element.active ? '' : 'danger')})      

                      }else if(element.role === 'admin' )

                      this.admins.push({ isActive: element.active, age: element.age, role: element.role,
                      name: { first: element.name, last: '' },
                      mobile:element.mobile , email:element.email , _rowVariant: (element.active ? '' : 'danger')})      


                    });

                    console.log()

					})
					.catch((err) => {
						console.log(err.response)
                      this.$notifier.showMessage({ content: `Error ${err.response.data.message}`, color: 'error' })

          })
          

         
      },        
        
      async deleteUser(userObj) {


          await this.$axios
					.delete('api/auth/delete?email=' + userObj.email)
					.then((res) => {
                        console.log(res.data)
    			              this.$notifier.showMessage({ content: `User was unregistered!`, color: 'danger' })
                          this.loadUsers()


    			    //   this.$notifier.showMessage({ content: `Docks Found Successfully`, color: 'success' })
				        // this.$router.push('login')
					})
					.catch((err) => {
						console.log(err.response)
                      this.$notifier.showMessage({ content: `Error ${err.response.data.message}`, color: 'error' })
                      this.resetForm()
                      
                        this.update = false

					})

         
      },

      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>