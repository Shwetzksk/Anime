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
          content="Search or discover new anime content. This project is built using Jikan API. Developed by Shweta"
        />
        <meta name="title" content="Anime" />
        <meta name="robots" content="follow, index" />

        {/*----- facebook --------*/}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://anime-kj04hdzzu-shwetzksk.vercel.app"
        />
        <link
          rel="canonical"
          href="https://anime-kj04hdzzu-shwetzksk.vercel.app"
        ></link>
        <meta property="og:site_name" content="Anime"></meta>
        <meta property="og:title" content="Anime" />
        <meta
          property="og:description"
          content="Search or discover new anime content. This project is built using Jikan API. Developed by Shweta"
        />
        <meta property="og:image" content="images/anime.jpg" />

        {/*-------- twitter -----------*/}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://anime-kj04hdzzu-shwetzksk.vercel.app"
        />
        <meta name="twitter:site" content="@shwetzksk"></meta>
        <meta property="twitter:title" content="Anime" />
        <meta
          property="twitter:description"
          content="Search or discover new anime content. This project is built using Jikan API. Developed by Shweta"
        />
        <meta property="twitter:image" content="images/anime.jpg" />
      </Head>

      <main className="flex flex-wrap">
        {res.data.map((animeDetail) => (
          <Card key={animeDetail.mal_id} {...animeDetail} />
        ))}
      </main>
    </div>
  );
}
