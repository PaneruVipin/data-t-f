import React, { useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";

const tableComponent = ({ data }) => {
  const [currentCategory, setCurrentCategory] = useState("");
  const [dataForTable, setDataForTable] = useState([]);
  const [editedData, setEditedData] = useState(data);
  const categoryes = [...new Set(data.map((e) => e.category))];
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: dataForTable,
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

  const handleSelectCategory = (e) => {
    const newData = editedData.filter((d) => d.category == e.target.value);
    setCurrentCategory(e.target.value);
    setDataForTable(newData);
  };

  useEffect(() => {
    const newData = editedData.filter(
      (e) => e.category == (currentCategory || categoryes?.[0])
    );
    setCurrentCategory(currentCategory || categoryes?.[0]);
    setDataForTable(newData);
  }, [editedData]);
  return (
    <div className="p-4">
      <table {...getTableProps()} className="table border w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) =>
                column.Header == "Price" ? (
                  <th
                    key={column.Header}
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
                  <th key={column.Header} className="p-2">
                    {column.render("Header")}
                    {column.Header == "Category" ? (
                      <select onChange={handleSelectCategory}>
                        {categoryes.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
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
                    <td
                      key={cell.row.id}
                      {...cell.getCellProps()}
                      className="p-2"
                    >
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

export default tableComponent;
