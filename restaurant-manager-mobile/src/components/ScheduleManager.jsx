import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  ArrowLeft,
  Clock,
  Save
} from 'lucide-react';

const ScheduleManager = ({ restaurant, onBack }) => {
  const [schedule, setSchedule] = useState({
    monday: { open: true, openTime: '09:00', closeTime: '22:00' },
    tuesday: { open: true, openTime: '09:00', closeTime: '22:00' },
    wednesday: { open: true, openTime: '09:00', closeTime: '22:00' },
    thursday: { open: true, openTime: '09:00', closeTime: '22:00' },
    friday: { open: true, openTime: '09:00', closeTime: '23:00' },
    saturday: { open: true, openTime: '10:00', closeTime: '23:00' },
    sunday: { open: false, openTime: '10:00', closeTime: '21:00' }
  });

  const [saved, setSaved] = useState(false);

  const dayNames = {
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche'
  };

  const handleScheduleChange = (day, field, value) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
    setSaved(false);
  };

  const handleSave = async () => {
    try {
      // Ici, vous pourriez envoyer les données au backend
      console.log('Sauvegarde des horaires:', schedule);
      
      // Simuler une sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const copyToAll = (sourceDay) => {
    const sourceSchedule = schedule[sourceDay];
    const newSchedule = {};
    
    Object.keys(schedule).forEach(day => {
      newSchedule[day] = { ...sourceSchedule };
    });
    
    setSchedule(newSchedule);
    setSaved(false);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </div>
        <h1 className="text-xl font-bold">Horaires d'ouverture</h1>
        <Button 
          size="sm"
          onClick={handleSave}
          disabled={saved}
        >
          <Save className="h-4 w-4 mr-2" />
          {saved ? 'Sauvegardé' : 'Sauvegarder'}
        </Button>
      </div>

      {/* Current Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-600">Restaurant actuellement ouvert</p>
              <p className="text-sm text-gray-600">Fermeture à 22:00</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule for each day */}
      <div className="space-y-4">
        {Object.entries(schedule).map(([day, daySchedule]) => (
          <Card key={day}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{dayNames[day]}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Label htmlFor={`${day}-open`} className="text-sm">
                    {daySchedule.open ? 'Ouvert' : 'Fermé'}
                  </Label>
                  <Switch
                    id={`${day}-open`}
                    checked={daySchedule.open}
                    onCheckedChange={(checked) => 
                      handleScheduleChange(day, 'open', checked)
                    }
                  />
                </div>
              </div>
            </CardHeader>
            
            {daySchedule.open && (
              <CardContent className="pt-0 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`${day}-open-time`}>Heure d'ouverture</Label>
                    <Input
                      id={`${day}-open-time`}
                      type="time"
                      value={daySchedule.openTime}
                      onChange={(e) => 
                        handleScheduleChange(day, 'openTime', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`${day}-close-time`}>Heure de fermeture</Label>
                    <Input
                      id={`${day}-close-time`}
                      type="time"
                      value={daySchedule.closeTime}
                      onChange={(e) => 
                        handleScheduleChange(day, 'closeTime', e.target.value)
                      }
                    />
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyToAll(day)}
                  className="w-full"
                >
                  Appliquer ces horaires à tous les jours
                </Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              const newSchedule = {};
              Object.keys(schedule).forEach(day => {
                newSchedule[day] = { 
                  open: day !== 'sunday', 
                  openTime: '09:00', 
                  closeTime: '22:00' 
                };
              });
              setSchedule(newSchedule);
              setSaved(false);
            }}
          >
            Horaires standards (9h-22h, fermé dimanche)
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              const newSchedule = {};
              Object.keys(schedule).forEach(day => {
                newSchedule[day] = { 
                  open: true, 
                  openTime: '11:00', 
                  closeTime: '23:00' 
                };
              });
              setSchedule(newSchedule);
              setSaved(false);
            }}
          >
            Horaires étendus (11h-23h, 7j/7)
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              const newSchedule = {};
              Object.keys(schedule).forEach(day => {
                newSchedule[day] = { 
                  open: false, 
                  openTime: '09:00', 
                  closeTime: '22:00' 
                };
              });
              setSchedule(newSchedule);
              setSaved(false);
            }}
          >
            Fermer temporairement
          </Button>
        </CardContent>
      </Card>

      {/* Save reminder */}
      {!saved && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            ⚠️ N'oubliez pas de sauvegarder vos modifications
          </p>
        </div>
      )}
    </div>
  );
};

export default ScheduleManager;

