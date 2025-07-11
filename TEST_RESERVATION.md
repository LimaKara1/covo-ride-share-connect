# Test du Formulaire de Réservation COVO

## 🧪 Guide de test rapide

### 1. Accéder au formulaire
- Allez sur `http://localhost:5173/location/book`
- Ou cliquez sur "Location" dans le menu puis "Réserver un véhicule"

### 2. Remplir le formulaire (exemple de test)
```
Type de véhicule: Trottinette électrique
Station de retrait: Station Plateau
Station de retour: Station Almadies
Date de début: Aujourd'hui
Heure de début: 14:00
Date de fin: Aujourd'hui
Heure de fin: 16:00
Prénom: Jean
Nom: Dupont
Email: jean.dupont@test.com
Téléphone: +221 77 123 45 67
```

### 3. Vérifier les logs de débogage
Ouvrez la console du navigateur (F12) et vérifiez que vous voyez :
```
=== DÉBUT SOUMISSION FORMULAIRE ===
✅ Validation réussie
ID de réservation généré: COVO-1234567890-abc123def
📋 Réservation créée: {bookingId: "COVO-...", ...}
💾 Réservation sauvegardée dans localStorage
🚀 Redirection vers /location/confirmation
```

### 4. Page de confirmation
Vous devriez être redirigé vers `/location/confirmation` avec :
- ✅ QR code généré
- ✅ Récapitulatif complet de la réservation
- ✅ Boutons de téléchargement et plein écran
- ✅ Prix calculé automatiquement

### 5. Fonctionnalités à tester
- [ ] Téléchargement du QR code en PNG
- [ ] Affichage plein écran du QR
- [ ] Impression de la page
- [ ] Navigation vers nouvelle réservation
- [ ] Retour à l'accueil

## 🔧 Dépannage

### Problème : Le bouton ne fonctionne pas
**Solution :** Vérifiez que tous les champs obligatoires sont remplis et que le prix est calculé.

### Problème : Pas de redirection
**Solution :** Vérifiez la console pour les erreurs et assurez-vous que React Router est installé.

### Problème : QR code ne s'affiche pas
**Solution :** Vérifiez que `qrcode.react` est installé et que les données sont correctes.

### Problème : Page de confirmation vide
**Solution :** Vérifiez que les données sont bien passées via `location.state`.

## 📊 Données de test

### Réservation complète (exemple)
```javascript
{
  bookingId: "COVO-1234567890-abc123def",
  vehicleType: "trottinette",
  vehicleLabel: "Trottinette électrique",
  pickupStation: "Station Plateau",
  returnStation: "Station Almadies",
  startDate: "2024-01-15",
  startTime: "14:00",
  endDate: "2024-01-15",
  endTime: "16:00",
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@test.com",
  phone: "+221 77 123 45 67",
  totalPrice: 1000,
  status: "confirmed",
  createdAt: "2024-01-15T14:00:00.000Z"
}
```

### QR Code généré
Le QR code contient toutes les informations de la réservation en JSON pour permettre à l'agent de scanner et valider.

## ✅ Critères de succès

- [ ] Formulaire se soumet correctement
- [ ] Validation des champs obligatoires
- [ ] Calcul automatique du prix
- [ ] Navigation vers la page de confirmation
- [ ] QR code généré et affiché
- [ ] Téléchargement du QR code fonctionne
- [ ] Affichage plein écran fonctionne
- [ ] Impression fonctionne
- [ ] Navigation de retour fonctionne
- [ ] Design responsive et cohérent

## 🚀 Mode développement

Le système fonctionne en mode développement sans backend grâce au localStorage. Les données sont sauvegardées localement et peuvent être récupérées même après rechargement de la page. 