<script lang="ts">
    import imageCompression from 'browser-image-compression';
    import Cropper from 'svelte-easy-crop'
    import Fa from "svelte-fa/src/fa.svelte";
    import { faImage, faRotate } from "@fortawesome/free-solid-svg-icons";
    import { createEventDispatcher } from 'svelte';
	import getCroppedImg from '$lib/utils/image';

    export let image: string;
    let croppedImage: string;
    let pixelCrop: Event;
    let cropping: Boolean = false;
    let crop = { x: 0, y: 0 }
    let cropSize = { width: 250, height: 350 }
    let zoom = 1    

    $: console.log(cropSize)
    
    let fileinput: HTMLInputElement;
    const dispatch = createEventDispatcher();

    const onFileSelected = async (e) => {
        let imageFile = e.target.files[0];
        const options = {
            maxSizeMB: 0.7,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        try {
            imageFile = await imageCompression(imageFile, options);

        } catch (error) {
            console.log(error);
        }
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = (e) => {
            image = e.target.result;
            cropping = true;
        };
    }

    async function changeAspectRatio() {
        if (cropSize.width === 250) {
            cropSize = { width: 350, height: 250 }
        }
        else if (cropSize.width === 350) {
            cropSize = { width: 250, height: 350 }
        }
    }
    

    async function cropComplete() {
        croppedImage = await getCroppedImg(image, pixelCrop) || "" ;
        image = croppedImage;

        dispatch('imageSelected', image); // dispatching the event with the selected image data
        cropping = false;
    }

    async function previewCrop(e: CustomEvent) {
        pixelCrop = e.detail.pixels
    }

</script>

<section class="flex justify-center mt-4 border rounded-md p-4">
    <!-- TODO finish task -->
    {#if cropping}
        <Cropper
            {image}
            bind:cropSize
            bind:crop
            bind:zoom
            on:cropcomplete={previewCrop}
        />
        <div class="absolute bottom-0">
            <button class="z-10 btn bg-primary " on:click={cropComplete}>Recadrer</button>
            <button class="z-10 btn bg-primary text-white " on:click={changeAspectRatio}><Fa icon={faRotate}/></button>
        </div>
    {:else if croppedImage}
        <img id="image" src="{image}" alt="d" on:click={()=>{fileinput.click();}} />
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span on:click={()=>{fileinput.click();}} class="flex flex-col" >
            <Fa icon={faImage} size="5x" />
            <p>Cliquez pour ajouter une image</p>
        </span> 
        <p></p>
    {/if}
    <input style="display:none" type="file"  accept="image/*" capture="environment" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
</section>