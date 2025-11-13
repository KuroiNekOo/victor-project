// Client API pour communiquer avec le backend Express
const API_BASE_URL = '/api';

// Helper function pour gérer les erreurs des requêtes
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'An error occurred' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  // Pour les réponses 204 (No Content), ne pas essayer de parser le JSON
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// API Mock - Remplace mockAPI de mockData.js avec de vrais appels fetch
const mockAPI = {
  // ============================================
  // SPECIES
  // ============================================
  async getSpecies() {
    const response = await fetch(`${API_BASE_URL}/species`);
    return handleResponse(response);
  },

  async getSpeciesById(id) {
    const response = await fetch(`${API_BASE_URL}/species/${id}`);
    return handleResponse(response);
  },

  async createSpecies(data) {
    const response = await fetch(`${API_BASE_URL}/species`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  async updateSpecies(id, data) {
    const response = await fetch(`${API_BASE_URL}/species/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  async deleteSpecies(id) {
    const response = await fetch(`${API_BASE_URL}/species/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(response);
  },

  // ============================================
  // BIBLIOGRAPHIES
  // ============================================
  async getBibliographiesBySpecies(speciesId) {
    const response = await fetch(`${API_BASE_URL}/bibliographies/species/${speciesId}`);
    return handleResponse(response);
  },

  async getBibliographyById(id) {
    const response = await fetch(`${API_BASE_URL}/bibliographies/${id}`);
    return handleResponse(response);
  },

  async createBibliography(data) {
    const response = await fetch(`${API_BASE_URL}/bibliographies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  async updateBibliography(id, data) {
    const response = await fetch(`${API_BASE_URL}/bibliographies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  async deleteBibliography(id) {
    const response = await fetch(`${API_BASE_URL}/bibliographies/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(response);
  },

  // ============================================
  // NUMBER AGE GROUPS
  // ============================================
  async getNumberAgeGroupsBySpecies(speciesId) {
    const response = await fetch(`${API_BASE_URL}/number-age-groups/species/${speciesId}`);
    return handleResponse(response);
  },

  async getNumberAgeGroupById(id) {
    const response = await fetch(`${API_BASE_URL}/number-age-groups/${id}`);
    return handleResponse(response);
  },

  async createNumberAgeGroup(data) {
    const response = await fetch(`${API_BASE_URL}/number-age-groups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  async updateNumberAgeGroup(id, data) {
    const response = await fetch(`${API_BASE_URL}/number-age-groups/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  async deleteNumberAgeGroup(id) {
    const response = await fetch(`${API_BASE_URL}/number-age-groups/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(response);
  },

  // ============================================
  // AGE GROUPS
  // ============================================
  async getAgeGroupsByNumberAgeGroup(numberAgeGroupId) {
    const response = await fetch(`${API_BASE_URL}/age-groups/number-age-group/${numberAgeGroupId}`);
    return handleResponse(response);
  },

  async getAgeGroupById(id) {
    const response = await fetch(`${API_BASE_URL}/age-groups/${id}`);
    return handleResponse(response);
  },

  async createAgeGroup(data) {
    const response = await fetch(`${API_BASE_URL}/age-groups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  async updateAgeGroup(id, data) {
    const response = await fetch(`${API_BASE_URL}/age-groups/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  async deleteAgeGroup(id) {
    const response = await fetch(`${API_BASE_URL}/age-groups/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(response);
  },

  // ============================================
  // SURVIVAL
  // ============================================
  async getSurvivalsByAgeGroup(ageGroupId) {
    const response = await fetch(`${API_BASE_URL}/survivals/age-group/${ageGroupId}`);
    return handleResponse(response);
  },

  async getSurvivalById(id) {
    const response = await fetch(`${API_BASE_URL}/survivals/${id}`);
    return handleResponse(response);
  },

  async createSurvival(data) {
    const response = await fetch(`${API_BASE_URL}/survivals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  async updateSurvival(id, data) {
    const response = await fetch(`${API_BASE_URL}/survivals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  async deleteSurvival(id) {
    const response = await fetch(`${API_BASE_URL}/survivals/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(response);
  },

  // ============================================
  // FECUNDITY
  // ============================================
  async getFecunditiesByAgeGroup(ageGroupId) {
    const response = await fetch(`${API_BASE_URL}/fecundities/age-group/${ageGroupId}`);
    return handleResponse(response);
  },

  async getFecundityById(id) {
    const response = await fetch(`${API_BASE_URL}/fecundities/${id}`);
    return handleResponse(response);
  },

  async createFecundity(data) {
    const response = await fetch(`${API_BASE_URL}/fecundities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  async updateFecundity(id, data) {
    const response = await fetch(`${API_BASE_URL}/fecundities/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  async deleteFecundity(id) {
    const response = await fetch(`${API_BASE_URL}/fecundities/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(response);
  },

  // ============================================
  // DISPERSAL DISTANCE
  // ============================================
  async getDispersalBySpecies(speciesId) {
    try {
      const response = await fetch(`${API_BASE_URL}/dispersals/species/${speciesId}`);
      if (response.status === 404) {
        return null;
      }
      return handleResponse(response);
    } catch (error) {
      if (error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  },

  async createDispersal(data) {
    const response = await fetch(`${API_BASE_URL}/dispersals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  async updateDispersal(id, data) {
    const response = await fetch(`${API_BASE_URL}/dispersals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  async deleteDispersal(id) {
    const response = await fetch(`${API_BASE_URL}/dispersals/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(response);
  }
};
