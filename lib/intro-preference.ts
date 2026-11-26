/*
 * The intro plays once per session (ROADMAP D10). This script runs before first paint, right after the
 * motion one, and decides: play only on a wide screen, without reduced motion or paused motion, and
 * only if this tab hasn't seen it. CSS shows the intro for html[data-intro="play"] and nothing else, so
 * with storage blocked or this script failing, there is simply no intro.
 * The skip listeners live here too, not in React: a click or key ends it even before hydration, and the
 * event goes on to do what it would have done (Tab still reaches the skip link).
 */
export const INTRO_STORAGE_KEY = "intro";

export const introScript = `try{var d=document.documentElement;if(sessionStorage.getItem("${INTRO_STORAGE_KEY}")||d.dataset.motion==="paused"||!matchMedia("(width >= 64rem) and (prefers-reduced-motion: no-preference)").matches){d.dataset.intro="done"}else{sessionStorage.setItem("${INTRO_STORAGE_KEY}","seen");d.dataset.intro="play";var e=function(){d.dataset.intro="done"};addEventListener("pointerdown",e,{once:true});addEventListener("keydown",e,{once:true})}}catch(x){document.documentElement.dataset.intro="done"}`;
