export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function capitalizeFirst(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function formatTournamentIds(ids: number[]): string {
  return ids.join(',');
}

export function getTeamInitials(name: string): string {
  if (!name) return '';
  const words = name.split(' ');
  if (words.length === 1) return name.slice(0, 2).toUpperCase();
  return words.map(w => w[0]).join('').toUpperCase().slice(0, 3);
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'live':
      return '#ef4444';
    case 'upcoming':
      return '#f59e0b';
    case 'completed':
      return '#6b7280';
    default:
      return '#999999';
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'live':
      return 'LIVE';
    case 'upcoming':
      return 'Upcoming';
    case 'completed':
      return 'Completed';
    default:
      return status;
  }
}
