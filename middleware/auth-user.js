export default function ({$auth, redirect}) {
	let user = $auth.user;

	if (user && (user.role === "admin" || user.role === "user")) {
		console.log("aceess granted")

	} else {
		return redirect('/api/user/login')
	}
}