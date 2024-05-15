<script lang="ts">
    import {
      Button,
      buttonVariants
    } from "$lib/components/ui/button/index";
    import * as Dialog from "$lib/components/ui/dialog/index";
    import { Input } from "$lib/components/ui/input/index";
    import { Label } from "$lib/components/ui/label/index";
    import * as Card from "$lib/components/ui/card/index.js";
  </script>
   
  <Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "default" })}
      >🚀 Upgrade subscription</Dialog.Trigger
    >
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Upgrade your plan</Dialog.Title>
      </Dialog.Header>
      <div class="grid gap-4 py-4">
        <Card.Root class="w-[350px]">
        <Card.Header>
            <Card.Title>Create project</Card.Title>
            <Card.Description>Deploy your new project in one-click.</Card.Description>
          </Card.Header>
          <Card.Content>
        </Card.Content>
        <Card.Footer class="flex justify-between">
          <Button>Deploy</Button>
        </Card.Footer>
      </Card.Root>
      </div>
    </Dialog.Content>
  </Dialog.Root>