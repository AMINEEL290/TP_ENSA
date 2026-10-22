const { createApp } = Vue;

createApp({
  data() {
    return {
      recherche: '',
      moduleOuvert: null,
      prochainId: 7,
      erreurFormulaire: '',
      nouveau: { nom: '', note: null, coefficient: 1 },
      modules: [
        { id: 1, nom: 'Algorithmique',      note: 15,   coefficient: 3 },
        { id: 2, nom: 'Bases de données',   note: 12.5, coefficient: 3 },
        { id: 3, nom: 'Réseaux',            note: 8,    coefficient: 2 },
        { id: 4, nom: 'Programmation Web',  note: 17,   coefficient: 2 },
        { id: 5, nom: 'Mathématiques',      note: 9.5,  coefficient: 2 },
        { id: 6, nom: 'Anglais',            note: 14,   coefficient: 1 }
      ]
    };
  },
  computed: {
    
    moyenneGenerale() {
      const somme = this.modules.reduce((acc, m) => acc + m.note * m.coefficient, 0);
      const coefs = this.modules.reduce((acc, m) => acc + m.coefficient, 0);
      if (coefs === 0) return 0;
      return Math.round((somme / coefs) * 100) / 100;
    },
    
    modulesARattraper() {
      return this.modules.filter(m => m.note < 10);
    },
    
    modulesTries() {
      return [...this.modules].sort((a, b) => b.note - a.note);
    },
    modulesAffiches() {
      const texte = this.recherche.trim().toLowerCase();
      return this.modulesTries.filter(m => m.nom.toLowerCase().includes(texte));
    },
    
    moduleMax() {
      return this.modulesTries.length > 0 ? this.modulesTries[0] : null;
    },
    moduleMin() {
      return this.modulesTries.length > 0
        ? this.modulesTries[this.modulesTries.length - 1]
        : null;
    }
  },
  methods: {
    toggleDetail(module) {
      this.moduleOuvert = this.moduleOuvert === module.id ? null : module.id;
    },
    tousValides() {
      return this.modules.every(module => module.note >= 10);
    },
    ajouterModule() {
      const n = this.nouveau;
      if (!n.nom.trim()) {
        this.erreurFormulaire = 'Le nom du module est obligatoire.';
        return;
      }
      if (typeof n.note !== 'number' || !Number.isFinite(n.note) || n.note < 0 || n.note > 20) {
        this.erreurFormulaire = 'La note doit être un nombre compris entre 0 et 20.';
        return;
      }
      if (typeof n.coefficient !== 'number' || !Number.isFinite(n.coefficient) || n.coefficient <= 0) {
        this.erreurFormulaire = 'Le coefficient doit être un nombre supérieur à 0.';
        return;
      }
      this.modules.push({
        id: this.prochainId++,
        nom: n.nom.trim(),
        note: Number(n.note),
        coefficient: Number(n.coefficient)
      });
      this.nouveau = { nom: '', note: null, coefficient: 1 };
      this.erreurFormulaire = '';
    },
    supprimerModule(module) {
      this.modules = this.modules.filter(m => m.id !== module.id);
      if (this.moduleOuvert === module.id) this.moduleOuvert = null;
    }
  }
}).mount('#app');