import api from './api'

export const getStatsByCategory = () => api.get('/stats/by-category')
export const getMonthlyStats = () => api.get('/stats/monthly')