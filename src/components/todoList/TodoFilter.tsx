export interface Filter {
  name: string;
  active: boolean;
  onClick: () => void;
}

interface TodoFilterProps {
  filter: Filter;
}

function TodoFilter({ filter }: TodoFilterProps) {
  return (
    <div
      className={`inline-block p-3 mr-4 bg-white rounded-xl cursor-pointer ${
        filter.active
          ? "font-semibold bg-gray-200 hover:bg-gray-300 transition duration-300"
          : "hover:bg-gray-100 transition duration-300"
      }`}
      onClick={filter.onClick}
    >
      {filter.name}
    </div>
  );
}

export default TodoFilter;
