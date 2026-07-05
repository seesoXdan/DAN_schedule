/* 사용 안 함 — 예전 서비스워커가 남아있으면 스스로 제거하고 캐시를 비웁니다.
   (앱이 더 이상 이 파일을 등록하지 않습니다) */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', async () => {
  try {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll();
    clients.forEach(c => c.navigate(c.url));
  } catch (e) {}
});
