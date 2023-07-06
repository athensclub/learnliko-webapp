<script lang="ts">
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import { queryClassroom } from '$lib/temp/analytic';

	let classroom: { id: string; name: string; total: number }[] = [];

	queryClassroom().then((data) => {
		classroom = data;
	});
</script>

<div class="flex h-full min-h-[100vh] w-full flex-row bg-[#F4F4F4] font-line-seed">
	<NavBar spaced teacher />
	<div class=" container mx-auto w-[70vw]">
		<div class="flex flex-1 py-[2vw]">
			{#each classroom as classroom, index (index)}
				<a
					href="/dashboard/students/database"
					class=" mr-[2vw] h-[10vw] w-1/3 rounded-[1.25vw] bg-white p-[1.5vw] shadow-lg"
				>
					<div class="flex justify-between">
						<h1 class="font-extrabold text-black">{classroom.name}</h1>
						<svg
							class="w-[1.5vw]"
							viewBox="0 0 34 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2 10.5C1.17157 10.5 0.5 11.1716 0.5 12C0.5 12.8284 1.17157 13.5 2 13.5V10.5ZM33.0607 13.0607C33.6464 12.4749 33.6464 11.5251 33.0607 10.9393L23.5147 1.3934C22.9289 0.807612 21.9792 0.807612 21.3934 1.3934C20.8076 1.97918 20.8076 2.92893 21.3934 3.51472L29.8787 12L21.3934 20.4853C20.8076 21.0711 20.8076 22.0208 21.3934 22.6066C21.9792 23.1924 22.9289 23.1924 23.5147 22.6066L33.0607 13.0607ZM2 13.5H32V10.5H2V13.5Z"
								fill="black"
							/>
						</svg>
					</div>
					<div class=" flex">
						<h1
							class=" bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] bg-clip-text text-[3.25vw] font-extrabold text-transparent"
						>
							{classroom.total}
						</h1>

						<svg
							class="w-[3vw] pl-[0.7vw]"
							viewBox="0 0 71 53"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								opacity="0.9"
								d="M21.3 26.5C28.167 26.5 33.725 20.573 33.725 13.25C33.725 5.92701 28.167 0 21.3 0C14.433 0 8.875 5.92701 8.875 13.25C8.875 20.573 14.433 26.5 21.3 26.5ZM29.82 30.2857H28.8992C26.5917 31.4688 24.0291 32.1786 21.3 32.1786C18.5709 32.1786 16.0194 31.4688 13.7008 30.2857H12.78C5.72437 30.2857 0 36.3902 0 43.9143V47.3214C0 50.4565 2.38516 53 5.325 53H37.275C40.2148 53 42.6 50.4565 42.6 47.3214V43.9143C42.6 36.3902 36.8756 30.2857 29.82 30.2857ZM53.25 26.5C59.1297 26.5 63.9 21.4129 63.9 15.1429C63.9 8.87277 59.1297 3.78571 53.25 3.78571C47.3703 3.78571 42.6 8.87277 42.6 15.1429C42.6 21.4129 47.3703 26.5 53.25 26.5ZM58.575 30.2857H58.1534C56.6114 30.8536 54.9806 31.2321 53.25 31.2321C51.5194 31.2321 49.8886 30.8536 48.3466 30.2857H47.925C45.6619 30.2857 43.5762 30.9837 41.7458 32.1076C44.4527 35.219 46.15 39.3478 46.15 43.9143V48.4571C46.15 48.7174 46.0945 48.9658 46.0834 49.2143H65.675C68.6148 49.2143 71 46.6708 71 43.5357C71 36.2127 65.442 30.2857 58.575 30.2857Z"
								fill="url(#paint0_linear_1218_8536)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_1218_8536"
									x1="-6.94859e-07"
									y1="26.7573"
									x2="71"
									y2="26.7573"
									gradientUnits="userSpaceOnUse"
								>
									<stop stop-color="#6C80E8" />
									<stop offset="1" stop-color="#9BA1FD" />
								</linearGradient>
							</defs>
						</svg>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
