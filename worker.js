// worker.js
export default {
    async fetch(request, env) {
      if (request.method === 'POST' && request.url.endsWith('/api/messages')) {
        const { message } = await request.json();
        const timestamp = Date.now();
        await env.MESSAGES_KV.put(`message:${timestamp}`, message);
        return new Response('Message stored', { status: 200 });
      }
      
      if (request.method === 'GET' && request.url.endsWith('/api/messages')) {
        const messages = [];
        const list = await env.MESSAGES_KV.list({ prefix: 'message:' });
        
        for (const key of list.keys) {
          const message = await env.MESSAGES_KV.get(key.name);
          messages.push(message);
        }
        
        return new Response(JSON.stringify(messages), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Handle your existing static content
      return env.ASSETS.fetch(request);
    }
  };