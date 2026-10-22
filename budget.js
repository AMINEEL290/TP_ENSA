const { createApp } = Vue;

createApp({
  data() {
    return {
      budgetMensuel: 1500,
      filtreCategorie: 'toutes',
      afficherStats: false,
      categories: ['Alimentation', 'Transport', 'Loisirs', 'Études'],
      prochainId: 5,
      nouvelleDepense: { titre: '', montant: null, categorie: 'Alimentation' },
      depenses: [
        { id: 1, titre: 'Groceries',         montant: 350, categorie: 'Alimentation' },
        { id: 2, titre: 'Abonnement train',  montant: 120, categorie: 'Transport' },
        { id: 3, titre: 'Netflix',          montant: 80,  categorie: 'Loisirs' },
        { id: 4, titre: 'Roman',          montant: 200, categorie: 'Études' }
      ]
    };
  },
  computed: {
    
    depensesFiltrees() {
      if (this.filtreCategorie === 'toutes') return this.depenses;
      return this.depenses.filter(d => d.categorie === this.filtreCategorie);
    },
    
    totalFiltre() {
      return this.depensesFiltrees.reduce((s, d) => s + d.montant, 0);
    },
    totalGeneral() {
      return this.depenses.reduce((s, d) => s + d.montant, 0);
    },
    moyenneDepense() {
      if (this.depensesFiltrees.length === 0) return 0; 
      return this.totalFiltre / this.depensesFiltrees.length;
    }
  },
  methods: {
    selectionnerCategorie(cat) {
      this.filtreCategorie = cat;
    },
   
    totalCategorie(cat) {
      return this.depenses
        .filter(d => d.categorie === cat)
        .reduce((s, d) => s + d.montant, 0);
    },
    
    ajouterDepense() {
      const n = this.nouvelleDepense;
      if (!n.titre.trim() || !(n.montant > 0)) return;
      this.depenses.push({
        id: this.prochainId++,
        titre: n.titre.trim(),
        montant: Number(n.montant),
        categorie: n.categorie
      });
      this.nouvelleDepense = { titre: '', montant: null, categorie: n.categorie };
    },
    supprimerDepense(depense) {
      this.depenses = this.depenses.filter(d => d.id !== depense.id);
    }
  }
}).mount('#app');