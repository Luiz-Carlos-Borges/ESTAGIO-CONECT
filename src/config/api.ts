// Configuração centralizada para URL da API
// Use a variável de ambiente VITE_API_URL em produção
// Exemplo: VITE_API_URL=https://seu-servidor.com npm run build

const getApiUrl = (): string => {
  // 1. Verificar variável de ambiente do Vite
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    return envUrl;
  }

  // 2. Em desenvolvimento, usar o proxy do Vite
  if (import.meta.env.DEV) {
    return '';  // URLs relativas funcionam com proxy do Vite
  }

  // 3. Em produção sem variável de ambiente, tentar localhost:4000
  // (útil para deploy local)
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  
  // Se estiver em localhost, tentar porta 4000
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `${protocol}//localhost:4000`;
  }

  // Fallback: usar a mesma origem (útil quando backend está no mesmo servidor)
  return window.location.origin;
};

export const API_URL = getApiUrl();

/**
 * Função auxiliar para fazer requisições à API com tratamento de erros melhorado
 */
export async function apiCall<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T; error: string | null }> {
  const url = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        data: null as any,
        error: data.error || `Erro ${response.status}: ${response.statusText}`,
      };
    }

    return { data, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error(`[API Error] ${endpoint}:`, errorMessage);
    
    return {
      data: null as any,
      error: `Erro ao conectar com o servidor: ${errorMessage}. Certifique-se de que o backend está rodando em ${API_URL}`,
    };
  }
}
