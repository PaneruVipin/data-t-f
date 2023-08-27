import { getData } from "@/apis/data";
import TableComponent from "@/components/tableComponent";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    setLoading(true);
    getData().then((res) => {
      setData(res?.data);
      setLoading(false);
    });
  }, [count]);
  const refetch = () => {
    setCount(count + 1);
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {data.length && !loading ? (
        <TableComponent data={data} refetch={refetch} />
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
