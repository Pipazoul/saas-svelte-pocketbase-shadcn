<script>
	export let password;
	import checkPasswordStrength from 'check-password-strength';
	import Fa from 'svelte-fa';
	let strengthValue = 'weak';

	$: strength = checkPasswordStrength.passwordStrength(password);

</script>

<div id="color-indicators">
	<span class="rounded-md" class:valid={strength.id >= 0} />
	<span class="rounded-md" class:valid={strength.id >= 1} />
	<span class="rounded-md" class:valid={strength.id >= 2} />
	<span class="rounded-md" class:valid={strength.id >= 3} />
</div>
<h1> 
	Your password is {strengthValue} 
</h1>

<style>
	#color-indicators {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		column-gap: 0.2rem;
	}
	#color-indicators span {
		height: 5px;
	}
	span.valid:nth-child(1) {
		background-color: red;
	}
	span.valid:nth-child(2) {
		background-color: orange;
	}
	span.valid:nth-child(3) {
		background-color: yellow;
	}
	span.valid:nth-child(4) {
		background-color: green;
	}

	li.valid {
		color: green;
	}
</style>
