export default function ({$auth,redirect}) {

	if ($auth.loggedIn) {
		console.log("A user is alredy logged in")
		 return redirect('/api/user')
		 // sould route to the current page .that is yet to implement
	}
}