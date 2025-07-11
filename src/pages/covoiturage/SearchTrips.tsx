
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Calendar, Clock, Search, Star, User } from 'lucide-react';

const SearchTrips = () => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
  });

  // Mock data pour les résultats
  const trips = [
    {
      id: 1,
      driver: {
        name: 'Amadou Diallo',
        rating: 4.8,
        avatar: '/placeholder.svg?height=40&width=40',
      },
      from: 'Dakar',
      to: 'Thies',
      departureTime: '08:00',
      price: 2500,
      availableSeats: 3,
      vehicle: 'Renault Logan',
      duration: '1h 30min',
    },
    {
      id: 2,
      driver: {
        name: 'Fatou Sow',
        rating: 4.9,
        avatar: '/placeholder.svg?height=40&width=40',
      },
      from: 'Dakar',
      to: 'Thies',
      departureTime: '14:00',
      price: 2000,
      availableSeats: 2,
      vehicle: 'Toyota Corolla',
      duration: '1h 20min',
    },
    {
      id: 3,
      driver: {
        name: 'Moussa Ba',
        rating: 4.7,
        avatar: '/placeholder.svg?height=40&width=40',
      },
      from: 'Dakar',
      to: 'Thies',
      departureTime: '18:30',
      price: 3000,
      availableSeats: 1,
      vehicle: 'Hyundai Accent',
      duration: '1h 25min',
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search trips:', searchData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBookTrip = (tripId: number) => {
    console.log('Booking trip:', tripId);
    // Ici vous ajouterez la logique de réservation
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Rechercher un trajet</h1>
        
        {/* Formulaire de recherche */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Trouvez votre trajet idéal
            </CardTitle>
            <CardDescription>
              Recherchez des trajets en covoiturage selon vos critères
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">Départ</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="from"
                      name="from"
                      placeholder="Ville de départ"
                      value={searchData.from}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">Destination</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="to"
                      name="to"
                      placeholder="Ville de destination"
                      value={searchData.to}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={searchData.date}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Heure approximative</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={searchData.time}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full">
                <Search className="mr-2 h-4 w-4" />
                Rechercher
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Résultats de recherche */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Trajets disponibles</h2>
          {trips.map((trip) => (
            <Card key={trip.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <img
                        src={trip.driver.avatar}
                        alt={trip.driver.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h3 className="font-semibold">{trip.driver.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-secondary fill-current mr-1" />
                          <span className="text-sm text-muted-foreground">{trip.driver.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm">{trip.from} → {trip.to}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm">{trip.departureTime} ({trip.duration})</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm">{trip.availableSeats} places disponibles</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">Véhicule: {trip.vehicle}</p>
                  </div>
                  
                  <div className="flex flex-col items-end justify-between md:ml-6">
                    <div className="text-right mb-4">
                      <div className="text-2xl font-bold text-primary">{trip.price} CFA</div>
                      <div className="text-sm text-muted-foreground">par personne</div>
                    </div>
                    <Button onClick={() => handleBookTrip(trip.id)} className="w-full md:w-auto">
                      Réserver
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchTrips;
