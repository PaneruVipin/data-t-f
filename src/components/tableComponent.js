import { updateData } from "@/apis/data";
import { getFromLocalStorage, setInLocalStorage } from "@/lib/localStorage";
import React, { useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";

const tableComponent = ({ data, refetch }) => {
  const [currentCategory, setCurrentCategory] = useState("");
  const [dataForTable, setDataForTable] = useState([]);
  const [editedData, setEditedData] = useState(data);
  const [loading, setLoading] = useState(false);
  const categoryes = [...new Set(data.map((e) => e.category))];
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ value }) => (
          <div className="overflow-auto w-40 h-20">{value}</div>
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) => (
          <div className="overflow-auto w-80 h-20">{value}</div>
        ),
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: ({ value }) => (
          <div className="overflow-auto w-80 h-20">{value}</div>
        ),
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
        Cell: ({ value }) => (
          <div className=" w-96 h-20 overflow-auto">{value}</div>
        ),
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
  const changedData = editedData.filter((obj2) => {
    const matchingObj1 = data.find((obj1) => obj1.id === obj2.id);
    return matchingObj1 && matchingObj1.price !== obj2.price;
  });
  const handleSave = () => {
    const data = changedData.map(({ id, price }) => ({
      id: +id,
      price: +price,
    }));
    if (data.length) {
      setLoading(true);
      updateData({ data }).then(() => {
        refetch();
        setLoading(false);
      });
    }
    return;
  };

  const handleSelectCategory = (e) => {
    const newData = editedData.filter((d) => d.category == e.target.value);
    setCurrentCategory(e.target.value);
    setInLocalStorage("currentCategory", e.target.value);
    setDataForTable(newData);
    return;
  };

  useEffect(() => {
    const categoryFromLocal = getFromLocalStorage("currentCategory");
    const newData = editedData.filter(
      (e) =>
        e.category == (currentCategory || categoryFromLocal || categoryes?.[0])
    );
    setCurrentCategory(currentCategory || categoryFromLocal || categoryes?.[0]);
    setDataForTable(newData);
  }, [editedData]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          disabled={!changedData.length || loading}
          onClick={handleSave}
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded disabled:bg-gray-200"
        >
          Save
        </button>
        <button onClick={handleReset} className="px-4 py-2 bg-gray-300 rounded">
          Reset
        </button>
      </div>
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
                    {column.Header == "Category" && currentCategory ? (
                      <select
                        defaultValue={currentCategory}
                        onChange={handleSelectCategory}
                      >
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
    </div>
  );
};

export default tableComponent;
