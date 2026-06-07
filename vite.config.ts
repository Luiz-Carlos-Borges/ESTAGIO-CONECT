import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Em desenvolvimento, redireciona requisições para o backend local
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
        ws: true,  // Suporte WebSocket
        // Tratamento de erros de conexão
        onError: (err, req, res) => {
          res.writeHead(502, {
            'Content-Type': 'application/json',
          });
          res.end(JSON.stringify({
            error: 'Erro ao conectar com o servidor backend em http://localhost:4000. Certifique-se de que está rodando com: npm run backend',
          }));
        },
      },
    },
  },
});
