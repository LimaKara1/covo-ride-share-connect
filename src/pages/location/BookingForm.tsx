
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import QRCode from 'qrcode.react';
import { Calendar, Clock, MapPin, User, Phone, Mail, CreditCard } from 'lucide-react';

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    vehicleType: 'Renault Clio',
    pickupStation: '',
    returnStation: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [qrData, setQrData] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Génération des données pour le QR Code
    const bookingInfo = {
      id: `BK${Date.now()}`,
      vehicle: bookingData.vehicleType,
      pickup: bookingData.pickupStation,
      return: bookingData.returnStation,
      start: `${bookingData.startDate} ${bookingData.startTime}`,
      end: `${bookingData.endDate} ${bookingData.endTime}`,
      customer: `${bookingData.firstName} ${bookingData.lastName}`,
      phone: bookingData.phone,
    };
    
    setQrData(JSON.stringify(bookingInfo));
    setStep(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBookingData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const calculateTotal = () => {
    // Calcul simplifié du coût total
    return 15000; // Prix d'exemple
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-muted/30 p-4">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-600">Réservation confirmée !</CardTitle>
              <CardDescription>
                Votre QR Code de réservation est prêt
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="bg-white p-6 rounded-lg inline-block">
                <QRCode 
                  value={qrData} 
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Instructions importantes :</h3>
                <ul className="text-left text-sm space-y-1 max-w-md mx-auto">
                  <li>• Présentez ce QR Code à la station de retrait</li>
                  <li>• Vérifiez l'état du véhicule avant de partir</li>
                  <li>• Respectez les horaires de retour</li>
                  <li>• Contactez le support en cas de problème</li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-left bg-muted/50 p-4 rounded-lg">
                <div>
                  <strong>Véhicule :</strong> {bookingData.vehicleType}
                </div>
                <div>
                  <strong>Station :</strong> {bookingData.pickupStation}
                </div>
                <div>
                  <strong>Début :</strong> {bookingData.startDate} à {bookingData.startTime}
                </div>
                <div>
                  <strong>Fin :</strong> {bookingData.endDate} à {bookingData.endTime}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => window.print()}>
                  Imprimer le QR Code
                </Button>
                <Button variant="outline" onClick={() => setStep(1)}>
                  Nouvelle réservation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Réservation de véhicule</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Détails de la réservation</CardTitle>
            <CardDescription>
              Remplissez les informations pour finaliser votre réservation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informations du véhicule */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Véhicule sélectionné</h3>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-medium">{bookingData.vehicleType}</p>
                  <p className="text-sm text-muted-foreground">Voiture - 5 places</p>
                </div>
              </div>

              {/* Stations */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Stations</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupStation">Station de retrait</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <select
                        id="pickupStation"
                        name="pickupStation"
                        value={bookingData.pickupStation}
                        onChange={(e) => setBookingData(prev => ({ ...prev, pickupStation: e.target.value }))}
                        className="w-full p-2 pl-10 border rounded-md"
                        required
                      >
                        <option value="">Sélectionner une station</option>
                        <option value="Station Plateau">Station Plateau</option>
                        <option value="Station Almadies">Station Almadies</option>
                        <option value="Station Université">Station Université</option>
                        <option value="Station Médina">Station Médina</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="returnStation">Station de retour</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <select
                        id="returnStation"
                        name="returnStation"
                        value={bookingData.returnStation}
                        onChange={(e) => setBookingData(prev => ({ ...prev, returnStation: e.target.value }))}
                        className="w-full p-2 pl-10 border rounded-md"
                        required
                      >
                        <option value="">Sélectionner une station</option>
                        <option value="Station Plateau">Station Plateau</option>
                        <option value="Station Almadies">Station Almadies</option>
                        <option value="Station Université">Station Université</option>
                        <option value="Station Médina">Station Médina</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date et heure */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Période de location</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Date de début</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={bookingData.startDate}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Heure de début</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="startTime"
                        name="startTime"
                        type="time"
                        value={bookingData.startTime}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Date de fin</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={bookingData.endDate}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">Heure de fin</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="endTime"
                        name="endTime"
                        type="time"
                        value={bookingData.endTime}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations personnelles */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Vos informations</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="Votre prénom"
                        value={bookingData.firstName}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Votre nom"
                      value={bookingData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={bookingData.email}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="77 123 45 67"
                        value={bookingData.phone}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optionnel)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Informations supplémentaires..."
                  value={bookingData.notes}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              {/* Récapitulatif */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Récapitulatif</h4>
                <div className="flex justify-between items-center">
                  <span>Total à payer :</span>
                  <span className="text-xl font-bold text-primary">{calculateTotal()} CFA</span>
                </div>
              </div>

              <Button type="submit" className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Confirmer la réservation
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingForm;
