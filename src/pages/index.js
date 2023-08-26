import TableComponent from "@/components/tableComponent";
import SampleTable from "@/components/tableComponent";
import { data } from "@/utility/smapleTableData";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [tableData, setTableData] = useState(data);
  const [originalData, setOriginalData] = useState(data);

  const handleSave = (id, newValue) => {
    const updatedData = tableData.map((item) =>
      item.id === id ? { ...item, price: newValue } : item
    );
    setTableData(updatedData);
  };

  const handleReset = () => {
    setTableData(originalData);
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <TableComponent
        data={tableData}
        onSave={handleSave}
        onReset={handleReset}
      />
    </main>
  );
}
