export const rateLimitConfig = {
    // 15 minutes
    windowMs: 15 * 60 * 1000,
    // Limitez chaque adresse IP à 100 requêtes par fenêtre (ici, par période de 15 minutes).
    max: 100,
};
