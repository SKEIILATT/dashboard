import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { CITIES } from '../types/CityData';

interface SelectorUIProps {
    selectedCity: string;
    onCityChange: (cityKey: string) => void;
}

export default function SelectorUI({ selectedCity, onCityChange }: SelectorUIProps) {
    const [cityInput, setCityInput] = useState<string>(selectedCity);

    // Sincronizar el estado local con el prop cuando cambie
    useEffect(() => {
        setCityInput(selectedCity);
    }, [selectedCity]);

    const handleChange = (event: SelectChangeEvent<string>) => {
        const newCity = event.target.value;
        setCityInput(newCity);
        onCityChange(newCity); // Notificar al componente padre
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="city-select-label">Ciudad</InputLabel>
            <Select
                labelId="city-select-label"
                id="city-simple-select"
                label="Ciudad"
                value={cityInput}
                onChange={handleChange}
            >
                <MenuItem disabled value="">
                    <em>Seleccione una ciudad</em>
                </MenuItem>
                {Object.entries(CITIES).map(([key, city]) => (
                    <MenuItem key={key} value={key}>
                        {city.displayName}
                    </MenuItem>
                ))}
            </Select>
            {cityInput && CITIES[cityInput] && (
                <p>
                    Información del clima en <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                        {CITIES[cityInput].displayName}
                    </span>
                </p>
            )}
        </FormControl>
    )
}