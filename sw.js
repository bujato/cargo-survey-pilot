'use strict';
const CACHE='cargo-v6-pilot-70';
const FILES=['./','./index.html','./app.js?v=70','./app.js','./manifest.json','./icon.png','./icon192.png'];
self.addEventListener('install',e=>e.waitUntil((async()=>{let c=await caches.open(CACHE);await c.addAll(FILES.map(x=>new Request(x,{cache:'reload'})));let keys=await caches.keys();if(keys.some(k=>/^cargo-v6-pilot-(6[0-9]|6)$/.test(k)))await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(let k of await caches.keys())if(k.startsWith('cargo-v6-')&&k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('message',e=>{if(e.data==='activate')self.skipWaiting()});
self.addEventListener('fetch',e=>{let u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin||!u.pathname.startsWith(new URL(self.registration.scope).pathname))return;e.respondWith((async()=>{let c=await caches.open(CACHE);if(e.request.mode==='navigate'){let shell=await c.match('./index.html');if(shell)return shell;return fetch(e.request)}let cached=await c.match(e.request);if(cached)return cached;return fetch(e.request)})())});
