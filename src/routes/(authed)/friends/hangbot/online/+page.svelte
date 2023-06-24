<script lang="ts">
	import FriendsGameLogo from "../FriendsGameLogo.svelte";
    import icon from '$lib/images/hangbot_icon.png';

</script>

<div
	class="w-[100vw] h-full min-h-[100vh] flex flex-col gap-[2vh] items-center justify-center bg-gradient-to-r from-[#C698FF] to-[#FFD281] font-line-seed"
>
	<FriendsGameLogo />

    <img class="w-[15vw]" src={icon} alt="Hangbot"/>

    <div class="text-[2.7vw] text-white text-center mt-[4vh]">
        <div class="inline-block font-medium">Play</div>
        <div class="inline-block font-extrabold">Hangbot</div> <br/>
        <div class="inline-block font-medium">with friends</div>
    </div>

    <div class="text-white text-[1.8vw]">
        ผู้เข้าร่วม 1/5
    </div>

    <div class="bg-white rounded-full font-bold text-[1.5vw] px-[5vw] py-[0.5vw] mt-[4vh]">Sent Invite</div>
</div>