/*
 * Where the "pause motion" choice is stored, and the tiny script that restores it before first paint.
 * No React here: the server-rendered root document imports it (lib/experience-store.ts is client-side).
 */

export const MOTION_STORAGE_KEY = "motion";

/**
 * Runs before first paint, so a reader who paused motion never sees a frame of it on the next visit.
 * It also marks <html data-js>: layers that need script (the works wheel, V4) reserve their space from
 * the first frame instead of shifting the page once React arrives, and stay out of the way without it.
 */
export const restoreMotionScript = `document.documentElement.dataset.js="";try{if(localStorage.getItem("${MOTION_STORAGE_KEY}")==="paused")document.documentElement.dataset.motion="paused"}catch(e){}`;
