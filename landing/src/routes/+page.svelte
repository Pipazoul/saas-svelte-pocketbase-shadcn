<script lang="ts">
	import Logo from '$lib/assets/favicon.svg';
	import Cover from '$lib/assets/cover.png';
	import Pattern_1 from '$lib/assets/pattern_1.png';
	import Pattern_2 from '$lib/assets/pattern_2.png';
	import Pattern_3 from '$lib/assets/pattern_3.png';
	import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from "$lib/components/ui/card";
  import {PUBLIC_FRONT_URL} from '$env/static/public'

  const frontUrl = PUBLIC_FRONT_URL
  const CurrentYear = new Date().getFullYear();

</script>

<section class="w-screen h-screen">
  <div class="fixed z-10 flex w-full items-center justify-center">
    <div
    class="color-white mt-4 flex w-fit items-center rounded-lg bg-neutral-700 p-2 text-white"
    >
      <img src={Logo} alt="logo" class="mr-2 h-8 w-8" />
      <ul class="flex">
        <a href="#"><li class="p-1">Item 1</li></a>
        <a href="#"><li class="p-1">Item 2</li></a>
        <a href="#"><li class="p-1">Item 3</li></a>
      </ul>
      <a href={frontUrl}>
        <Button variant="secondary">SignIn</Button>
      </a>
    </div>
  </div>

	<div>
			<div class="w-screen h-96 rounded-b-2xl flex justify-center items-center" style="background-image: url({Cover});">
        <div>
          <h1 class="text-7xl">Headline</h1>
          <p>A catch phrase telling stuff</p>
          <a href={frontUrl}>
            <Button >Get Started</Button>
          </a>
        </div>
			</div>
	</div>
  <div class="p-4">
    <h2 class="text-4xl font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo nec ante nec egestas. </h2>
    <div class="flex">
      <div class="w-1/2">
        <Card.Root class="m-4">
          <Card.Header>
            <Card.Title>Lorem ipsum</Card.Title>
            <Card.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo nec ante nec egestas. </Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="w-full h-96 rounded-2xl flex justify-center items-center" style="background-image: url({Pattern_1});">
          </Card.Content>
    
        </Card.Root>
      </div>
      <div class="w-1/2">
        <Card.Root class="m-4">
          <Card.Header>
            <Card.Title>Lorem ipsum</Card.Title>
            <Card.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo nec ante nec egestas. </Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="w-full h-96 rounded-2xl flex justify-center items-center" style="background-image: url({Pattern_2});">
          </Card.Content>
    
        </Card.Root>
      </div>
    </div>
    <div class="flex flex-row items-center p-4">
      <div class="w-1/2 flex justify-center">
        <div class="w-1/2 space-y-2">
          <h2 class="text-4xl ">Lorem ipsum dolor sit amet</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo nec ante nec egestas. In laoreet id justo sit amet aliquet
          </p>  
          <a href={frontUrl}>
            <Button >Get Started</Button>
          </a>    
        </div>

      </div>
      <div class="w-1/2 h-96 rounded-2xl flex justify-center items-center bg-cover bg-center" style="background-image: url({Pattern_3});"></div>
    </div>
  </div>
  <div class="h-0.5 bg-neutral-700"></div>
  <div class="p-4">
    <div class="flex items-center">
      <img src={Logo} alt="logo" class="mr-2 h-8 w-8 invert" />
      <p class="font-bold">SAAS</p>
    </div>
    <div class="text-neutral-600 mt-2">
      © {CurrentYear} All rights reserved.
    </div>
  </div>
  
  
</section>
