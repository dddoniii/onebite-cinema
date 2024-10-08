import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from "./searchable-layout.module.css";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClickSearch = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onClickSearch();
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeydown}
          placeholder="검색어를 입력하세요 ..."
        />
        <button onClick={onClickSearch}>검색</button>
      </div>
      {children}
    </div>
  );
}
