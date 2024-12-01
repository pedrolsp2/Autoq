export const minutesToHours = (minutes: number) => {
  if (typeof minutes !== 'number' || minutes < 0) {
    return '';
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursText = hours > 0 ? `${hours}h` : '';
  const minutesText = remainingMinutes > 0 ? `${remainingMinutes}min` : '';

  return hoursText + (hoursText && minutesText ? ' ' : '') + minutesText;
};

export const getInitials = (name: string) => {
  if (!name) return;
  const nameArray = name.split(' ');
  if (nameArray.length === 1) {
    return `${nameArray[0].slice(0, 1).toUpperCase()}${nameArray[0]
      .slice(1, 2)
      .toUpperCase()}`;
  }

  const [firstName, lastName] = [nameArray[0], nameArray[nameArray.length - 1]];

  return nameArray.length > 1 ? `${firstName[0]}${lastName[0]}` : firstName[0];
};

export const formatTipo = (tipo: string) => {
  const filtro = tipo.split('|');
  switch (Number(filtro[0])) {
    case 1:
      return 'Manutenção';
    case 2:
      return 'Predial';
    default:
      return 'Facilities';
  }
};

export const formatCurrency = (value: string): string => {
  const numericValue = value.replace(/\D/g, '');
  const formattedValue = (Number(numericValue) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return formattedValue;
};
