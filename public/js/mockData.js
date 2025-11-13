// Mock Data - Simule une base de données en mémoire
const mockDB = {
  species: [
    {
      id: 1,
      speciesFr: "Crapaud commun",
      speciesLat: "Bufo bufo",
      speciesEn: "Common toad",
      family: "Bufonidae",
      genus: "Bufo",
      inFrance: true,
      inEurope: true
    },
    {
      id: 2,
      speciesFr: "Grenouille rousse",
      speciesLat: "Rana temporaria",
      speciesEn: "Common frog",
      family: "Ranidae",
      genus: "Rana",
      inFrance: true,
      inEurope: true
    },
    {
      id: 3,
      speciesFr: "Triton palmé",
      speciesLat: "Lissotriton helveticus",
      speciesEn: "Palmate newt",
      family: "Salamandridae",
      genus: "Lissotriton",
      inFrance: true,
      inEurope: true
    }
  ],

  bibliographies: [
    {
      id: 1,
      speciesId: 1,
      citation: "Hemelaar, A. (1988). Age, growth and other population characteristics of Bufo bufo from different latitudes and altitudes.",
      reference: "Journal of Herpetology, 22(4), 369-388",
      publicationDate: "1988",
      country: "Netherlands",
      region: "Various",
      studyDuration: "5 years",
      datesOfTheStudy: "1980-1985",
      season: "Spring-Summer",
      sampleSize: 450,
      numberMalesSampled: 220,
      numberFemalesSampled: 230,
      areaSizeHa: 25.5,
      methodologyUsed: "Capture-Mark-Recapture",
      modelUsed: "Cormack-Jolly-Seber",
      captureMethod: "Pit traps and hand capture",
      markingMethod: "PIT tags",
      captureFrequency: "Weekly during breeding season",
      meanRecaptureProbability: 0.65,
      sdMeanRecaptureProbability: 0.08,
      biasesAndProblems: "Some emigration observed",
      otherNote: "High quality study",
      reliability: "High"
    },
    {
      id: 2,
      speciesId: 1,
      citation: "Reading, C.J. (2007). Linking global warming to amphibian declines through its effects on female body condition and survivorship.",
      reference: "Oecologia, 151(1), 125-131",
      publicationDate: "2007",
      country: "United Kingdom",
      region: "Dorset",
      studyDuration: "18 years",
      datesOfTheStudy: "1985-2003",
      season: "All year",
      sampleSize: 1200,
      numberMalesSampled: 580,
      numberFemalesSampled: 620,
      areaSizeHa: 15.0,
      methodologyUsed: "Long-term CMR",
      modelUsed: "Jolly-Seber with covariates",
      captureMethod: "Drift fences and pitfall traps",
      markingMethod: "Individual toe-clipping (early years) then PIT tags",
      captureFrequency: "Daily during breeding, weekly otherwise",
      meanRecaptureProbability: 0.72,
      sdMeanRecaptureProbability: 0.05,
      biasesAndProblems: "Marking method changed during study",
      otherNote: "Very comprehensive long-term study",
      reliability: "Very High"
    },
    {
      id: 3,
      speciesId: 2,
      citation: "Gibbons, M.M. & McCarthy, T.K. (1986). The reproductive output of frogs Rana temporaria (L.) with particular reference to body size and age.",
      reference: "Journal of Zoology, 209(4), 579-593",
      publicationDate: "1986",
      country: "Ireland",
      region: "Galway",
      studyDuration: "3 years",
      datesOfTheStudy: "1982-1985",
      season: "Spring",
      sampleSize: 320,
      numberMalesSampled: 160,
      numberFemalesSampled: 160,
      areaSizeHa: 8.5,
      methodologyUsed: "CMR with reproductive output measurement",
      modelUsed: "Linear regression models",
      captureMethod: "Hand capture at breeding ponds",
      markingMethod: "Toe-clipping",
      captureFrequency: "3-4 times per breeding season",
      meanRecaptureProbability: 0.58,
      sdMeanRecaptureProbability: 0.12,
      biasesAndProblems: "Limited to breeding season observations",
      otherNote: "Focus on fecundity",
      reliability: "Medium"
    }
  ],

  numberAgeGroups: [
    { id: 1, numberOfAgeGroups: 3, speciesId: 1 },
    { id: 2, numberOfAgeGroups: 4, speciesId: 1 },
    { id: 3, numberOfAgeGroups: 2, speciesId: 2 }
  ],

  ageGroups: [
    { id: 1, ageGroup: 0, consideredAs: "Juvenile (0-1 year)", numberAgeGroupId: 1 },
    { id: 2, ageGroup: 1, consideredAs: "Sub-adult (1-2 years)", numberAgeGroupId: 1 },
    { id: 3, ageGroup: 2, consideredAs: "Adult (2+ years)", numberAgeGroupId: 1 },
    { id: 4, ageGroup: 0, consideredAs: "Juvenile", numberAgeGroupId: 2 },
    { id: 5, ageGroup: 1, consideredAs: "Young adult", numberAgeGroupId: 2 },
    { id: 6, ageGroup: 2, consideredAs: "Mature adult", numberAgeGroupId: 2 },
    { id: 7, ageGroup: 3, consideredAs: "Old adult", numberAgeGroupId: 2 }
  ],

  survivals: [
    {
      id: 1,
      ageGroupId: 1,
      ageGroup: 0,
      ageGroupConsideredInPublication: "Juveniles",
      sex: "Both",
      minSurvivalRate: 0.15,
      meanSurvivalRate: 0.22,
      maxSurvivalRate: 0.30,
      recaptureProbability: 0.45,
      minLongevityYears: 0.5,
      meanLongevityYears: 1.2,
      maxLongevityYears: 2.0,
      se: 0.03,
      lowCI: 0.18,
      highCI: 0.26
    },
    {
      id: 2,
      ageGroupId: 3,
      ageGroup: 2,
      ageGroupConsideredInPublication: "Adults",
      sex: "Both",
      minSurvivalRate: 0.45,
      meanSurvivalRate: 0.58,
      maxSurvivalRate: 0.68,
      recaptureProbability: 0.72,
      minLongevityYears: 3.0,
      meanLongevityYears: 5.5,
      maxLongevityYears: 8.0,
      se: 0.05,
      lowCI: 0.52,
      highCI: 0.64
    }
  ],

  fecundities: [
    {
      id: 1,
      ageGroupId: 2,
      ageGroup: 1,
      ageGroupConsideredInPublication: "Sub-adults",
      minFecundityRate: 1200,
      meanFecundityRate: 1800,
      maxFecundityRate: 2500,
      se: 150,
      lowCI: 1600,
      highCI: 2000
    },
    {
      id: 2,
      ageGroupId: 3,
      ageGroup: 2,
      ageGroupConsideredInPublication: "Adults",
      minFecundityRate: 2500,
      meanFecundityRate: 3500,
      maxFecundityRate: 5000,
      se: 200,
      lowCI: 3200,
      highCI: 3800
    }
  ],

  dispersalDistances: [
    {
      id: 1,
      speciesId: 1,
      meanDispersalDistance: 850,
      minDispersalDistance: 200,
      maxDispersalDistance: 2500,
      se: 120,
      lowCI: 650,
      highCI: 1050
    },
    {
      id: 2,
      speciesId: 2,
      meanDispersalDistance: 450,
      minDispersalDistance: 100,
      maxDispersalDistance: 1200,
      se: 80,
      lowCI: 350,
      highCI: 550
    }
  ]
};

// Compteurs pour générer de nouveaux IDs
let nextId = {
  species: 4,
  bibliographies: 4,
  numberAgeGroups: 4,
  ageGroups: 8,
  survivals: 3,
  fecundities: 3,
  dispersalDistances: 3
};

// API Mock - Simule des appels fetch
const mockAPI = {
  // Species
  async getSpecies() {
    return new Promise(resolve => {
      setTimeout(() => resolve([...mockDB.species]), 100);
    });
  },

  async getSpeciesById(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        const species = mockDB.species.find(s => s.id === parseInt(id));
        resolve(species || null);
      }, 50);
    });
  },

  async createSpecies(data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const newSpecies = { id: nextId.species++, ...data };
        mockDB.species.push(newSpecies);
        resolve(newSpecies);
      }, 100);
    });
  },

  async updateSpecies(id, data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = mockDB.species.findIndex(s => s.id === parseInt(id));
        if (index !== -1) {
          mockDB.species[index] = { ...mockDB.species[index], ...data };
          resolve(mockDB.species[index]);
        } else {
          resolve(null);
        }
      }, 100);
    });
  },

  // Bibliographies
  async getBibliographiesBySpecies(speciesId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const bibs = mockDB.bibliographies.filter(b => b.speciesId === parseInt(speciesId));
        resolve(bibs);
      }, 100);
    });
  },

  async getBibliographyById(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        const bib = mockDB.bibliographies.find(b => b.id === parseInt(id));
        resolve(bib || null);
      }, 50);
    });
  },

  async createBibliography(data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const newBib = { id: nextId.bibliographies++, ...data };
        mockDB.bibliographies.push(newBib);
        resolve(newBib);
      }, 100);
    });
  },

  async updateBibliography(id, data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = mockDB.bibliographies.findIndex(b => b.id === parseInt(id));
        if (index !== -1) {
          mockDB.bibliographies[index] = { ...mockDB.bibliographies[index], ...data };
          resolve(mockDB.bibliographies[index]);
        } else {
          resolve(null);
        }
      }, 100);
    });
  },

  // NumberAgeGroups
  async getNumberAgeGroupsBySpecies(speciesId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const groups = mockDB.numberAgeGroups.filter(n => n.speciesId === parseInt(speciesId));
        resolve(groups);
      }, 100);
    });
  },

  async getNumberAgeGroupById(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        const group = mockDB.numberAgeGroups.find(n => n.id === parseInt(id));
        resolve(group || null);
      }, 50);
    });
  },

  async createNumberAgeGroup(data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const newGroup = { id: nextId.numberAgeGroups++, ...data };
        mockDB.numberAgeGroups.push(newGroup);
        resolve(newGroup);
      }, 100);
    });
  },

  async updateNumberAgeGroup(id, data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = mockDB.numberAgeGroups.findIndex(n => n.id === parseInt(id));
        if (index !== -1) {
          mockDB.numberAgeGroups[index] = { ...mockDB.numberAgeGroups[index], ...data };
          resolve(mockDB.numberAgeGroups[index]);
        } else {
          resolve(null);
        }
      }, 100);
    });
  },

  // AgeGroups
  async getAgeGroupsByNumberAgeGroup(numberAgeGroupId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const groups = mockDB.ageGroups.filter(a => a.numberAgeGroupId === parseInt(numberAgeGroupId));
        resolve(groups);
      }, 100);
    });
  },

  async getAgeGroupById(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        const group = mockDB.ageGroups.find(a => a.id === parseInt(id));
        resolve(group || null);
      }, 50);
    });
  },

  async createAgeGroup(data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const newGroup = { id: nextId.ageGroups++, ...data };
        mockDB.ageGroups.push(newGroup);
        resolve(newGroup);
      }, 100);
    });
  },

  async updateAgeGroup(id, data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = mockDB.ageGroups.findIndex(a => a.id === parseInt(id));
        if (index !== -1) {
          mockDB.ageGroups[index] = { ...mockDB.ageGroups[index], ...data };
          resolve(mockDB.ageGroups[index]);
        } else {
          resolve(null);
        }
      }, 100);
    });
  },

  // Survivals
  async getSurvivalsByAgeGroup(ageGroupId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const survivals = mockDB.survivals.filter(s => s.ageGroupId === parseInt(ageGroupId));
        resolve(survivals);
      }, 100);
    });
  },

  async getSurvivalById(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        const survival = mockDB.survivals.find(s => s.id === parseInt(id));
        resolve(survival || null);
      }, 50);
    });
  },

  async createSurvival(data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const newSurvival = { id: nextId.survivals++, ...data };
        mockDB.survivals.push(newSurvival);
        resolve(newSurvival);
      }, 100);
    });
  },

  async updateSurvival(id, data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = mockDB.survivals.findIndex(s => s.id === parseInt(id));
        if (index !== -1) {
          mockDB.survivals[index] = { ...mockDB.survivals[index], ...data };
          resolve(mockDB.survivals[index]);
        } else {
          resolve(null);
        }
      }, 100);
    });
  },

  async deleteSurvival(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = mockDB.survivals.findIndex(s => s.id === parseInt(id));
        if (index !== -1) {
          mockDB.survivals.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 100);
    });
  },

  // Fecundities
  async getFecunditiesByAgeGroup(ageGroupId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const fecundities = mockDB.fecundities.filter(f => f.ageGroupId === parseInt(ageGroupId));
        resolve(fecundities);
      }, 100);
    });
  },

  async getFecundityById(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        const fecundity = mockDB.fecundities.find(f => f.id === parseInt(id));
        resolve(fecundity || null);
      }, 50);
    });
  },

  async createFecundity(data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const newFecundity = { id: nextId.fecundities++, ...data };
        mockDB.fecundities.push(newFecundity);
        resolve(newFecundity);
      }, 100);
    });
  },

  async updateFecundity(id, data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = mockDB.fecundities.findIndex(f => f.id === parseInt(id));
        if (index !== -1) {
          mockDB.fecundities[index] = { ...mockDB.fecundities[index], ...data };
          resolve(mockDB.fecundities[index]);
        } else {
          resolve(null);
        }
      }, 100);
    });
  },

  async deleteFecundity(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = mockDB.fecundities.findIndex(f => f.id === parseInt(id));
        if (index !== -1) {
          mockDB.fecundities.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 100);
    });
  },

  // Dispersal Distances
  async getDispersalBySpecies(speciesId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const dispersal = mockDB.dispersalDistances.find(d => d.speciesId === parseInt(speciesId));
        resolve(dispersal || null);
      }, 100);
    });
  },

  async createDispersal(data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const newDispersal = { id: nextId.dispersalDistances++, ...data };
        mockDB.dispersalDistances.push(newDispersal);
        resolve(newDispersal);
      }, 100);
    });
  },

  async updateDispersal(id, data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = mockDB.dispersalDistances.findIndex(d => d.id === parseInt(id));
        if (index !== -1) {
          mockDB.dispersalDistances[index] = { ...mockDB.dispersalDistances[index], ...data };
          resolve(mockDB.dispersalDistances[index]);
        } else {
          resolve(null);
        }
      }, 100);
    });
  }
};
