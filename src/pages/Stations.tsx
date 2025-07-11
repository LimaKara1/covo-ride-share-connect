
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Car, Bike, Zap, QrCode, Phone, Clock } from 'lucide-react';

const Stations = () => {
  const [selectedStation, setSelectedStation] = useState(null);

  // Mock data pour les stations
  const stations = [
    {
      id: 1,
      name: 'Station Plateau',
      address: 'Avenue Léopold Sédar Senghor, Plateau',
      coordinates: { lat: 14.6937, lng: -17.4441 },
      phone: '+221 77 123 45 67',
      hours: '24h/24 - 7j/7',
      vehicles: [
        { type: 'car', model: 'Renault Clio', available: 3, total: 5 },
        { type: 'scooter', model: 'Yamaha NMAX', available: 2, total: 4 },
        { type: 'bike', model: 'Vélo urbain', available: 8, total: 10 },
      ],
      agent: {
        name: 'Mamadou Diop',
        phone: '+221 77 123 45 67',
        status: 'online'
      }
    },
    {
      id: 2,
      name: 'Station Almadies',
      address: 'Route des Almadies, près du King Fahd Palace',
      coordinates: { lat: 14.7167, lng: -17.4833 },
      phone: '+221 77 234 56 78',
      hours: '06h00 - 22h00',
      vehicles: [
        { type: 'car', model: 'Toyota Corolla', available: 1, total: 3 },
        { type: 'scooter', model: 'Honda PCX', available: 4, total: 6 },
        { type: 'electric', model: 'Trottinette électrique', available: 0, total: 8 },
      ],
      agent: {
        name: 'Aïcha Sow',
        phone: '+221 77 234 56 78',
        status: 'online'
      }
    },
    {
      id: 3,
      name: 'Station Université',
      address: 'Campus universitaire UCAD, Fann',
      coordinates: { lat: 14.6928, lng: -17.4467 },
      phone: '+221 77 345 67 89',
      hours: '07h00 - 20h00',
      vehicles: [
        { type: 'bike', model: 'Vélo urbain', available: 12, total: 15 },
        { type: 'electric', model: 'Trottinette électrique', available: 6, total: 10 },
        { type: 'scooter', model: 'Yamaha NMAX', available: 1, total: 2 },
      ],
      agent: {
        name: 'Ousmane Ba',
        phone: '+221 77 345 67 89',
        status: 'offline'
      }
    },
    {
      id: 4,
      name: 'Station Médina',
      address: 'Marché Médina, près de la Grande Mosquée',
      coordinates: { lat: 14.6796, lng: -17.4441 },
      phone: '+221 77 456 78 90',
      hours: '05h00 - 23h00',
      vehicles: [
        { type: 'car', model: 'Hyundai i10', available: 2, total: 4 },
        { type: 'bike', model: 'Vélo urbain', available: 5, total: 8 },
        { type: 'scooter', model: 'Piaggio Liberty', available: 3, total: 5 },
      ],
      agent: {
        name: 'Fatou Diallo',
        phone: '+221 77 456 78 90',
        status: 'online'
      }
    },
  ];

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'car': return Car;
      case 'scooter': return Bike;
      case 'electric': return Zap;
      case 'bike': return Bike;
      default: return Car;
    }
  };

  const getVehicleTypeLabel = (type: string) => {
    switch (type) {
      case 'car': return 'Voitures';
      case 'scooter': return 'Scooters';
      case 'electric': return 'Trottinettes';
      case 'bike': return 'Vélos';
      default: return type;
    }
  };

  const handleScanQr = (stationId: number) => {
    console.log('Scan QR for station:', stationId);
    // Ici vous ajouterez la logique de scan QR
  };

  const handleCallAgent = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Stations de service</h1>
        
        {/* Carte interactive placeholder */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Localisation des stations
            </CardTitle>
            <CardDescription>
              Trouvez la station la plus proche de vous
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">
                Carte interactive Google Maps
                <br />
                (Intégration à prévoir avec l'API Google Maps)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Liste des stations */}
        <div className="grid md:grid-cols-2 gap-6">
          {stations.map((station) => (
            <Card key={station.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-primary" />
                      {station.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {station.address}
                    </CardDescription>
                  </div>
                  <Badge variant={station.agent.status === 'online' ? 'default' : 'secondary'}>
                    {station.agent.status === 'online' ? 'Ouvert' : 'Fermé'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Informations de contact */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{station.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{station.hours}</span>
                  </div>
                </div>

                {/* Agent de station */}
                <div className="bg-muted/50 p-3 rounded-lg">
                  <h4 className="font-semibold mb-1">Agent de station</h4>
                  <p className="text-sm">{station.agent.name}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <Badge variant={station.agent.status === 'online' ? 'default' : 'secondary'} className="text-xs">
                      {station.agent.status === 'online' ? 'En ligne' : 'Hors ligne'}
                    </Badge>
                    {station.agent.status === 'online' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCallAgent(station.agent.phone)}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Appeler
                      </Button>
                    )}
                  </div>
                </div>

                {/* Véhicules disponibles */}
                <div>
                  <h4 className="font-semibold mb-3">Véhicules disponibles</h4>
                  <div className="space-y-2">
                    {station.vehicles.map((vehicle, index) => {
                      const IconComponent = getVehicleIcon(vehicle.type);
                      const availabilityColor = vehicle.available > 0 ? 'text-green-600' : 'text-red-600';
                      
                      return (
                        <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                          <div className="flex items-center">
                            <IconComponent className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">{getVehicleTypeLabel(vehicle.type)}</span>
                          </div>
                          <div className={`text-sm font-medium ${availabilityColor}`}>
                            {vehicle.available}/{vehicle.total}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    className="flex-1"
                    onClick={() => handleScanQr(station.id)}
                    disabled={station.agent.status !== 'online'}
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    Scanner QR
                  </Button>
                  <Button variant="outline" asChild>
                    <a
                      href={`https://maps.google.com/?q=${station.coordinates.lat},${station.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      Itinéraire
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Information pour les agents */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Information pour les agents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              En tant qu'agent de station, vous pouvez scanner les QR codes des clients pour valider leurs réservations et procéder à la remise des véhicules.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline">
                <QrCode className="mr-2 h-4 w-4" />
                Guide d'utilisation
              </Button>
              <Button variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Support technique
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Stations;
