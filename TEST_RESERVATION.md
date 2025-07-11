# Test du Système de Réservation COVO - Flux Complet

## 🧪 Guide de test rapide

### 1. Accéder à la page de location
- Allez sur `http://localhost:8080/location`
- Vous devriez voir la page avec les véhicules disponibles

### 2. Parcourir les véhicules disponibles
Vous devriez voir :
- ✅ **Voiture** : Renault Clio - 1500 CFA/h
- ✅ **Scooter** : Yamaha NMAX - 800 CFA/h  
- ✅ **Trottinette électrique** : 500 CFA/h
- ✅ **Tricycle urbain** : 600 CFA/h
- ✅ **Jetski** : Sea-Doo - 2500 CFA/h

### 3. Sélectionner un véhicule
- Cliquez sur le bouton **"Louer"** d'un véhicule disponible
- Vérifiez la console pour voir :
```
🚗 Véhicule sélectionné: {id: 1, type: "voiture", name: "Renault Clio", ...}
📋 Données véhicule sauvegardées: {vehicleType: "voiture", ...}
🚀 Redirection vers le formulaire de réservation
```

### 4. Formulaire de réservation pré-rempli
Vous devriez être redirigé vers `/location/book` avec :
- ✅ **Indicateur vert** : "Véhicule pré-sélectionné"
- ✅ **Type de véhicule** : Pré-rempli
- ✅ **Station de retrait** : Pré-remplie
- ✅ **Station de retour** : Pré-remplie

### 5. Compléter le formulaire
Remplissez les champs manquants :
```
Date de début: Aujourd'hui
Heure de début: 14:00
Date de fin: Aujourd'hui
Heure de fin: 16:00
Prénom: Jean
Nom: Dupont
Email: jean.dupont@test.com
Téléphone: +221 77 123 45 67
```

### 6. Vérifier les logs de débogage
Dans la console, vous devriez voir :
```
🚗 Véhicule pré-sélectionné détecté: {vehicleType: "voiture", ...}
✅ Formulaire pré-rempli avec les données du véhicule
=== DÉBUT SOUMISSION FORMULAIRE ===
✅ Validation réussie
ID de réservation généré: COVO-1234567890-abc123def
📋 Réservation créée: {bookingId: "COVO-...", ...}
💾 Réservation sauvegardée dans localStorage
🧹 Données véhicule nettoyées
🚀 Redirection vers /location/confirmation
```

### 7. Page de confirmation avec QR code
Vous devriez être redirigé vers `/location/confirmation` avec :
- ✅ **QR code généré** au centre
- ✅ **Récapitulatif complet** de la réservation
- ✅ **Prix calculé** automatiquement (ex: 3000 CFA pour 2h)
- ✅ **Boutons fonctionnels** : Télécharger, Plein écran, Imprimer

### 8. Tester les fonctionnalités QR
- [ ] **Télécharger le QR code** → Fichier PNG sauvegardé
- [ ] **Afficher en plein écran** → Modal avec QR agrandi
- [ ] **Imprimer la page** → Impression du récapitulatif
- [ ] **Nouvelle réservation** → Retour au formulaire
- [ ] **Retour à l'accueil** → Navigation vers la page d'accueil

## 🔧 Dépannage

### Problème : Bouton "Louer" ne fonctionne pas
**Solution :** Vérifiez que le véhicule est disponible (badge "Disponible" vert).

### Problème : Formulaire non pré-rempli
**Solution :** Vérifiez la console pour les erreurs et assurez-vous que localStorage fonctionne.

### Problème : Pas de redirection après clic sur "Louer"
**Solution :** Vérifiez que React Router est installé et que la route `/location/book` existe.

### Problème : QR code ne s'affiche pas
**Solution :** Vérifiez que `qrcode.react` est installé et que les données sont correctes.

## 📊 Flux de données

### 1. Sélection véhicule → Formulaire
```javascript
// VehicleRentals.tsx
localStorage.setItem('selectedVehicle', {
  vehicleType: 'voiture',
  vehicleName: 'Renault Clio',
  vehiclePrice: 1500,
  pickupStation: 'Station Plateau',
  returnStation: 'Station Plateau'
});
```

### 2. Formulaire → Confirmation
```javascript
// BookingForm.tsx
const reservation = {
  bookingId: 'COVO-1234567890-abc123def',
  vehicleType: 'voiture',
  vehicleLabel: 'Voiture',
  pickupStation: 'Station Plateau',
  returnStation: 'Station Plateau',
  startDate: '2024-01-15',
  startTime: '14:00',
  endDate: '2024-01-15',
  endTime: '16:00',
  firstName: 'Jean',
  lastName: 'Dupont',
  email: 'jean.dupont@test.com',
  phone: '+221 77 123 45 67',
  totalPrice: 3000,
  status: 'confirmed'
};
```

### 3. QR Code généré
Le QR code contient toutes les informations de la réservation en JSON pour permettre à l'agent de scanner et valider.

## ✅ Critères de succès

### Page VehicleRentals
- [ ] Affichage de tous les véhicules disponibles
- [ ] Filtres fonctionnels (type, station, durée)
- [ ] Boutons "Louer" actifs pour les véhicules disponibles
- [ ] Redirection vers le formulaire au clic sur "Louer"

### Formulaire de réservation
- [ ] Pré-remplissage automatique des données véhicule
- [ ] Indicateur visuel du véhicule sélectionné
- [ ] Validation complète des champs obligatoires
- [ ] Calcul automatique du prix selon la durée
- [ ] Soumission et redirection vers confirmation

### Page de confirmation
- [ ] QR code généré et affiché
- [ ] Récapitulatif complet de la réservation
- [ ] Boutons de téléchargement et plein écran fonctionnels
- [ ] Navigation de retour fonctionnelle
- [ ] Design responsive et cohérent

## 🚀 Mode développement

Le système fonctionne en mode développement sans backend grâce au localStorage. Les données sont sauvegardées localement et peuvent être récupérées même après rechargement de la page.

## 🎨 Charte graphique respectée

- **Vert principal** : #1B5B4A
- **Doré** : #C4A91C  
- **Blanc** : #FFFFFF
- **Design responsive** : Mobile et desktop
- **Composants UI cohérents** : Cards, Buttons, Badges 