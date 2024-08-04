import Select from 'react-select';
import { Categories } from '~/types';
import {
  selectStyles,
  SortingOptions,
  SORTING_OPTIONS,
  CATEGORY_OPTIONS,
} from '../constants';

export function FilterBar({
  sortingOption,
  setSortingOption,
  categoryFilter,
  setCategoryFilter,
}: {
  sortingOption: SortingOptions;
  setSortingOption: (option: SortingOptions) => void;
  categoryFilter: Categories | null;
  setCategoryFilter: (category: Categories | null) => void;
}) {
  return (
    <div className="filter-bar flex flex-col sm:flex-row items-start sm:items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <label className="mr-2 mb-1 sm:mb-0">Sort by:</label>
        <div className="w-full sm:w-48">
          <Select
            placeholder="Select sorting"
            value={SORTING_OPTIONS.find(
              option => option.value === sortingOption
            )}
            options={SORTING_OPTIONS}
            onChange={value =>
              setSortingOption((value as { value: SortingOptions })?.value)
            }
            styles={selectStyles}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <label className="mr-2 mb-1 sm:mb-0">Filter by category:</label>
        <div className="w-full sm:w-48">
          <Select
            placeholder="All categories"
            value={
              categoryFilter
                ? { value: categoryFilter, label: categoryFilter }
                : null
            }
            options={CATEGORY_OPTIONS}
            onChange={value =>
              setCategoryFilter(
                value ? (value as { value: Categories }).value : null
              )
            }
            styles={selectStyles}
            isClearable
          />
        </div>
      </div>
    </div>
  );
}
