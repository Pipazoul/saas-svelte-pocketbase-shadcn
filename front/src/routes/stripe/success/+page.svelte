<script lang="ts">
	import { getNextMonthDate } from '$lib/utils/misc';
	import { currentUser } from '$lib/store';
</script>

<section>
	<div class="card bg-primary shadow-xl text-white h-96">
		<div class="card-body">
			<h2 class="card-title">Abonnement Activé 🚀</h2>
			<p>
				Votre paiement a bien été effectué <b>merci !</b> <br />
				Votre abonnement est actif jusqu'au
				<span class="badge text-white"
					>{getNextMonthDate($currentUser.stripe_subscription_date)}</span
				> <br />
				Vous pouvez dès à présent ajouter des produits a suivre
			</p>
			<div class="card-actions justify-center">
				<a href="/products" class="btn btn-secondary text-primary">Voir mes produits 📦</a>
				<a href="/products/add" class="btn bg-accent text-white">Ajouter un produit 📦</a>
			</div>
		</div>
	</div>
</section>
