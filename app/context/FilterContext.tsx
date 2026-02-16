import React, { createContext, useCallback, useContext, useState } from 'react';

interface FilterState {
  selectedTournamentIds: number[];
}

interface FilterContextType {
  filters: FilterState;
  selectedTournamentIds: number[];
  toggleTournament: (id: number) => void;
  selectTournaments: (ids: number[]) => void;
  clearFilters: () => void;
  applyFilters: () => void;
  isFilterActive: boolean;
  pendingTournamentIds: number[];
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>({
    selectedTournamentIds: [],
  });
  const [pendingTournamentIds, setPendingTournamentIds] = useState<number[]>([]);

  const toggleTournament = useCallback((id: number) => {
    setPendingTournamentIds((prev) =>
      prev.includes(id) ? prev.filter((tId) => tId !== id) : [...prev, id]
    );
  }, []);

  const selectTournaments = useCallback((ids: number[]) => {
    setPendingTournamentIds(ids);
  }, []);

  const clearFilters = useCallback(() => {
    setPendingTournamentIds([]);
    setFilters({ selectedTournamentIds: [] });
  }, []);

  const applyFilters = useCallback(() => {
    setFilters({ selectedTournamentIds: pendingTournamentIds });
  }, [pendingTournamentIds]);

  const isFilterActive = filters.selectedTournamentIds.length > 0;

  return (
    <FilterContext.Provider
      value={{
        filters,
        selectedTournamentIds: filters.selectedTournamentIds,
        toggleTournament,
        selectTournaments,
        clearFilters,
        applyFilters,
        isFilterActive,
        pendingTournamentIds,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
