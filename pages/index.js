import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import useFetch from "../hooks/useFetch";
import Card from "../features/components/card/card";
import { anime_list } from "../features/utility/api.util";

export default function Home(props) {
  const { title, description, image_url, web_url } = props.data;
  const [page, setPage] = useState(1);
  const { isLoading, isError, res } = useFetch(anime_list(page));

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
        <meta name="description" content={description} />
        <meta name="title" content={title} />
        <meta name="robots" content="follow, index" />

        {/*----- facebook --------*/}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={web_url} />
        <link rel="canonical" href={web_url}></link>
        <meta property="og:site_name" content={title}></meta>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image_url} />

        {/*-------- twitter -----------*/}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={web_url} />
        <meta name="twitter:site" content="@shwetzksk"></meta>
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image_url} />
      </Head>

      <main className="flex flex-wrap">
        {res.data.map((animeDetail) => (
          <Card key={animeDetail.mal_id} {...animeDetail} />
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const data = {
    title: "Anime",
    description:
      "Search or discover new anime content. This project is built using Jikan API. Developed by Shweta",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl8o879xl4CXk3CvZccyFew50pvVsWyrxJ2Q&usqp=CAU",
    web_url: "https://anime-shwetzksk.vercel.app/",
  };

  return { props: { data } };
}
