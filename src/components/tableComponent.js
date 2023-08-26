import React, { useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";
// import { v4 as uuid } from 'uuid';

const MenuTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ row }) => (
          <input
            type="number"
            value={row.original.price}
            onChange={(e) => handlePriceChange(row.original.id, e.target.value)}
            className=" p-1 border rounded"
          />
        ),
      },
      {
        Header: "Description",
        accessor: "description",
      },
    ],
    []
  );

  const [editedData, setEditedData] = useState(data);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: editedData,
      },
      useSortBy
    );

  const handlePriceChange = (id, newPrice) => {
    const updatedData = editedData.map((item) =>
      item.id === id ? { ...item, price: newPrice } : item
    );
    setEditedData(updatedData);
  };

  const handleReset = () => {
    setEditedData(data);
  };

  const handleSave = () => {};
  const categoryes = [...new Set(data.map((e) => e.category))];
  const handleSelectCategory = (e) => {
    const newData = data.filter((d) => d.category == e.target.value);
    setEditedData(newData);
  };
  useEffect(() => {
    const newData = data.filter((e) => e.category == categoryes?.[0]);
    setEditedData(newData);
  }, []);
  return (
    <div className="p-4">
      <table {...getTableProps()} className="table border w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) =>
                column.Header == "Price" ? (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="p-2 "
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ) : (
                  <th className="p-2">
                    {column.render("Header")}
                    {column.Header == "Category" ? (
                      <select onChange={handleSelectCategory}>
                        {categoryes.map((c) => (
                          <option value={c}>{c}</option>
                        ))}
                      </select>
                    ) : null}
                  </th>
                )
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="p-2">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
        <button onClick={handleReset} className="px-4 py-2 bg-gray-300 rounded">
          Reset
        </button>
      </div>
    </div>
  );
};

export default MenuTable;


