<template>
	<v-container>
		<v-tabs>
			<h1>The Admin page</h1>
		</v-tabs>
	</v-container>
</template>

<script>
	export default {
		middleware: 'auth-admin'
	}
</script>