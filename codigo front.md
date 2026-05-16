<!DOCTYPE html><html class="dark" lang="en"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Aetheric Audio</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script defer="" src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;family=Geist:wght@500&amp;display=swap" rel="stylesheet">
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                            "on-secondary-fixed": "#310048",
                            "inverse-on-surface": "#313032",
                            "tertiary-fixed": "#ffdada",
                            "on-error": "#690005",
                            "on-secondary-fixed-variant": "#7200a3",
                            "primary-fixed": "#7df4ff",
                            "primary-fixed-dim": "#00dbe9",
                            "on-surface-variant": "#b9cacb",
                            "secondary": "#e9b3ff",
                            "inverse-surface": "#e5e1e4",
                            "surface-dim": "#131315",
                            "secondary-fixed": "#f6d9ff",
                            "background": "#131315",
                            "on-secondary": "#510074",
                            "inverse-primary": "#006970",
                            "secondary-container": "#7d01b1",
                            "surface-container-highest": "#353437",
                            "primary": "#dbfcff",
                            "surface-container-low": "#1c1b1d",
                            "surface-container": "#201f21",
                            "surface-variant": "#353437",
                            "on-tertiary-container": "#bf0036",
                            "tertiary": "#fff3f2",
                            "surface-container-high": "#2a2a2c",
                            "surface-tint": "#00dbe9",
                            "on-tertiary-fixed-variant": "#920027",
                            "on-background": "#e5e1e4",
                            "error-container": "#93000a",
                            "on-secondary-container": "#e5a9ff",
                            "on-primary-container": "#006970",
                            "surface": "#131315",
                            "surface-bright": "#39393b",
                            "tertiary-fixed-dim": "#ffb3b5",
                            "on-primary": "#00363a",
                            "surface-container-lowest": "#0e0e10",
                            "on-error-container": "#ffdad6",
                            "on-tertiary": "#680019",
                            "on-primary-fixed": "#002022",
                            "tertiary-container": "#ffcdce",
                            "outline": "#849495",
                            "on-primary-fixed-variant": "#004f54",
                            "primary-container": "#00f0ff",
                            "on-tertiary-fixed": "#40000c",
                            "on-surface": "#e5e1e4",
                            "secondary-fixed-dim": "#e9b3ff",
                            "outline-variant": "#3b494b",
                            "error": "#ffb4ab"
                    },
                    "borderRadius": {
                            "DEFAULT": "1rem",
                            "lg": "2rem",
                            "xl": "3rem",
                            "full": "9999px"
                    },
                    "spacing": {
                            "margin-mobile": "20px",
                            "container-max": "1440px",
                            "gutter": "24px",
                            "margin-desktop": "48px",
                            "unit": "8px"
                    },
                    "fontFamily": {
                            "body-md": ["Inter"],
                            "display-lg": ["Inter"],
                            "headline-md": ["Inter"],
                            "body-lg": ["Inter"],
                            "label-sm": ["Geist"],
                            "display-lg-mobile": ["Inter"]
                    },
                    "fontSize": {
                            "body-md": ["16px", {"lineHeight": "1.5", "fontWeight": "400"}],
                            "display-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                            "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}],
                            "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
                            "label-sm": ["12px", {"lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "500"}],
                            "display-lg-mobile": ["32px", {"lineHeight": "1.2", "fontWeight": "700"}]
                    }
                }
            }
        }
    </script>
<style>
        .glass-panel {
            background: rgba(19, 19, 21, 0.6);
            backdrop-filter: blur(30px);
            -webkit-backdrop-filter: blur(30px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        .glow-border {
            border: 1px solid transparent;
            background-image: linear-gradient(to right, rgba(255,255,255,0.2), rgba(0,219,233,0.4));
            background-origin: border-box;
            background-clip: padding-box, border-box;
        }
        .neon-bloom:hover {
            box-shadow: 0 0 20px rgba(0, 219, 233, 0.15);
        }
        .bg-cyberpunk {
            background-image: radial-gradient(circle at 50% 50%, rgba(125, 1, 177, 0.2) 0%, rgba(19, 19, 21, 1) 70%);
        }
    </style>
<style data-stitch-cursor=""></style><style data-stitch-scroll-lock=""></style></head>
<body class="bg-background text-on-surface font-body-md min-h-screen overflow-hidden flex bg-cyberpunk" x-data="{ sidebarOpen: true, libraryOpen: true }">
<!-- Top NavBar (Mobile/Web Hybrid) -->
<nav class="md:hidden flex justify-between items-center px-margin-mobile py-unit w-full sticky top-0 z-50 bg-surface/10 backdrop-blur-xl border-b border-white/10 shadow-none">
<div class="flex items-center gap-3">
<img alt="User profile" class="w-8 h-8 rounded-full object-cover border border-white/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS61hbspY7N9cx73Vc6nRShRD2rFO8lSsjGaGcbpLLrixABW5tPuxO-q7ADNX-CQ1xt_DvjLOOYx8IZI_f6Chplwm-THdx2_YD6ynYJrqu7jnrCCskUpkArQn904KttPFxkE_NJS9bze8HOGS0BMa329JG3NK5i5AD3ZAdTU0qmRVOtdD87xKMepyInpQhILosdIGQTgHmGUGl7ZBQkEbOWFUHgI1uIn3H9dse9KflQvYRV5O0Unbf_-HQ85HqSIECau89IeHpOc2A">
<div class="font-display-lg-mobile text-[24px] tracking-tighter text-primary drop-shadow-[0_0_10px_rgba(0,219,233,0.4)]">Alex Cipher</div>
</div>
<div class="flex gap-4">
<span class="material-symbols-outlined text-primary hover:text-primary transition-colors duration-300" style="font-variation-settings: 'FILL' 0;">settings</span>
</div>
</nav>
<!-- SideNavBar (Desktop) -->
<aside :class="sidebarOpen ? 'w-64' : 'w-20'" class="hidden md:flex fixed left-0 top-0 h-full flex-col z-40 bg-surface/20 backdrop-blur-[30px] text-primary font-body-md rounded-r-lg border-r border-white/20 shadow-[20px_0_40px_rgba(0,0,0,0.3)] transition-all duration-300 w-64">
<div :class="sidebarOpen ? 'p-6' : 'p-4 flex flex-col items-center'" class="p-6"><div x-show="sidebarOpen" class="mb-6 px-1">
  <h2 class="font-display-lg text-[28px] font-bold tracking-tighter text-primary drop-shadow-[0_0_12px_rgba(0,219,233,0.5)] italic">
    Rin'ne
  </h2>
</div>
<div :class="sidebarOpen ? '' : 'justify-center'" class="flex items-center gap-3 mb-8 w-full">
<img alt="User profile" class="w-12 h-12 rounded-full object-cover border border-white/20 shrink-0" data-alt="A close-up portrait of a user in a dimly lit, futuristic setting. The lighting is dominated by soft neon blue and purple glows, creating a premium cyberpunk aesthetic. The background is blurred to emphasize the subject." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS61hbspY7N9cx73Vc6nRShRD2rFO8lSsjGaGcbpLLrixABW5tPuxO-q7ADNX-CQ1xt_DvjLOOYx8IZI_f6Chplwm-THdx2_YD6ynYJrqu7jnrCCskUpkArQn904KttPFxkE_NJS9bze8HOGS0BMa329JG3NK5i5AD3ZAdTU0qmRVOtdD87xKMepyInpQhILosdIGQTgHmGUGl7ZBQkEbOWFUHgI1uIn3H9dse9KflQvYRV5O0Unbf_-HQ85HqSIECau89IeHpOc2A">
<div class="flex-1 min-w-0" x-show="sidebarOpen">
<div class="flex items-center justify-between">
<h1 class="font-headline-md text-headline-md text-primary font-bold truncate">Alex Cipher</h1>
<button class="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-full hover:bg-white/5" title="Edit Profile">
<span class="material-symbols-outlined text-[16px]">edit</span>
</button>
</div>
</div>
</div>
<nav class="flex flex-col gap-2 w-full">
<a :class="sidebarOpen ? 'gap-3' : 'justify-center border-l-0'" class="flex items-center p-3 rounded-lg bg-primary/10 text-primary border-l-4 border-primary shadow-[0_0_15px_rgba(0,219,233,0.2)] translate-x-1 duration-200 gap-3" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">music_note</span>
<span x-show="sidebarOpen" class="">Music</span>
</a>
<a :class="sidebarOpen ? 'gap-3' : 'justify-center'" class="flex items-center p-3 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-primary transition-all gap-3" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">queue_music</span>
<span x-show="sidebarOpen" class="">Playlist</span>
</a>
<a :class="sidebarOpen ? 'gap-3' : 'justify-center'" class="flex items-center p-3 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-primary transition-all gap-3" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">tune</span>
<span x-show="sidebarOpen" class="">Preferences</span>
</a>
</nav>
</div>
<div :class="sidebarOpen ? 'p-6' : 'p-4 items-center'" class="mt-auto p-6 flex flex-col gap-4">
<button @click="sidebarOpen = !sidebarOpen" class="w-full flex items-center justify-center p-2 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-primary transition-all bg-surface/30 border border-white/5">
<span class="material-symbols-outlined" x-text="sidebarOpen ? 'keyboard_double_arrow_left' : 'keyboard_double_arrow_right'">keyboard_double_arrow_left</span>
</button>
<div class="flex flex-col gap-2 w-full">
<a :class="sidebarOpen ? 'gap-3' : 'justify-center'" class="flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-primary transition-all gap-3" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">help</span>
<span class="font-label-sm text-label-sm" x-show="sidebarOpen">Support</span>
</a>
<a :class="sidebarOpen ? 'gap-3' : 'justify-center'" class="flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-primary transition-all gap-3" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">logout</span>
<span class="font-label-sm text-label-sm" x-show="sidebarOpen">Logout</span>
</a>
</div>
</div>
</aside>
<!-- Main Content Area -->
<main :class="sidebarOpen ? 'md:ml-64' : 'md:ml-20'" class="flex-1 ml-0 relative h-screen flex flex-col md:flex-row transition-all duration-300 md:ml-64">
<!-- Left Panel: Content (Música Tab Active) -->
<section :class="libraryOpen ? 'w-full md:w-1/3 p-gutter' : 'hidden md:flex w-full md:w-20 p-4 items-center'" class="h-full flex-col gap-6 z-10 glass-panel border-r-0 md:border-r border-white/10 overflow-y-auto transition-all duration-300 w-full md:w-1/3 p-gutter">
<div :class="libraryOpen ? 'justify-between' : 'justify-center'" class="flex items-center w-full justify-between">
<h2 class="font-headline-md text-headline-md text-on-surface" x-show="libraryOpen">Library</h2>
<div class="flex items-center gap-2">
<button class="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-colors neon-bloom" x-show="libraryOpen">
<span class="material-symbols-outlined text-[18px]">add</span>
<span class="font-label-sm text-label-sm">Importar música</span>
</button>
<button @click="libraryOpen = !libraryOpen" class="p-2 rounded-full border border-white/10 text-on-surface-variant hover:text-primary transition-colors hover:bg-white/5 shrink-0 flex items-center justify-center">
<span class="material-symbols-outlined text-[18px]" x-text="libraryOpen ? 'chevron_left' : 'chevron_right'">chevron_left</span>
</button>
</div>
</div>
<!-- Song List -->
<div :class="libraryOpen ? '' : 'items-center mt-4'" class="flex flex-col gap-3 w-full">
<div :class="libraryOpen ? 'gap-4 p-3' : 'justify-center p-2'" class="flex items-center rounded-lg bg-surface/40 border border-white/5 hover:border-primary/30 hover:bg-white/5 transition-all cursor-pointer neon-bloom w-full gap-4 p-3">
<img alt="Album Art" class="w-12 h-12 rounded-md object-cover shrink-0" data-alt="Abstract 3D rendering of fluid, glass-like shapes floating in a dark, atmospheric space. Illuminated by vibrant cyan and purple neon lights, giving a futuristic, premium cyber-aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJjjfa1fpdqZtcTc14NjFHyrHf43BfI-wXhcXRjCcLb8HMPO4wQApJNNzNH1Uv_o0M8IPBNry6lVOtmkCj5r2Gt1_t0jNj7WLOCDhy36D_elYRAJjowEYtvawWSJXIe2FEyHc6fzohxMUPBfbfzMQgy0jAiRsM-NjWIphbzeQWpypxEPtyE4X5Z4wcnrAqzM-7U1Fgz23Y8XgHJfovIqgHhWKJ2Z-OMhku-sRjnGIsFvhJccxk0yXsk7hh7dsRBHZWRvBS_vo48gmk">
<div class="flex-1 min-w-0" x-show="libraryOpen">
<h4 class="font-body-md text-body-md text-on-surface truncate">Neon Genesis</h4>
<p class="font-label-sm text-label-sm text-on-surface-variant truncate">Synthwave Syndicate</p>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant" x-show="libraryOpen">4:23</span>
</div>
<div :class="libraryOpen ? 'gap-4 p-3' : 'justify-center p-2'" class="flex items-center rounded-lg bg-surface/40 border border-white/5 hover:border-primary/30 hover:bg-white/5 transition-all cursor-pointer neon-bloom w-full gap-4 p-3">
<div class="w-12 h-12 rounded-md shrink-0 bg-gradient-to-br from-secondary-container to-surface-container flex items-center justify-center">
<span class="material-symbols-outlined text-primary">music_note</span>
</div>
<div class="flex-1 min-w-0" x-show="libraryOpen">
<h4 class="font-body-md text-body-md text-on-surface truncate">Atmospheric Drift</h4>
<p class="font-label-sm text-label-sm text-on-surface-variant truncate">Eno Vibes</p>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant" x-show="libraryOpen">6:12</span>
</div>
<div :class="libraryOpen ? 'gap-4 p-3' : 'justify-center p-2'" class="flex items-center rounded-lg bg-surface/40 border border-white/5 hover:border-primary/30 hover:bg-white/5 transition-all cursor-pointer neon-bloom w-full gap-4 p-3">
<img alt="Album Art" class="w-12 h-12 rounded-md object-cover shrink-0" data-alt="A dark, moody abstract background with sweeping curves of deep purple and magenta. The texture is smooth, resembling liquid silk or smoke, lit from beneath by a cool, technical glow." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaTz1wv0rU66rEVl6DjPaMs_TsZHwXgkgQIK0vE2rNLo_OY7DZ_mZZMhKfj-q5yFvDiMWvsQzv_BWGWf0GypUPyNvSN-Q_U2yOJ07joQHZ8U8mcm2IX_slvkye7YSSscZUKftSflN3YfuqZRgVue8Z1ssoyDqpnJ6FnM3hoO3HqQjwrilVlP73tv5f8VU7nwFtrZ75d57qsQ6QQg7PAnnrOVGXe4M8IlUu4CZMRiAuRL81ugsz8AL97ByRj5npgR7Bh6MVuqFuSOKG">
<div class="flex-1 min-w-0" x-show="libraryOpen">
<h4 class="font-body-md text-body-md text-on-surface truncate">Quantum State</h4>
<p class="font-label-sm text-label-sm text-on-surface-variant truncate">Data Lords</p>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant" x-show="libraryOpen">3:45</span>
</div>
</div>
</section>
<!-- Right Panel: Player -->
<section class="flex-1 relative h-full flex flex-col justify-end p-margin-desktop z-0">
<!-- Top Right Settings -->
<div class="absolute top-margin-desktop right-margin-desktop z-20">
<button class="p-3 rounded-full bg-surface/40 backdrop-blur-md border border-white/10 text-on-surface hover:text-primary transition-colors neon-bloom">
<span class="material-symbols-outlined">settings</span>
</button>
</div>
<!-- Vinyl Visualizer (Abstracted as a glowing circle peeking) -->
<div class="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] rounded-full border border-primary/20 bg-surface-lowest/50 backdrop-blur-sm flex items-center justify-center opacity-30 pointer-events-none">
<div class="w-[500px] h-[500px] rounded-full border border-secondary/20 flex items-center justify-center">
<img alt="Center Label" class="w-48 h-48 rounded-full object-cover shadow-[0_0_50px_rgba(0,219,233,0.3)]" data-alt="Abstract 3D rendering of fluid, glass-like shapes floating in a dark, atmospheric space. Illuminated by vibrant cyan and purple neon lights, giving a futuristic, premium cyber-aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV6le2FsvZpKTeUekkVeaexIHr3vsqbEIyAtUCBa82WYsThivElQvUqQiQKPV1xAugeJd8lojKSjZwSI907ytYBVV8r7cFoofbPAT8SIUIRZIIueayty5_AlX1B8qofX2osja0LoO3hVHLwDinc7mU3oqJtkKmR2IIHTIQfEvd2X7eMiSxdvRjnA4Zg4DsYILe7pTzUzwqbsGT4W1PQXalwLv2_Thfo0ZFrEIYtIblIj2LW38DTzPgD4SlehbRPuyUTfyRbkqQPxYw">
</div>
</div>
<!-- Player Controls -->
<div class="glass-panel rounded-xl p-8 max-w-2xl mx-auto w-full z-10">
<div class="flex justify-between items-end mb-6">
<div>
<h2 class="font-display-lg text-display-lg text-on-surface">Neon Genesis</h2>
<p class="font-body-lg text-body-lg text-primary mt-2">Synthwave Syndicate</p>
</div>
<button class="p-2 text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined">edit</span>
</button>
</div>
<!-- Progress Bar -->
<div class="flex items-center gap-4 mb-8">
<span class="font-label-sm text-label-sm text-on-surface-variant">1:24</span>
<div class="flex-1 h-1 bg-white/10 rounded-full relative">
<div class="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-primary to-primary-container rounded-full shadow-[0_0_10px_rgba(0,219,233,0.5)]"></div>
<div class="absolute top-1/2 left-1/3 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] cursor-pointer hover:scale-125 transition-transform"></div>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant">4:23</span>
</div>
<!-- Transport Controls -->
<div class="flex justify-center items-center gap-8">
<button class="text-on-surface hover:text-primary transition-colors">
<span class="material-symbols-outlined text-[32px]">skip_previous</span>
</button>
<button class="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,219,233,0.4)]">
<span class="material-symbols-outlined text-[36px]" style="font-variation-settings: 'FILL' 1;">pause</span>
</button>
<button class="text-on-surface hover:text-primary transition-colors">
<span class="material-symbols-outlined text-[32px]">skip_next</span>
</button>
</div>
</div>
</section>
</main>


</body></html>