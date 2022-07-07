import Image from "next/image";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { anime_detail, anime_list } from "../../features/utility/api.util";

function AnimeDetail(props) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div className="w-screen min-h-screen grid place-items-center">
        <span className="loader"></span>
      </div>
    );
  }
  if (props.data) {
    const data = JSON.parse(props.data);
    const {
      title,
      synopsis,
      year,
      episodes,
      background,
      images: {
        webp: { large_image_url: image_url },
      },
      score,
      genres,
      rating,
      themes,
      producers,
      studios,
      trailer,
    } = data;
    // console.log(data);

    return (
      <section>
        <Head>
          <title>{title}</title>
          <meta name="title" content={title} />
          <meta name="description" content={synopsis} />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="url--link" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={synopsis} />
          <meta property="og:image" content={image_url} />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://metatags.io/" />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={synopsis} />
          <meta property="twitter:image" content={image_url} />
        </Head>
        <main className="py-12 px-8 ">
          <div className="w-64 ml-5 float-right rounded-lg">
            <Image
              src={image_url}
              alt={title}
              width={100}
              height={150}
              layout="responsive"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
          <div className="">
            <h1 className="font-bold text-5xl">{title}</h1>
            <div className="">
              <div className="flex mt-8 items-center">
                <p className="mr-3 text-lg">{year}</p>
                <p className="mx-3 text-lg">
                  {episodes} {episodes > 1 ? "Episodes" : "Episode"}
                </p>
                <p className="mx-3 text-lg">
                  <span className="border-slate-400 border-2 px-2 py-1 rounded-md text-xs">
                    IMDB
                  </span>{" "}
                  {score}
                </p>
                <p className="mx-3">
                  <span className="border-slate-400 border-2 px-2 py-1 rounded-md text-xs">
                    {rating}
                  </span>
                </p>
              </div>
              <p className="text-lg mt-8 text-slate-300">{synopsis}</p>
              <div className="mt-6">
                <table>
                  <tbody>
                    {Boolean(genres.length) && (
                      <tr className="text-lg text-slate-300">
                        <td>
                          <span className="font-semibold text-indigo-400 mr-2">
                            Genres:{" "}
                          </span>
                        </td>
                        <td className="pl-3">
                          <p>{genres.map((genre) => genre.name).join(", ")}</p>
                        </td>
                      </tr>
                    )}
                    {Boolean(themes.length) && (
                      <tr className="text-lg text-slate-300">
                        <td>
                          <span className="font-semibold text-indigo-400 mr-2">
                            Themes:{" "}
                          </span>
                        </td>
                        <td className="pl-3">
                          <p>{themes.map((theme) => theme.name).join(", ")}</p>
                        </td>
                      </tr>
                    )}
                    {Boolean(producers.length) && (
                      <tr className="text-lg text-slate-300">
                        <td>
                          <span className="font-semibold text-indigo-400 mr-2">
                            Producers:{" "}
                          </span>
                        </td>
                        <td className="pl-3">
                          <p>
                            {producers
                              .map((producer) => producer.name)
                              .join(", ")}
                          </p>
                        </td>
                      </tr>
                    )}
                    {Boolean(studios.length) && (
                      <tr className="text-lg text-slate-300">
                        <td>
                          <span className="font-semibold text-indigo-400 mr-2">
                            Studios:{" "}
                          </span>
                        </td>
                        <td className="pl-3">
                          <p>
                            {studios.map((studio) => studio.name).join(", ")}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {Boolean(trailer.embed_url) && (
                <div className="my-16">
                  <p className="text-lg text-slate-400 font-bold my-2">
                    Trailer
                  </p>
                  {Boolean(trailer) && (
                    <iframe
                      src={trailer.embed_url}
                      className="w-full h-96"
                    ></iframe>
                  )}
                </div>
              )}
              {Boolean(background) && (
                <div className="my-16">
                  <p className="text-lg text-slate-400 font-bold my-2">
                    Background
                  </p>
                  <p className="text-lg text-slate-300 ">{background}</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </section>
    );
  }
}

export async function getStaticPaths() {
  const { data } = await axios.get(anime_list(1)).then((res) => res);

  const paths = data.data
    .filter((anime, i) => i <= 2)
    .map((anime) => ({
      params: { id: anime.mal_id.toString() },
    }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { data } = await axios.get(anime_detail(params.id)).then((res) => res);

  return { props: { data: JSON.stringify(data.data) } };
}

export default AnimeDetail;
