<template>
<div>
			<h4 align="center">Management Console</h4>
            <br>
            <UserManagement />
</div>
</template>

<script>
import UserManagement from '../../components/UserManagement'

	export default {
          components: {
             // Navbar,
            UserManagement
        },
		middleware: 'auth-admin'
	}
</script>