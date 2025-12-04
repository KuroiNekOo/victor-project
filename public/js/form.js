// État global du formulaire
const formState = {
  selectedSpeciesId: null,
  selectedBibliographyId: null,
  selectedAgeGroupId: null,
  currentAction: null, // 'create' ou 'edit'
  editingId: null
};

// ============================================
// INITIALISATION
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
  await loadSpecies();
  setupEventListeners();
});

// ============================================
// CHARGEMENT DES DONNÉES
// ============================================

async function loadSpecies() {
  const species = await mockAPI.getSpecies();
  const select = document.getElementById('speciesSelect');

  select.innerHTML = '<option value="">-- Choisir une espèce --</option>';
  species.forEach(s => {
    const option = document.createElement('option');
    option.value = s.id;
    option.textContent = `${s.speciesFr || s.speciesLat} (${s.speciesLat})`;
    select.appendChild(option);
  });
}

async function loadSpeciesForBibliography() {
  const species = await mockAPI.getSpecies();
  const select = document.getElementById('bibliographySpeciesSelect');

  select.innerHTML = '';
  species.forEach(s => {
    const option = document.createElement('option');
    option.value = s.id;
    option.textContent = `${s.speciesFr || s.speciesLat} (${s.speciesLat})`;
    select.appendChild(option);
  });
}

async function loadBibliographies(speciesId) {
  const bibliographies = await mockAPI.getBibliographiesBySpecies(speciesId);
  const select = document.getElementById('bibliographySelect');

  select.innerHTML = '<option value="">-- Choisir une bibliographie --</option>';
  bibliographies.forEach(b => {
    const option = document.createElement('option');
    option.value = b.id;
    option.textContent = `${b.citation?.substring(0, 80)}...` || 'Sans titre';
    select.appendChild(option);
  });

  // Afficher la carte bibliographie
  document.getElementById('bibliographyCard').style.display = 'block';
}

async function loadAgeGroups(bibliographyId, speciesId) {
  const groups = await mockAPI.getAgeGroupsByBibliographySpecies(bibliographyId, speciesId);
  const select = document.getElementById('ageGroupSelect');

  select.innerHTML = '<option value="">-- Choisir un groupe d\'âge --</option>';
  groups.forEach(g => {
    const option = document.createElement('option');
    option.value = g.id;
    option.textContent = `Groupe ${g.ageGroup} - ${g.consideredAs || 'Non spécifié'}`;
    select.appendChild(option);
  });

  // Afficher la carte ageGroup
  document.getElementById('ageGroupCard').style.display = 'block';
}

async function loadSurvivalData(ageGroupId) {
  const survivals = await mockAPI.getSurvivalsByAgeGroup(ageGroupId);
  const listContainer = document.getElementById('survivalList');

  if (survivals.length === 0) {
    listContainer.innerHTML = '<div class="alert alert-info">Aucune donnée de survie enregistrée</div>';
  } else {
    listContainer.innerHTML = '';
    survivals.forEach(s => {
      const item = document.createElement('div');
      item.className = 'list-group-item d-flex justify-content-between align-items-start';
      item.innerHTML = `
        <div class="flex-grow-1">
          <h6 class="mb-1">Groupe d'âge ${s.ageGroup} - ${s.sex || 'Non spécifié'}</h6>
          <p class="mb-1"><strong>Taux de survie:</strong> ${s.meanSurvivalRate || 'N/A'} (${s.minSurvivalRate || 'N/A'} - ${s.maxSurvivalRate || 'N/A'})</p>
          <p class="mb-0"><small class="text-muted">Longévité moyenne: ${s.meanLongevityYears || 'N/A'} ans</small></p>
        </div>
        <div class="btn-group-vertical btn-group-sm">
          <button class="btn btn-outline-primary" onclick="editSurvival(${s.id})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-outline-danger" onclick="deleteSurvival(${s.id})">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      `;
      listContainer.appendChild(item);
    });
  }

  // Afficher la carte survival
  document.getElementById('survivalCard').style.display = 'block';
}

async function loadFecundityData(ageGroupId) {
  const fecundities = await mockAPI.getFecunditiesByAgeGroup(ageGroupId);
  const listContainer = document.getElementById('fecundityList');

  if (fecundities.length === 0) {
    listContainer.innerHTML = '<div class="alert alert-info">Aucune donnée de fécondité enregistrée</div>';
  } else {
    listContainer.innerHTML = '';
    fecundities.forEach(f => {
      const item = document.createElement('div');
      item.className = 'list-group-item d-flex justify-content-between align-items-start';
      item.innerHTML = `
        <div class="flex-grow-1">
          <h6 class="mb-1">Groupe d'âge ${f.ageGroup}</h6>
          <p class="mb-1"><strong>Taux de fécondité:</strong> ${f.meanFecundityRate || 'N/A'} (${f.minFecundityRate || 'N/A'} - ${f.maxFecundityRate || 'N/A'})</p>
          <p class="mb-0"><small class="text-muted">${f.ageGroupConsideredInPublication || ''}</small></p>
        </div>
        <div class="btn-group-vertical btn-group-sm">
          <button class="btn btn-outline-primary" onclick="editFecundity(${f.id})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-outline-danger" onclick="deleteFecundity(${f.id})">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      `;
      listContainer.appendChild(item);
    });
  }

  // Afficher la carte fecundity
  document.getElementById('fecundityCard').style.display = 'block';
}

async function loadDispersalData(bibliographyId, speciesId) {
  const dispersals = await mockAPI.getDispersalsByBibliographySpecies(bibliographyId, speciesId);
  const infoContainer = document.getElementById('dispersalInfo');

  if (!dispersals || dispersals.length === 0) {
    infoContainer.className = 'alert alert-info';
    infoContainer.innerHTML = 'Aucune donnée de dispersion enregistrée';
  } else {
    infoContainer.className = 'alert alert-success';
    infoContainer.innerHTML = '';
    dispersals.forEach(dispersal => {
      const div = document.createElement('div');
      div.className = 'mb-3';
      div.innerHTML = `
        <h6>Distance de dispersion</h6>
        <p class="mb-1"><strong>Moyenne:</strong> ${dispersal.meanDispersalDistance || 'N/A'} km</p>
        <p class="mb-0"><strong>Min - Max:</strong> ${dispersal.minDispersalDistance || 'N/A'} - ${dispersal.maxDispersalDistance || 'N/A'} km</p>
      `;
      infoContainer.appendChild(div);
    });
  }

  // Afficher la carte dispersal
  document.getElementById('dispersalCard').style.display = 'block';
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
  // Species selection
  document.getElementById('speciesSelect').addEventListener('change', async (e) => {
    formState.selectedSpeciesId = e.target.value;
    document.getElementById('editSpeciesBtn').disabled = !e.target.value;

    if (e.target.value) {
      await loadBibliographies(e.target.value);

      // Reset TOUS les blocs suivants
      // Réinitialiser la sélection de Bibliography à default
      document.getElementById('bibliographySelect').value = '';
      formState.selectedBibliographyId = null;
      document.getElementById('editBibliographyBtn').disabled = true;

      // Cacher et réinitialiser tous les blocs suivants
      document.getElementById('ageGroupCard').style.display = 'none';
      document.getElementById('dispersalCard').style.display = 'none';
      hideDataCards();
      resetAgeGroupSelection();
    } else {
      hideAllCards();
    }
  });

  // Bibliography selection
  document.getElementById('bibliographySelect').addEventListener('change', async (e) => {
    formState.selectedBibliographyId = e.target.value;
    document.getElementById('editBibliographyBtn').disabled = !e.target.value;

    if (e.target.value && formState.selectedSpeciesId) {
      // Charger les blocs AgeGroup et Dispersal avec les nouvelles données
      await loadAgeGroups(e.target.value, formState.selectedSpeciesId);
      await loadDispersalData(e.target.value, formState.selectedSpeciesId);

      // Reset la sélection AgeGroup à default
      document.getElementById('ageGroupSelect').value = '';
      formState.selectedAgeGroupId = null;
      document.getElementById('editAgeGroupBtn').disabled = true;

      // Cacher les blocs Survival et Fecundity car aucun AgeGroup n'est sélectionné
      hideDataCards();
    } else {
      // Si aucune bibliography n'est sélectionnée, cacher tous les blocs suivants
      document.getElementById('ageGroupCard').style.display = 'none';
      document.getElementById('dispersalCard').style.display = 'none';
      hideDataCards();
      resetAgeGroupSelection();
    }
  });

  // AgeGroup selection
  document.getElementById('ageGroupSelect').addEventListener('change', async (e) => {
    formState.selectedAgeGroupId = e.target.value;
    document.getElementById('editAgeGroupBtn').disabled = !e.target.value;

    if (e.target.value) {
      await loadSurvivalData(e.target.value);
      await loadFecundityData(e.target.value);
    } else {
      hideDataCards();
    }
  });

  // Modal Species - stocker l'action au moment de l'ouverture
  document.getElementById('speciesModal').addEventListener('show.bs.modal', (e) => {
    const button = e.relatedTarget;
    formState.currentAction = button ? button.getAttribute('data-action') : 'create';

    document.getElementById('speciesModalTitle').textContent =
      formState.currentAction === 'create' ? 'Créer une espèce' : 'Modifier l\'espèce';

    // Toujours effacer le formulaire d'abord
    clearSpeciesForm();
  });

  // Modal Species - charger les données après affichage
  document.getElementById('speciesModal').addEventListener('shown.bs.modal', async (e) => {
    // Pré-remplir si on est en mode édition avec une espèce sélectionnée
    if (formState.currentAction === 'edit' && formState.selectedSpeciesId) {
      try {
        const species = await mockAPI.getSpeciesById(formState.selectedSpeciesId);
        if (species) {
          fillSpeciesForm(species);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'espèce:', error);
      }
    }
  });

  document.getElementById('saveSpeciesBtn').addEventListener('click', saveSpecies);

  // Modal Bibliography
  document.getElementById('bibliographyModal').addEventListener('show.bs.modal', async (e) => {
    const button = e.relatedTarget;
    const action = button.getAttribute('data-action');
    formState.currentAction = action;

    document.getElementById('bibliographyModalTitle').textContent =
      action === 'create' ? 'Créer une bibliographie' : 'Modifier la bibliographie';

    // Charger toutes les espèces dans le multi-select
    await loadSpeciesForBibliography();

    if (action === 'edit' && formState.selectedBibliographyId) {
      const bib = await mockAPI.getBibliographyById(formState.selectedBibliographyId);
      if (bib) {
        fillBibliographyForm(bib);
      }
    } else {
      clearBibliographyForm();
      // Pré-sélectionner l'espèce courante pour la création
      if (formState.selectedSpeciesId) {
        const select = document.getElementById('bibliographySpeciesSelect');
        const option = select.querySelector(`option[value="${formState.selectedSpeciesId}"]`);
        if (option) {
          option.selected = true;
        }
      }
    }
  });

  document.getElementById('saveBibliographyBtn').addEventListener('click', saveBibliography);

  // Modal AgeGroup
  document.getElementById('ageGroupModal').addEventListener('show.bs.modal', async (e) => {
    const button = e.relatedTarget;
    const action = button.getAttribute('data-action');
    formState.currentAction = action;

    document.getElementById('ageGroupModalTitle').textContent =
      action === 'create' ? 'Créer un groupe d\'âge' : 'Modifier le groupe d\'âge';

    if (action === 'edit' && formState.selectedAgeGroupId) {
      const group = await mockAPI.getAgeGroupById(formState.selectedAgeGroupId);
      if (group) {
        fillAgeGroupForm(group);
      }
    } else {
      clearAgeGroupForm();
    }
  });

  document.getElementById('saveAgeGroupBtn').addEventListener('click', saveAgeGroup);

  // Modal Survival
  document.getElementById('survivalModal').addEventListener('show.bs.modal', async (e) => {
    const button = e.relatedTarget;
    const action = button.getAttribute('data-action');
    formState.currentAction = action;

    if (action === 'create') {
      clearSurvivalForm();

      // Pré-remplir avec les données de l'AgeGroup sélectionné (bloc 4)
      if (formState.selectedAgeGroupId) {
        const ageGroup = await mockAPI.getAgeGroupById(formState.selectedAgeGroupId);
        if (ageGroup) {
          document.getElementById('survivalAgeGroup').value = ageGroup.ageGroup || '';
          document.getElementById('survivalAgeGroup').readOnly = true; // En lecture seule

          document.getElementById('ageGroupConsideredSurvival').value = ageGroup.consideredAs || '';
          document.getElementById('ageGroupConsideredSurvival').readOnly = true; // En lecture seule
        }
      }
    } else {
      // En mode édition, permettre la modification
      document.getElementById('survivalAgeGroup').readOnly = false;
      document.getElementById('ageGroupConsideredSurvival').readOnly = false;
    }
  });

  document.getElementById('saveSurvivalBtn').addEventListener('click', saveSurvival);

  // Modal Fecundity
  document.getElementById('fecundityModal').addEventListener('show.bs.modal', async (e) => {
    const button = e.relatedTarget;
    const action = button.getAttribute('data-action');
    formState.currentAction = action;

    if (action === 'create') {
      clearFecundityForm();

      // Pré-remplir avec les données de l'AgeGroup sélectionné (bloc 4)
      if (formState.selectedAgeGroupId) {
        const ageGroup = await mockAPI.getAgeGroupById(formState.selectedAgeGroupId);
        if (ageGroup) {
          document.getElementById('fecundityAgeGroup').value = ageGroup.ageGroup || '';
          document.getElementById('fecundityAgeGroup').readOnly = true; // En lecture seule

          document.getElementById('ageGroupConsideredFecundity').value = ageGroup.consideredAs || '';
          document.getElementById('ageGroupConsideredFecundity').readOnly = true; // En lecture seule
        }
      }
    } else {
      // En mode édition, permettre la modification
      document.getElementById('fecundityAgeGroup').readOnly = false;
      document.getElementById('ageGroupConsideredFecundity').readOnly = false;
    }
  });

  document.getElementById('saveFecundityBtn').addEventListener('click', saveFecundity);

  // Modal Dispersal
  document.getElementById('dispersalModal').addEventListener('show.bs.modal', async () => {
    if (formState.selectedBibliographyId && formState.selectedSpeciesId) {
      const dispersals = await mockAPI.getDispersalsByBibliographySpecies(formState.selectedBibliographyId, formState.selectedSpeciesId);
      if (dispersals && dispersals.length > 0) {
        // Prendre le premier dispersal (ou gérer plusieurs si nécessaire)
        fillDispersalForm(dispersals[0]);
        formState.editingId = dispersals[0].id;
      } else {
        clearDispersalForm();
        formState.editingId = null;
      }
    }
  });

  document.getElementById('saveDispersalBtn').addEventListener('click', saveDispersal);

  // Form submission
  document.getElementById('demographicForm').addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
  });
}

// ============================================
// SAVE FUNCTIONS
// ============================================

// Validation snake_case
function isValidSnakeCase(value) {
  if (!value) return true; // Champs optionnels
  return /^[a-z]+(_[a-z]+)*$/.test(value);
}

async function saveSpecies() {
  const speciesFr = document.getElementById('speciesFr').value || null;
  const speciesLat = document.getElementById('speciesLat').value;
  const speciesEn = document.getElementById('speciesEn').value || null;

  // Validation snake_case
  if (speciesFr && !isValidSnakeCase(speciesFr)) {
    alert('Le nom français doit être en snake_case (ex: pipistrelle_commune)');
    return;
  }
  if (speciesLat && !isValidSnakeCase(speciesLat)) {
    alert('Le nom latin doit être en snake_case (ex: pipistrellus_pipistrellus)');
    return;
  }
  if (speciesEn && !isValidSnakeCase(speciesEn)) {
    alert('Le nom anglais doit être en snake_case (ex: common_pipistrelle)');
    return;
  }

  const data = {
    speciesFr: speciesFr,
    speciesLat: speciesLat,
    speciesEn: speciesEn,
    family: document.getElementById('family').value || null,
    genus: document.getElementById('genus').value || null,
    inFrance: document.getElementById('inFrance').checked,
    inEurope: document.getElementById('inEurope').checked
  };

  if (!data.speciesLat) {
    alert('Le nom latin est obligatoire');
    return;
  }

  let result;
  if (formState.currentAction === 'create') {
    result = await mockAPI.createSpecies(data);
  } else {
    result = await mockAPI.updateSpecies(formState.selectedSpeciesId, data);
  }

  // Fermer la modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('speciesModal'));
  modal.hide();

  // Recharger la liste et sélectionner l'espèce
  await loadSpecies();
  document.getElementById('speciesSelect').value = result.id;
  formState.selectedSpeciesId = result.id;
  document.getElementById('editSpeciesBtn').disabled = false;

  // Charger les bibliographies (que ce soit création ou modification)
  await loadBibliographies(result.id);

  // Reset les blocs suivants
  document.getElementById('bibliographySelect').value = '';
  formState.selectedBibliographyId = null;
  document.getElementById('editBibliographyBtn').disabled = true;
  document.getElementById('numberAgeGroupCard').style.display = 'none';
  document.getElementById('ageGroupCard').style.display = 'none';
  document.getElementById('dispersalCard').style.display = 'none';
  hideDataCards();
  resetNumberAgeGroupSelection();
  resetAgeGroupSelection();
}

async function saveBibliography() {
  // Récupérer les espèces sélectionnées
  const speciesSelect = document.getElementById('bibliographySpeciesSelect');
  const selectedOptions = Array.from(speciesSelect.selectedOptions);
  const speciesIds = selectedOptions.map(option => parseInt(option.value));

  if (speciesIds.length === 0) {
    alert('Veuillez sélectionner au moins une espèce');
    return;
  }

  const data = {
    speciesIds: speciesIds,
    citation: document.getElementById('citation').value || null,
    reference: document.getElementById('reference').value || null,
    publicationDate: document.getElementById('publicationDate').value || null,
    country: document.getElementById('country').value || null,
    region: document.getElementById('region').value || null,
    studyDuration: document.getElementById('studyDuration').value || null,
    datesOfTheStudy: document.getElementById('datesOfTheStudy').value || null,
    season: document.getElementById('season').value || null,
    sampleSize: parseFloat(document.getElementById('sampleSize').value) || null,
    numberMalesSampled: parseFloat(document.getElementById('numberMalesSampled').value) || null,
    numberFemalesSampled: parseFloat(document.getElementById('numberFemalesSampled').value) || null,
    areaSizeHa: parseFloat(document.getElementById('areaSizeHa').value) || null,
    methodologyUsed: document.getElementById('methodologyUsed').value || null,
    modelUsed: document.getElementById('modelUsed').value || null,
    captureMethod: document.getElementById('captureMethod').value || null,
    markingMethod: document.getElementById('markingMethod').value || null,
    captureFrequency: document.getElementById('captureFrequency').value || null,
    meanRecaptureProbability: parseFloat(document.getElementById('meanRecaptureProbability').value) || null,
    sdMeanRecaptureProbability: parseFloat(document.getElementById('sdMeanRecaptureProbability').value) || null,
    biasesAndProblems: document.getElementById('biasesAndProblems').value || null,
    otherNote: document.getElementById('otherNote').value || null,
    reliability: document.getElementById('reliability').value || null
  };

  let result;
  if (formState.currentAction === 'create') {
    result = await mockAPI.createBibliography(data);
  } else {
    result = await mockAPI.updateBibliography(formState.selectedBibliographyId, data);
  }

  const modal = bootstrap.Modal.getInstance(document.getElementById('bibliographyModal'));
  modal.hide();

  await loadBibliographies(formState.selectedSpeciesId);

  // Vérifier si la bibliography modifiée est toujours liée à l'espèce courante
  const bibliographySelect = document.getElementById('bibliographySelect');
  const stillInList = Array.from(bibliographySelect.options).some(option => option.value === result.id.toString());

  if (stillInList) {
    // La bibliography est toujours liée : la sélectionner
    bibliographySelect.value = result.id;
    formState.selectedBibliographyId = result.id;
    document.getElementById('editBibliographyBtn').disabled = false;

    // Charger automatiquement les blocs suivants
    await loadAgeGroups(result.id, formState.selectedSpeciesId);
    await loadDispersalData(result.id, formState.selectedSpeciesId);

    // Reset la sélection AgeGroup à default
    document.getElementById('ageGroupSelect').value = '';
    formState.selectedAgeGroupId = null;
    document.getElementById('editAgeGroupBtn').disabled = true;

    // Cacher les blocs Survival et Fecundity car aucun AgeGroup n'est sélectionné
    hideDataCards();
  } else {
    // La bibliography n'est plus liée à l'espèce courante : réinitialiser tout
    bibliographySelect.value = '';
    formState.selectedBibliographyId = null;
    document.getElementById('editBibliographyBtn').disabled = true;

    // Cacher tous les blocs suivants
    document.getElementById('ageGroupCard').style.display = 'none';
    document.getElementById('dispersalCard').style.display = 'none';
    hideDataCards();

    // Réinitialiser les états
    resetAgeGroupSelection();
  }
}

async function saveAgeGroup() {
  // Récupérer le bibliographySpeciesId
  const bibliographySpeciesId = await mockAPI.getBibliographySpeciesId(
    formState.selectedBibliographyId,
    formState.selectedSpeciesId
  );

  if (!bibliographySpeciesId) {
    alert('Erreur: impossible de trouver la relation Bibliography-Species');
    return;
  }

  const data = {
    bibliographySpeciesId: parseInt(bibliographySpeciesId),
    ageGroup: parseInt(document.getElementById('ageGroup').value) || null,
    consideredAs: document.getElementById('consideredAs').value || null
  };

  let result;
  if (formState.currentAction === 'create') {
    result = await mockAPI.createAgeGroup(data);
  } else {
    result = await mockAPI.updateAgeGroup(formState.selectedAgeGroupId, data);
  }

  const modal = bootstrap.Modal.getInstance(document.getElementById('ageGroupModal'));
  modal.hide();

  await loadAgeGroups(formState.selectedBibliographyId, formState.selectedSpeciesId);
  document.getElementById('ageGroupSelect').value = result.id;
  formState.selectedAgeGroupId = result.id;
  document.getElementById('editAgeGroupBtn').disabled = false;

  // Charger les blocs suivants (Survival et Fecundity) automatiquement
  await loadSurvivalData(result.id);
  await loadFecundityData(result.id);
}

async function saveSurvival() {
  const data = {
    ageGroupId: parseInt(formState.selectedAgeGroupId),
    ageGroup: parseInt(document.getElementById('survivalAgeGroup').value) || null,
    ageGroupConsideredInPublication: document.getElementById('ageGroupConsideredSurvival').value || null,
    sex: document.getElementById('sex').value || null,
    minSurvivalRate: parseFloat(document.getElementById('minSurvivalRate').value) || null,
    meanSurvivalRate: parseFloat(document.getElementById('meanSurvivalRate').value) || null,
    maxSurvivalRate: parseFloat(document.getElementById('maxSurvivalRate').value) || null,
    recaptureProbability: parseFloat(document.getElementById('recaptureProbability').value) || null,
    minLongevityYears: parseFloat(document.getElementById('minLongevityYears').value) || null,
    meanLongevityYears: parseFloat(document.getElementById('meanLongevityYears').value) || null,
    maxLongevityYears: parseFloat(document.getElementById('maxLongevityYears').value) || null,
    se: parseFloat(document.getElementById('survivalSE').value) || null,
    lowCI: parseFloat(document.getElementById('survivalLowCI').value) || null,
    highCI: parseFloat(document.getElementById('survivalHighCI').value) || null
  };

  if (formState.currentAction === 'create') {
    await mockAPI.createSurvival(data);
  } else if (formState.editingId) {
    await mockAPI.updateSurvival(formState.editingId, data);
  }

  const modal = bootstrap.Modal.getInstance(document.getElementById('survivalModal'));
  modal.hide();

  await loadSurvivalData(formState.selectedAgeGroupId);
}

async function saveFecundity() {
  const data = {
    ageGroupId: parseInt(formState.selectedAgeGroupId),
    ageGroup: parseInt(document.getElementById('fecundityAgeGroup').value) || null,
    ageGroupConsideredInPublication: document.getElementById('ageGroupConsideredFecundity').value || null,
    minFecundityRate: parseFloat(document.getElementById('minFecundityRate').value) || null,
    meanFecundityRate: parseFloat(document.getElementById('meanFecundityRate').value) || null,
    maxFecundityRate: parseFloat(document.getElementById('maxFecundityRate').value) || null,
    minProductivity: parseFloat(document.getElementById('minProductivity').value) || null,
    meanProductivity: parseFloat(document.getElementById('meanProductivity').value) || null,
    maxProductivity: parseFloat(document.getElementById('maxProductivity').value) || null,
    se: parseFloat(document.getElementById('fecunditySE').value) || null,
    lowCI: parseFloat(document.getElementById('fecundityLowCI').value) || null,
    highCI: parseFloat(document.getElementById('fecundityHighCI').value) || null
  };

  if (formState.currentAction === 'create') {
    await mockAPI.createFecundity(data);
  } else if (formState.editingId) {
    await mockAPI.updateFecundity(formState.editingId, data);
  }

  const modal = bootstrap.Modal.getInstance(document.getElementById('fecundityModal'));
  modal.hide();

  await loadFecundityData(formState.selectedAgeGroupId);
}

async function saveDispersal() {
  const getValue = (id) => {
    const val = document.getElementById(id).value;
    return val === '' ? null : parseFloat(val);
  };

  // Récupérer le bibliographySpeciesId
  const bibliographySpeciesId = await mockAPI.getBibliographySpeciesId(
    formState.selectedBibliographyId,
    formState.selectedSpeciesId
  );

  if (!bibliographySpeciesId) {
    alert('Erreur: impossible de trouver la relation Bibliography-Species');
    return;
  }

  const data = {
    bibliographySpeciesId: parseInt(bibliographySpeciesId),
    meanDispersalDistance: getValue('meanDispersalDistance'),
    minDispersalDistance: getValue('minDispersalDistance'),
    maxDispersalDistance: getValue('maxDispersalDistance'),
    se: getValue('dispersalSE'),
    lowCI: getValue('dispersalLowCI'),
    highCI: getValue('dispersalHighCI')
  };

  if (formState.editingId) {
    await mockAPI.updateDispersal(formState.editingId, data);
  } else {
    await mockAPI.createDispersal(data);
  }

  const modal = bootstrap.Modal.getInstance(document.getElementById('dispersalModal'));
  modal.hide();

  await loadDispersalData(formState.selectedBibliographyId, formState.selectedSpeciesId);
}

// ============================================
// EDIT FUNCTIONS
// ============================================

async function editSurvival(id) {
  formState.currentAction = 'edit';
  formState.editingId = id;

  const survival = await mockAPI.getSurvivalById(id);
  if (survival) {
    fillSurvivalForm(survival);
    const modal = new bootstrap.Modal(document.getElementById('survivalModal'));
    modal.show();
  }
}

async function editFecundity(id) {
  formState.currentAction = 'edit';
  formState.editingId = id;

  const fecundity = await mockAPI.getFecundityById(id);
  if (fecundity) {
    fillFecundityForm(fecundity);
    const modal = new bootstrap.Modal(document.getElementById('fecundityModal'));
    modal.show();
  }
}

async function editDispersal(id) {
  formState.editingId = id;
  const dispersal = await mockAPI.getDispersalBySpecies(formState.selectedSpeciesId);
  if (dispersal) {
    fillDispersalForm(dispersal);
    const modal = new bootstrap.Modal(document.getElementById('dispersalModal'));
    modal.show();
  }
}

// ============================================
// DELETE FUNCTIONS
// ============================================

async function deleteSurvival(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette donnée de survie ?')) {
    await mockAPI.deleteSurvival(id);
    await loadSurvivalData(formState.selectedAgeGroupId);
  }
}

async function deleteFecundity(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette donnée de fécondité ?')) {
    await mockAPI.deleteFecundity(id);
    await loadFecundityData(formState.selectedAgeGroupId);
  }
}

// ============================================
// FORM FILLING FUNCTIONS
// ============================================

function fillSpeciesForm(species) {
  document.getElementById('speciesId').value = species.id;
  document.getElementById('speciesFr').value = species.speciesFr || '';
  document.getElementById('speciesLat').value = species.speciesLat || '';
  document.getElementById('speciesEn').value = species.speciesEn || '';
  document.getElementById('family').value = species.family || '';
  document.getElementById('genus').value = species.genus || '';
  document.getElementById('inFrance').checked = species.inFrance || false;
  document.getElementById('inEurope').checked = species.inEurope || false;
}

function fillBibliographyForm(bib) {
  document.getElementById('bibliographyId').value = bib.id;
  document.getElementById('citation').value = bib.citation || '';
  document.getElementById('reference').value = bib.reference || '';
  document.getElementById('publicationDate').value = bib.publicationDate || '';
  document.getElementById('country').value = bib.country || '';
  document.getElementById('region').value = bib.region || '';
  document.getElementById('studyDuration').value = bib.studyDuration || '';
  document.getElementById('datesOfTheStudy').value = bib.datesOfTheStudy || '';
  document.getElementById('season').value = bib.season || '';
  document.getElementById('sampleSize').value = bib.sampleSize || '';
  document.getElementById('numberMalesSampled').value = bib.numberMalesSampled || '';
  document.getElementById('numberFemalesSampled').value = bib.numberFemalesSampled || '';
  document.getElementById('areaSizeHa').value = bib.areaSizeHa || '';
  document.getElementById('methodologyUsed').value = bib.methodologyUsed || '';
  document.getElementById('modelUsed').value = bib.modelUsed || '';
  document.getElementById('captureMethod').value = bib.captureMethod || '';
  document.getElementById('markingMethod').value = bib.markingMethod || '';
  document.getElementById('captureFrequency').value = bib.captureFrequency || '';
  document.getElementById('meanRecaptureProbability').value = bib.meanRecaptureProbability || '';
  document.getElementById('sdMeanRecaptureProbability').value = bib.sdMeanRecaptureProbability || '';
  document.getElementById('biasesAndProblems').value = bib.biasesAndProblems || '';
  document.getElementById('otherNote').value = bib.otherNote || '';
  document.getElementById('reliability').value = bib.reliability || '';

  // Pré-sélectionner les espèces liées
  const speciesSelect = document.getElementById('bibliographySpeciesSelect');
  if (bib.species && Array.isArray(bib.species)) {
    const speciesIds = bib.species.map(s => s.speciesId.toString());
    Array.from(speciesSelect.options).forEach(option => {
      option.selected = speciesIds.includes(option.value);
    });
  }
}

function fillAgeGroupForm(group) {
  document.getElementById('ageGroupId').value = group.id;
  document.getElementById('ageGroup').value = group.ageGroup || '';
  document.getElementById('consideredAs').value = group.consideredAs || '';
}

function fillSurvivalForm(survival) {
  document.getElementById('survivalId').value = survival.id;
  document.getElementById('survivalAgeGroup').value = survival.ageGroup || '';
  document.getElementById('ageGroupConsideredSurvival').value = survival.ageGroupConsideredInPublication || '';
  document.getElementById('sex').value = survival.sex || '';
  document.getElementById('minSurvivalRate').value = survival.minSurvivalRate || '';
  document.getElementById('meanSurvivalRate').value = survival.meanSurvivalRate || '';
  document.getElementById('maxSurvivalRate').value = survival.maxSurvivalRate || '';
  document.getElementById('recaptureProbability').value = survival.recaptureProbability || '';
  document.getElementById('minLongevityYears').value = survival.minLongevityYears || '';
  document.getElementById('meanLongevityYears').value = survival.meanLongevityYears || '';
  document.getElementById('maxLongevityYears').value = survival.maxLongevityYears || '';
  document.getElementById('survivalSE').value = survival.se || '';
  document.getElementById('survivalLowCI').value = survival.lowCI || '';
  document.getElementById('survivalHighCI').value = survival.highCI || '';
}

function fillFecundityForm(fecundity) {
  document.getElementById('fecundityId').value = fecundity.id;
  document.getElementById('fecundityAgeGroup').value = fecundity.ageGroup || '';
  document.getElementById('ageGroupConsideredFecundity').value = fecundity.ageGroupConsideredInPublication || '';
  document.getElementById('minFecundityRate').value = fecundity.minFecundityRate || '';
  document.getElementById('meanFecundityRate').value = fecundity.meanFecundityRate || '';
  document.getElementById('maxFecundityRate').value = fecundity.maxFecundityRate || '';
  document.getElementById('minProductivity').value = fecundity.minProductivity || '';
  document.getElementById('meanProductivity').value = fecundity.meanProductivity || '';
  document.getElementById('maxProductivity').value = fecundity.maxProductivity || '';
  document.getElementById('fecunditySE').value = fecundity.se || '';
  document.getElementById('fecundityLowCI').value = fecundity.lowCI || '';
  document.getElementById('fecundityHighCI').value = fecundity.highCI || '';
}

function fillDispersalForm(dispersal) {
  document.getElementById('dispersalId').value = dispersal.id;
  document.getElementById('meanDispersalDistance').value = dispersal.meanDispersalDistance || '';
  document.getElementById('minDispersalDistance').value = dispersal.minDispersalDistance || '';
  document.getElementById('maxDispersalDistance').value = dispersal.maxDispersalDistance || '';
  document.getElementById('dispersalSE').value = dispersal.se || '';
  document.getElementById('dispersalLowCI').value = dispersal.lowCI || '';
  document.getElementById('dispersalHighCI').value = dispersal.highCI || '';
}

// ============================================
// FORM CLEARING FUNCTIONS
// ============================================

function clearSpeciesForm() {
  document.getElementById('speciesForm').reset();
  document.getElementById('speciesId').value = '';
}

function clearBibliographyForm() {
  document.getElementById('bibliographyForm').reset();
  document.getElementById('bibliographyId').value = '';
}

function clearAgeGroupForm() {
  document.getElementById('ageGroupForm').reset();
  document.getElementById('ageGroupId').value = '';
}

function clearSurvivalForm() {
  document.getElementById('survivalForm').reset();
  document.getElementById('survivalId').value = '';
}

function clearFecundityForm() {
  document.getElementById('fecundityForm').reset();
  document.getElementById('fecundityId').value = '';
}

function clearDispersalForm() {
  document.getElementById('dispersalForm').reset();
  document.getElementById('dispersalId').value = '';
}

// ============================================
// RESET & HIDE FUNCTIONS
// ============================================

function resetBibliographySelection() {
  document.getElementById('bibliographySelect').value = '';
  formState.selectedBibliographyId = null;
  document.getElementById('editBibliographyBtn').disabled = true;
}

function resetAgeGroupSelection() {
  document.getElementById('ageGroupSelect').value = '';
  formState.selectedAgeGroupId = null;
  document.getElementById('editAgeGroupBtn').disabled = true;
  hideDataCards();
}

function hideAllCards() {
  document.getElementById('bibliographyCard').style.display = 'none';
  document.getElementById('ageGroupCard').style.display = 'none';
  document.getElementById('dispersalCard').style.display = 'none';
  hideDataCards();
}

function hideDataCards() {
  document.getElementById('survivalCard').style.display = 'none';
  document.getElementById('fecundityCard').style.display = 'none';
}

// ============================================
// FORM SUBMISSION
// ============================================

function submitForm() {
  console.log('Form submitted with state:', formState);
  alert('Formulaire soumis avec succès ! (voir console pour les détails)');
  // Ici vous pourrez implémenter la logique d'envoi vers l'API réelle
}
