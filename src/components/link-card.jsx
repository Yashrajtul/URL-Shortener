/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Copy, Download, Trash } from "lucide-react"
import useFetch from "@/hooks/use-fetch"
import { deleteUrl } from "@/db/apiUrls"
import { BeatLoader } from "react-spinners"

const LinkCard = ({ url, fetchUrls }) => {

    const downloadImage = () => {
        const imageUrl = url?.qr;
        const fileName = url?.title;

        const anchor = document.createElement("a");
        anchor.href = imageUrl;
        anchor.download = fileName;

        document.body.appendChild(anchor);

        anchor.click();

        document.body.removeChild(anchor);
    }

    const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);

    return (
        <div className="flex flex-col gap-5 p-4 bg-gray-900 border rounded-lg md:flex-row">
            <img
                src={url?.qr}
                className="self-start object-contain h-32 ring ring-blue-500"
                alt="qr code" />
            <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
                <span className="text-3xl font-extrabold cursor-pointer hover:underline">{url?.title}</span>
                <span className="text-2xl font-bold text-blue-400 cursor-pointer hover:underline">
                    https://trimrr.onrender.com/{url?.custom_url ? url?.custom_url : url.short_url}
                </span>
                <span className="flex items-center gap-1 cursor-pointer hover:underline">{url?.original_url}</span>
                <span className="flex items-end flex-1 text-sm font-extralight">{new Date(url?.created_at).toLocaleString()}</span>
            </Link>

            <div className="flex gap-2">
                <Button
                    variant="ghost"
                    onClick={() =>
                        navigator.clipboard.writeText(`https://trimrr.onrender.com/${url?.short_url}`)
                    }>
                    <Copy />
                </Button>
                <Button variant="ghost" onClick={downloadImage}>
                    <Download />
                </Button>
                <Button variant="ghost" onClick={() => fnDelete().then(() => fetchUrls())}>
                    {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
                </Button>
            </div>
        </div>
    )
}

export default LinkCard