import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import useFetch from "../hooks/useFetch";
import Card from "../features/components/card/card";
import { anime_list } from "../features/utility/api.util";

export default function Home() {
  const [page, setPage] = useState(1);
  const { isLoading, isError, res } = useFetch(anime_list(page));

  console.log(res);

  if (isLoading) {
    return (
      <div className="w-screen h-screen grid place-items-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Anime</title>
        <meta
          name="description"
          content="Search or discover new anime content. This project is built using Jikan API."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-wrap">
        {res.data.map((animeDetail) => (
          <Card key={animeDetail.mal_id} {...animeDetail} />
        ))}
      </main>
    </div>
  );
}
