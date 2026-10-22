const { createApp } = Vue;

createApp({
  data() {
    return {
      rechercheTexte: '',
      filtreCategorie: '',
      articleOuvert: null,
      prochainId: 7,
      nouveau: { nom: '', categorie: '', quantite: 0, prixUnitaire: 0, seuilAlerte: 0 },
      articles: [
        { id: 1, nom: 'Coca Cola 50cl ', categorie: 'Boissons', quantite: 24, prixUnitaire: 5,   seuilAlerte: 10 },
        { id: 2, nom: 'Jus d\'orange ',     categorie: 'Boissons', quantite: 5,  prixUnitaire: 12,   seuilAlerte: 8 },
        { id: 3, nom: 'Café americano ',   categorie: 'Boissons', quantite: 0,  prixUnitaire: 15, seuilAlerte: 15 },
        { id: 4, nom: 'Croissant au amandine ',         categorie: 'Snacks',   quantite: 12, prixUnitaire: 4,   seuilAlerte: 5 },
        { id: 5, nom: 'Barre chocolatée pistache ',  categorie: 'Snacks',   quantite: 0,  prixUnitaire: 5,   seuilAlerte: 6 },
        { id: 6, nom: 'Gobelets ',          categorie: 'Fournitures', quantite: 100, prixUnitaire: 0.5, seuilAlerte: 30 }
      ]
    };
  },
  computed: {
    categories() {
      return [...new Set(this.articles.map(a => a.categorie))];
    },
  
    articlesFiltres() {
      const texte = this.rechercheTexte.trim().toLowerCase();
      return this.articles.filter(a =>
        a.nom.toLowerCase().includes(texte) &&
        (this.filtreCategorie === '' || a.categorie === this.filtreCategorie)
      );
    },
    
    valeurTotaleStock() {
      return this.articles.reduce((somme, a) => somme + a.quantite * a.prixUnitaire, 0);
    },
    nombreRupture() {
      return this.articles.filter(a => a.quantite === 0).length;
    }
  },
  methods: {
    incrementer(article) {
      article.quantite++;
    },
    
    decrementer(article) {
      if (article.quantite > 0) {
        article.quantite--;
      }
    },
    
    toggleDetail(article) {
      this.articleOuvert = this.articleOuvert === article.id ? null : article.id;
    },
    supprimerArticle(article) {
      this.articles = this.articles.filter(a => a.id !== article.id);
      if (this.articleOuvert === article.id) this.articleOuvert = null;
    },
    ajouterArticle() {
      const n = this.nouveau;
      if (!n.nom.trim() || !n.categorie.trim()) return;
      this.articles.push({
        id: this.prochainId++,
        nom: n.nom.trim(),
        categorie: n.categorie.trim(),
        quantite: Math.max(0, Number(n.quantite) || 0),
        prixUnitaire: Math.max(0, Number(n.prixUnitaire) || 0),
        seuilAlerte: Math.max(0, Number(n.seuilAlerte) || 0)
      });
      this.nouveau = { nom: '', categorie: '', quantite: 0, prixUnitaire: 0, seuilAlerte: 0 };
    }
  }
}).mount('#app');