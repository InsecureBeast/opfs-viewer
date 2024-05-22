export interface TodoListProps {
  items: string[];
}

export const FilesObserver: React.FC<TodoListProps> = ({ items }) => {
  return (
    <table className="border-collapse border border-green-800 ...">
      <thead>
        <tr>
          <th className="border border-green-600 ...">State</th>
          <th className="border border-green-600 ...">City</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-green-600 ...">Indiana</td>
          <td className="border border-green-600 ...">Indianapolis</td>
        </tr>
        <tr>
          <td className="border border-green-600 ...">Ohio</td>
          <td className="border border-green-600 ...">Columbus</td>
        </tr>
        <tr>
          <td className="border border-green-600 ...">Michigan</td>
          <td className="border border-green-600 ...">Detroit</td>
        </tr>
      </tbody>
    </table>
  );
};