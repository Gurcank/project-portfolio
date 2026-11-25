/*
 * Where the "pause motion" choice is stored, and the tiny script that restores it before first paint.
 * No React here: the server-rendered root document imports it (lib/experience-store.ts is client-side).
 */

export const MOTION_STORAGE_KEY = "motion";

/** Runs before first paint, so a reader who paused motion never sees a frame of it on the next visit. */
export const restoreMotionScript = `try{if(localStorage.getItem("${MOTION_STORAGE_KEY}")==="paused")document.documentElement.dataset.motion="paused"}catch(e){}`;
