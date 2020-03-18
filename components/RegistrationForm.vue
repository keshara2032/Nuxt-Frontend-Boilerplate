<template>
<div>
		<b-container class="outer-boarder">



			<!-- <h2>token:{{this.$store.state.localStorage.token}}</h2>
			<h2>name:{{this.$store.state.localStorage.name}}</h2>
			<button@click="add_one">Add 1</button> -->




			<br>
			<br>
			<b-row class="justify-content-md-center">
				<b-col></b-col>
				<b-col lg="6" cols="8" class="inner-boarder">
					<br>
					<b-row class="justify-content-md-center">
						<b-col cols="2"></b-col>
						<b-col cols="8">
							<h2 style="text-align:center">Registration Form</h2>
						</b-col>
						<b-col cols="2"></b-col>
					</b-row>
					<br>

					<b-form @submit.stop.prevent="onSubmit" @reset="onReset">

						<b-form-group
							id="email_title"
							label="Email:"
							label-for="email"
							>
							<b-form-input
								id="email"
								v-model="form.email"
								type="email"
								required
								placeholder="Enter Email"
								:state="email_validation"
							></b-form-input>
							<b-form-valid-feedback :state="email_validation">
								Looks Good.
							</b-form-valid-feedback>
						</b-form-group>

						<b-form-group
							id="name_title"
							label="Fullname:"
							label-for="name"
							>
							<b-form-input
								id="name"
								v-model="form.name"
								required
								placeholder="Enter Full Name"
								:state="name_validation"
							></b-form-input>
							<b-form-invalid-feedback :state="name_validation">
								Your Name must be 6-12 characters long.
							</b-form-invalid-feedback>
							<b-form-valid-feedback :state="name_validation">
								Looks Good.
							</b-form-valid-feedback>
						</b-form-group>

						

						<b-form-group
							id="password_title"
							label="Password:"
							label-for="password"
							description="We'll never share your password with anyone else."
							>
							<b-form-input
								id="password"
								v-model="form.password"
								type="password"
								required
								placeholder="Enter Password"
								:state="password_validation"
							></b-form-input>
						</b-form-group>

						<b-form-group
							id="comfirm_password_title"
							label="Confirm Password:"
							label-for="confirm_password"
							>
							<b-form-input
								id="confirm_password"
								v-model="confirm_password"	
								type="password"
								required
								placeholder="Re-Enter Password"
								:state="con_password_validation"
							></b-form-input>
							<b-form-invalid-feedback :state="con_password_validation">
								Password is incorrect.
							</b-form-invalid-feedback>
						</b-form-group>

						<b-form-group
							id="mobile_title"
							label="Mobile No:"
							label-for="mobile"
							>
							<b-form-input
								id="mobile"
								v-model="form.mobile"
								required
								placeholder="Enter Your Mobile Number"
							></b-form-input>
						</b-form-group>

						<b-row class="justify-content-md-center">
							<b-form-group id="agreement_title">
								<b-form-checkbox-group 
									v-model="agreeability"
									id="agreement"
									>
									<b-form-checkbox
										value="set"
										:state="license_validation"
										>
										By creating an account you agree to our
										<nuxt-link to="#" target="_blank">
											Terms & Conditions
										</nuxt-link>
									</b-form-checkbox>
									<b-form-invalid-feedback :state="license_validation">
										You must agree the Terms & Conditions in order to enjoy our services
									</b-form-invalid-feedback>
								</b-form-checkbox-group>
							</b-form-group>
						</b-row>

						<b-row class="justify-content-md-center">
							<b-col cols="2"></b-col>
							<b-col cols="4" class="justify-content-md-center"><b-button block type="submit" variant="outline-warning">Submit</b-button></b-col>
							<b-col cols="4" class="justify-content-md-center"><b-button block type="reset" variant="outline-warning">Reset</b-button></b-col>
							<b-col cols="2"></b-col>
						</b-row>
					</b-form>
					<br>
				</b-col>
				<b-col></b-col>
			</b-row>
			<br>
		</b-container>
	
</div>
</template>

<style scoped>
	.emailverify {
		text-align: center;
	}
</style>

<script>

	export default {
		data() {
			return {
				form: {
					name: '',
					email: '',
					password: '',
					mobile: ''
				},
				confirm_password: '',
				agreeability: [],
			}
		},
		computed: {
			name_validation() {
				return this.form.name.length > 5 && this.form.name.length < 30
			},
			email_validation() {
				return this.form.email.length > 5
			},
			password_validation() {
				return this.form.password.length > 5
			},
			con_password_validation() {
				return (this.form.password === this.confirm_password) ? true : false
			},
			license_validation() {
				return (this.agreeability[0]==='set') ? true : false
			}
		},
		methods: {
			async onSubmit() {
			 await this.$axios
					.post('api/auth/register', this.form)
					.then((res) => {
					   console.log(res.data)
    				  this.$notifier.showMessage({ content: `Please check your email to verify the account`, color: 'success' })
					
				        this.$router.push('login')
					})
					.catch((err) => {
						console.log(err.response)
    			  		this.$notifier.showMessage({ content: `Error: ${err.response.data.message}`, color: 'error' })
				
					})
			},
			onReset(evt) {
				evt.preventDefault()
				this.form.username = ''
				this.form.email = ''
				this.form.password = ''
				this.form.mobile = ''
				this.confirm_password= ''
				this.agreeability= ''
			},
			// add_one() {
			// 	// this.$store.commit('localStorage/SET_TOKEN' , {token: "hello", name:"Nadun"})
			// }
		},
		name: 'RegistrationForm'
	}
</script>