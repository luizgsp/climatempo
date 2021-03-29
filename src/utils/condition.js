export function Condition(condition){
    switch(condition){
        case 'storm':
            return icon = {
                name: 'thunderstorm-outline',
                color: '#1ec9ff'
            }
            break;
        case 'clear_day':
            return icon = {
                name: 'sunny-outline',
                color: '#FFB300'
            }
            break;
        case 'clear_night':
            return icon = {
                name: 'night-clear',
                color: '#1ec9ff'
            }
            break;
        case 'rain':
            return icon = {
                name: 'rainy-outline',
                color: '#1ec9ff'
            }
            break;
        case 'fog':
            return icon = {
                name: 'fog',
                color: '#1ec9ff'
            }
            break;  
        case 'hail':
            return icon = {
                name: 'weather-hail',
                color: '#1ec9ff'
            }
            break;  
        default:
            return icon = {
                name: 'cloud-outline',
                color: '#1ec9ff'
            }
            break;
    }
}