import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    // Em desenvolvimento, redireciona requisições para o backend local
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4000',
        changeOrigin: true,
        secure: false,
        ws: true,  // Suporte WebSocket
        // Tratamento de erros de conexão
        onError: (err, req, res) => {
          res.writeHead(502, {
            'Content-Type': 'application/json',
          });
          res.end(JSON.stringify({
            error: 'Erro ao conectar com o servidor backend em http://127.0.0.1:4000. Certifique-se de que está rodando com: npm run backend',
          }));
        },
      },
    },
  },
});
