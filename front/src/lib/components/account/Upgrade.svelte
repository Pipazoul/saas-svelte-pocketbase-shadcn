<script lang="ts">
    import {
      buttonVariants
    } from "$lib/components/ui/button/index";
    import * as Dialog from "$lib/components/ui/dialog/index";
	import PlanOffering from "../plans/PlanOffering.svelte";

  </script>
   
  <Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "default" })}
      >🚀 Upgrade subscription</Dialog.Trigger
    >
    <Dialog.Content class="sm:max-w-[625px]">
      <Dialog.Header>
        <Dialog.Title>Upgrade your plan</Dialog.Title>
      </Dialog.Header>
      <PlanOffering />
    </Dialog.Content>
  </Dialog.Root>