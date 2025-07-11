
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Calendar, Clock, Car, Users, DollarSign, Plus } from 'lucide-react';

const CreateTrip = () => {
  const [tripData, setTripData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    seats: 1,
    price: '',
    vehicle: '',
    description: '',
    recurringDays: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Create trip:', tripData);
    // Ici vous ajouterez la logique de création de trajet
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setTripData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Proposer un trajet</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="mr-2 h-5 w-5" />
              Créer un nouveau trajet
            </CardTitle>
            <CardDescription>
              Partagez votre trajet et voyagez de manière économique et conviviale
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Itinéraire */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Itinéraire</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from">Ville de départ</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="from"
                        name="from"
                        placeholder="Ex: Dakar"
                        value={tripData.from}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to">Ville de destination</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="to"
                        name="to"
                        placeholder="Ex: Thiès"
                        value={tripData.to}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Date et heure */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Date et heure</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date de départ</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={tripData.date}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Heure de départ</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={tripData.time}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Détails du trajet */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Détails du trajet</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="seats">Nombre de places disponibles</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="seats"
                        name="seats"
                        type="number"
                        min="1"
                        max="6"
                        value={tripData.seats}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix par passager (CFA)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="Ex: 2500"
                        value={tripData.price}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Véhicule utilisé</Label>
                  <div className="relative">
                    <Car className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="vehicle"
                      name="vehicle"
                      placeholder="Ex: Toyota Corolla blanche"
                      value={tripData.vehicle}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description (optionnel)</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Ajoutez des informations supplémentaires sur votre trajet..."
                  value={tripData.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              {/* Conditions */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Conditions importantes</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Vous devez posséder un permis de conduire valide</li>
                  <li>• Votre véhicule doit être assuré</li>
                  <li>• Respectez les horaires convenus avec vos passagers</li>
                  <li>• Soyez courtois et respectueux</li>
                </ul>
              </div>

              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Publier mon trajet
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateTrip;
