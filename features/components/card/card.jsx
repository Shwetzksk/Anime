import Image from "next/image";
import Link from "next/link";
function Card({
  title,
  images: {
    webp: { image_url },
  },
  mal_id,
}) {
  return (
    <Link href={{ pathname: "/anime/[id]", query: { id: mal_id } }}>
      <a>
        <div className="w-48   grid place-items-center m-3">
          <Image
            src={image_url}
            alt={title}
            width={190}
            height={230}
            className=" rounded-md "
          />
        </div>
      </a>
    </Link>
  );
}

export default Card;
